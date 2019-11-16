import React, { useState } from "react";

import { Apollo } from "../../Services/graphql";
import TopLevelMenu from "../Layout/TopLevelMenu";
import ProjectList from "./ProjectList";
import { Button, Icon, Modal } from "antd";

const ProjectsContainer = ({ location, match }) => {
  const { pathname } = location;
  const { url } = match;

  const [visible, setVisible] = useState(false);

  const openModal = () => setVisible(true);

  const closeModal = () => setVisible(false);

  const createProject = () => {
    // create project mutation
    closeModal();
  };

  return (
      <Apollo>
        <TopLevelMenu url={url} currentPath={pathname} item="projects" />

        <ProjectList />

        <Button type="primary" shape="circle" className="floating-action-button" onClick={openModal}>
          <Icon type="plus-circle" />
        </Button>

        <Modal title="New project" visible={visible} onOk={createProject} onCancel={closeModal}>
          <p>Create</p>
        </Modal>
      </Apollo>
  );
};

export default ProjectsContainer;
