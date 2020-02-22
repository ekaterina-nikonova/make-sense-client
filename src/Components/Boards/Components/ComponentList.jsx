import React from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";

import { queries } from "../../../Services/graphql";

import { Collapse, Icon, Popconfirm, message } from "antd";

import Component from "./Component";

const ComponentList = ({ components }) => {
  const [deleteComponent] = useMutation(
    queries.deleteComponent,
    { refetchQueries: [{ query: queries.projectsBoardsComponents }] }
  );

  const { Panel } = Collapse;

  const handleDelete = (e, id) => {
    e.stopPropagation();
    deleteComponent({ variables: { id } })
      .then(res => message.success(`Deleted ${res.data.deleteComponent.component.name}`))
      .catch(err => message.error('Could not delete component.'))
  };

  return (
    <Collapse
      expandIconPosition="right"
      expandIcon={
        ({ isActive }) =>
          <Icon type="eye" theme={isActive ? "filled" : "outlined"} />
      }
    >
      {
        components.map(component =>
          <Panel
            extra={
              <div className="list-component-title-extras">
                <Popconfirm
                  title="Delete component?"
                  onConfirm={e => handleDelete(e, component.id)}
                  onCancel={e => e.stopPropagation()}
                >
                  <Icon type="delete" onClick={e => e.stopPropagation()} />
                </Popconfirm>
              </div>
            }
            header={
              <div className="list-component-title">
                <Link to={`/components/${component.id}`} target="_blank">
                  <Icon type="arrow-right" />
                </Link>

                <img
                  alt={component.name}
                  src={component.image || require('../../../Assets/Images/component-generic.svg')}
                  className="component-image-icon"
                />

                {component.name}
              </div>
            }
            key={`component-panel-${component.id}`}
          >
            <Component component={component} />
          </Panel>
        )
      }
    </Collapse>
  );
};

export default ComponentList;