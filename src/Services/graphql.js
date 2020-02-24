import React from "react";
import ActionCable from "actioncable";
import ActionCableLink from "graphql-ruby-client/subscriptions/ActionCableLink";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import gql from "graphql-tag";

import { baseUrl, wsBaseUrl } from "./api";

const httpLink = createHttpLink({
  uri: `${baseUrl}/api/v1/graphql`,
  credentials: 'include',
});

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    'X-CSRF-TOKEN': localStorage.csrf,
  }
}));

const cable = ActionCable.createConsumer(`${ wsBaseUrl }`);

const hasSubscriptionOperation = ({ query: { definitions } }) => {
  return definitions.some(
    ({ kind, operation }) => kind === 'OperationDefinition' && operation === 'subscription',
  )
};

const link = ApolloLink.split(
  hasSubscriptionOperation,
  new ActionCableLink({cable}),
  authLink.concat(httpLink)
);

export const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
});

export const Apollo = ({children}) => (
  <ApolloProvider client={client}>
    {children}
  </ApolloProvider>
);

export const queries = {
  projectsBoardsComponents: gql`{
      projects { id, name }
      boards { id, name }
      components { id, name }
  }`,

  // Projects
  projects: gql`{
    projects { id, name, description, chapterCount, componentCount }
  }`,

  project: gql`query ($id: ID!){
    project(id: $id) {
      id
      name
      description
      board { id, name, components { id, name } }
      components { id, name }
    }
  }`,

  createProject: gql`
    mutation createProject(
        $boardId: ID!,
        $name: String!,
        $description: String,
        $components: [String!]
    ) {
      createProject(
          boardId: $boardId,
          name: $name,
          description: $description,
          components: $components
      ) {
        project {
          id
          name
        }
      }
    }
  `,

  updateProject: gql`
    mutation updateProject(
      $id: ID!
      $board: ID
      $name: String
      $description: String
      $components: [String!]
    ) {
      updateProject(
        id: $id
        attributes: {
          board: $board
          name: $name
          description: $description
          components: $components
        }
      ) {
        project {
          id
          name
          description
          board { id, name, components { id, name } }
          components { id, name }
          chapterCount
          componentCount
        }
      }
    }
  `,

  deleteProject: gql`
    mutation deleteProject($id: ID!) {
      deleteProject(id: $id) {
        project {
          id
          name
        }
      }
    }
  `,

  projectSubscription: gql`
    subscription {
      projectAdded {
        id
        name
        description
        chapterCount
        componentCount
      }
      
      projectDeleted

      projectUpdated {
        project {
          id
          name
          description
          board { id, name, components { id, name } }
          components { id, name }
          chapterCount
          componentCount
        }
      }
    }
  `,

  projectAdded: gql`
    subscription {
      projectAdded {
        id
        name
        description
        chapterCount
        componentCount
      }
    }
  `,

  projectDeleted: gql`
    subscription {
      projectDeleted
    }
  `,

  projectUpdated: gql`
    subscription {
      projectUpdated {
        project {
          id
          name
          description
          board { id, name, components { id, name } }
          components { id, name }
          chapterCount
          componentCount
        }
      }
    }
  `,

  // Chapters

  chapters: gql`
    query getChaptersForProject($projectId: ID!) {
      chapters(projectId: $projectId) {
        id,
        name,
        intro,
        projectId,

        sections {
          id
          paragraph
          code
          language
          imageUrl
        }
      }
    }
  `,

  createChapter: gql`
    mutation createChapter(
      $projectId: ID!,
      $name: String!,
      $intro: String
    ) {
      createChapter(
        projectId: $projectId,
        name: $name,
        intro: $intro
      ) {
        chapter { id, projectId, name, intro, sections { id } }
        project { id, chapterCount }
      }
    }
  `,

  updateChapter: gql`
    mutation updateChapter(
      $projectId: ID!
      $chapterId: ID!
      $name: String
      $intro: String
    ) {
      updateChapter(
        projectId: $projectId
        chapterId: $chapterId
        attributes: {
          name: $name
          intro: $intro
        }
      ) {
        chapter {
          id
          name
          intro
        }
      }
    }
  `,

  deleteChapter: gql`
    mutation deleteChapter(
      $projectId: ID!,
      $chapterId: ID!
    ) {
      deleteChapter(
        projectId: $projectId,
        chapterId: $chapterId
      ) {
        chapter { id, name }
        project { id, chapterCount }
      }
    }
  `,

  // Sections

  createSection: gql`
    mutation createSection(
      $projectId: ID!,
      $chapterId: ID!,
      $paragraph: String!,
      $code: String,
      $language: String
    ) {
      createSection(
        projectId: $projectId,
        chapterId: $chapterId,
        paragraph: $paragraph,
        code: $code,
        language: $language
      ) {
        section { id, paragraph, code, language, imageUrl }
      }
    }
  `,

  updateSection: gql`
    mutation updateSection(
      $projectId: ID!
      $chapterId: ID!
      $sectionId: ID!
      $paragraph: String
      $code: String
      $language: String
    ) {
      updateSection(
        projectId: $projectId
        chapterId: $chapterId
        sectionId: $sectionId
        attributes: {
          paragraph: $paragraph
          code: $code
          language: $language
        }
      ) {
        section {
          id
          paragraph
          code
          language
          imageUrl
        }
      }
    }
  `,

  deleteSection: gql`
    mutation deleteSection(
      $projectId: ID!,
      $chapterId: ID!,
      $sectionId: ID!
    ) {
      deleteSection(
        projectId: $projectId,
        chapterId: $chapterId,
        sectionId: $sectionId
      ) {
        section { id }
      }
    }
  `,

  // Boards

  boardNames: gql` {
    boards { id, name }
  }`,

  boards: gql` {
    boards { id, name, imageUrl, components { id, name } }
  }`,

  board: gql`query ($id: ID!) {
      board(id: $id) { id, name, description, imageUrl }
  }`,

  createBoard: gql`
    mutation createBoard(
      $name: String!,
      $description: String,
    ) {
      createBoard(
        name: $name,
        description: $description,
      ) {
        board {
          id
          name
          imageUrl
          components { id }
        }
      }
    }
  `,

  updateBoard: gql`
    mutation updateBoard(
      $id: ID!
      $name: String
      $description: String
      $components: [String!]
    ) {
      updateBoard(
        id: $id
        attributes: {
          name: $name
          description: $description
          components: $components
        }
      ) {
        board {
          id
          name
          description
          imageUrl
          components { id, name }
        }
      }
    }
  `,

  deleteBoard: gql`
    mutation deleteBoard($id: ID!) {
      deleteBoard(id: $id) {
        board {
          id
          name
        }
      }
    }
  `,

  boardAdded: gql`
    subscription {
      boardAdded {
        id
        name
        imageUrl
        components { id }
      }
    }
  `,

  boardDeleted: gql`
    subscription { boardDeleted }
  `,

  // Components

  components: gql`{
    components { id name description}
  }`,

  createComponent: gql`
    mutation createComponent(
      $boardId: ID!,
      $name: String!,
      $description: String
    ) {
      createComponent(
        boardId: $boardId,
        name: $name,
        description: $description,
      ) {
        component {
          id
          name
          description
          imageUrl
        }
      }
    }
  `,

  updateComponent: gql`
    mutation updateComponent(
      $id: ID!
      $name: String
      $description: String
    ) {
      updateComponent(
        id: $id
        attributes: {
          name: $name
          description: $description
        }
      ) {
        component {
          id
          name
          description
          imageUrl
        }
      }
    }
  `,

  deleteComponent: gql`
    mutation deleteComponent($id: ID!) {
      deleteComponent(id: $id) {
        component {
          id
          name
        }
      }
    }
  `,

  componentsForBoard: gql`
    query getComponentsForBoard($boardId: ID!) {
      componentsForBoard(boardId: $boardId) { id, name, description, imageUrl }
    }
  `,

  componentAdded: gql`
    subscription {
      componentAdded {
        id
        name
        description
      }
    }
  `,

  componentDeleted: gql`
    subscription {
      componentDeleted
    }
  `,
};
