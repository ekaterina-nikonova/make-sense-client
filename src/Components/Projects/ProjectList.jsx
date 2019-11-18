import React from "react";
import { useQuery } from "@apollo/react-hooks";

import { queries } from "../../Services/graphql";

const ProjectList = () => {
  const { loading, error, data } = useQuery(
    queries.projects,
    { pollInterval: 1000 }
  );

  return (
    <div>
      { data && data.projects.map(prj => <div key={prj.id}>{prj.name}</div>) }
    </div>
  );
};

export default ProjectList;
