import React from "react";
import { useQuery } from "@apollo/react-hooks";

import { queries } from "../../Services/graphql";

const ProjectList = () => {
  const { loading, error, data } = useQuery(queries.projects);

  return (
    <div>Check Network tab for graphql response</div>
  );
};

export default ProjectList;
