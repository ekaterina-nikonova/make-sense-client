import React from "react";
import { Link } from "react-router-dom";

import { Collapse, Icon } from "antd";

import Component from "./Component";

const ComponentList = ({ components }) => {
  const { Panel } = Collapse;

  return (
    <Collapse>
      {
        components.map(component =>
          <Panel
            extra={
              <Link to={`/components/${component.id}`} target="_blank">
                <Icon type="profile" />
              </Link>
            }
            header={
              <span>
                        <img
                          alt={component.name}
                          src={component.image || require('../../../Assets/Images/component-generic.svg')}
                          className="component-image-icon"
                        />
                {component.name}
                      </span>
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
