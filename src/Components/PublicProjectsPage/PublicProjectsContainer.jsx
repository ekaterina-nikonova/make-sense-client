import React from "react";

import PublicProjectsHeader from "./PublicProjectsHeader";
import PublicProjectsList from "./PublicProjectsList";

const PublicProjectsContainer = () => {
  return(
    <div className="public-projects-container">
      <div className="public-projects-section">
        <PublicProjectsHeader />

        <PublicProjectsList />
      </div>
    </div>
  );
};

export default PublicProjectsContainer;
