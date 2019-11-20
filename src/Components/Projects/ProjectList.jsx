import React, { useEffect } from "react";

import { queries } from "../../Services/graphql";

const ProjectList = ({ projects, subscribeToMore }) => {
  useEffect(() => subscribe(subscribeToMore), []);

  const subscribe = subscribeToMore => {
    subscribeToMore({
      document: queries.projectAdded,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        const newProject = subscriptionData.data.projectAdded;

        return Object.assign({}, prev, {
          projects: [newProject, ...prev.projects],
          __typename: prev.projects.__typename
        })
      }
    })
  };

  return (
    <div>
      { projects && projects.map(prj => <div key={prj.id}>{prj.name}</div>) }
    </div>
  );
};

export default ProjectList;
