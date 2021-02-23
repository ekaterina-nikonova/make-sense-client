import React from "react";
import { useQuery } from "@apollo/react-hooks";

import { queries } from "../../Services/graphqlPublic";

import { Alert, Empty, Spin } from "antd";

import Chapter from "./Chapter";

const ChaptersContainer = ({ projectId }) => {
  const { loading, error, data } = useQuery(
    queries.publicChapters,
    { variables: { projectId } }
  );

  if (loading) return (
    <div className="top-level-state">
      <Spin />
    </div>
  );

  if (error) return (
    <div className="top-level-state">
      <Alert
        description="Could not fetch chapters."
        message={error.message}
        showIcon
        type="error"
        />
    </div>
  );

  return (
    <React.Fragment>
      {(!data || !data.publicChapters || !data.publicChapters.length) && (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="This project is empty."
        />
      )}

      { data && data.publicChapters && !!data.publicChapters.length && (
        data.publicChapters.map(chapter => (
          <Chapter key={chapter.id} chapter={chapter} />
        ))
      )}
    </React.Fragment>
  );
};

export default ChaptersContainer;
