import React from "react";
import ActionCable from "actioncable";
import ActionCableLink from "graphql-ruby-client/subscriptions/ActionCableLink";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import gql from "graphql-tag";

import { baseUrl, wsBaseUrl } from "./api";

const httpLink = createHttpLink({
  uri: `${baseUrl}/api/v1/graphql`,
  credentials: 'include',
  headers: { 'X-CSRF-TOKEN': localStorage.csrf }
});

const cable = ActionCable.createConsumer(`${wsBaseUrl}`);

const hasSubscriptionOperation = ({ query: { definitions } }) => {
  return definitions.some(
    ({ kind, operation }) => kind === 'OperationDefinition' && operation === 'subscription',
  )
};

const link = ApolloLink.split(
  hasSubscriptionOperation,
  new ActionCableLink({cable}),
  httpLink
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
    boards { id, name, components { id, name } }
  }`,

  componentsForBoard: gql`
    query getComponentsForBoard($boardId: ID!) {
      componentsForBoard(boardId: $boardId) { id, name }
    }
  `,
};
