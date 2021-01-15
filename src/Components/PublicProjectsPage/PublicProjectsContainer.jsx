import React, { useEffect, useState } from "react";
import { useGlobal } from "reactn";

import { getPublicProjects } from "../../Services/api";

import { Empty, Result, Spin } from "antd";

import PublicProjectsHeader from "./PublicProjectsHeader";
import PublicProjectsList from "./PublicProjectsList";

const PublicProjectsContainer = () => {
  const [publicProjects, setPublicProjects] = useGlobal('publicProjects');
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);

    getPublicProjects()
      .then(response => {
        setLoading(false);
        setPublicProjects(response.data);
      })
      .catch(error => {
        setLoading(false);
        setError(error);
      });
  }, []);

  return(
    <div className="public-projects-container">
      <div className="public-projects-section">
        <PublicProjectsHeader />

        {loading && <Spin className="top-level-state" />}

        {error && (
          <div className="top-level-state">
            <Result
              status="error"
              title="Could not fetch public projects"
              subTitle={error.message}
            />
          </div>
        )}

        {(!error && !publicProjects.length) && (
          <Empty
            description="No public projects."
            className="top-level-state"
          />
        )}

        {(!error && !!publicProjects.length) && (
          <PublicProjectsList projects={publicProjects} />
        )}
      </div>
    </div>
  );
};

export default PublicProjectsContainer;
