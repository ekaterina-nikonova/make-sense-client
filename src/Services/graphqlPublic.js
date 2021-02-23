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
  uri: `${baseUrl}/api/v1/graphql-public`,
});

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
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
  // Projects

  publicProjects: gql`{
      publicProjects {
          id,
          createdAt,
          name,
          description,
          user,
          chapterCount, 
          componentCount,
          board { name },
          components { name }
      }
  }`,

  publicProject: gql`query ($id: ID!){
      publicProject(id: $id) {
          id
          name
          description
          board { id, name, imageUrl }
          components { id, name, imageUrl }
      }
  }`,

  projectSubscription: gql`
      subscription {
          projectUpdated {
              project {
                  id
                  name
                  description
                  board { id, name, imageUrl, components { id, name } }
                  components { id, name, imageUrl }
                  chapterCount
                  componentCount
              }
          }
      }
  `,

  // Chapters
  publicChapters: gql`
      query getChaptersForProject($projectId: ID!) {
          publicChapters(projectId: $projectId) {
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
};
