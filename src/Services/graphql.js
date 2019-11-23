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
    projects { id, name, description }
  }`,

  project: gql`query ($id: ID!){
    project(id: $id) {
      id
      name
      description
      board { id, name }
      components { id, name }
      chapters {
        id
        name
        intro
        sections {
          id
          paragraph
          code
          imageUrl
        }
      }
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

  projectAdded: gql`
    subscription {
      projectAdded {
        id
        name
        description
      }
    }
  `,

  projectDeleted: gql`
    subscription {
      projectDeleted
    }
  `,

  boardNames: gql` {
    boards { id, name }
  }`,

  componentsForBoard: gql`
    query getComponentsForBoard($boardId: ID!) {
      componentsForBoard(boardId: $boardId) { id, name }
    }
  `,
};
