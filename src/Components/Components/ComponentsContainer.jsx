import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { getComponents } from '../../Services/api';

import { Alert, Collapse, Empty, Icon } from 'antd';

import Component from './Component';

const ComponentsContainer = ({ boardId }) => {
  const [components, setComponents] = useState();
  const [error, setError] = useState();

  const getComponentsAsync = async () => {
    await getComponents(boardId)
      .then(response => setComponents(response.data))
      .catch(error => setError(error));
  }

  useEffect(
    () => { getComponentsAsync(); },
    [boardId]
  );

  const { Panel } = Collapse;

  return (
    <React.Fragment>
      {error &&
        <Alert description="Could not fetch components." message="Error" showIcon type="error" />
      }

      {!error &&
        components &&
        !!components.length &&
        <Collapse>
          {
            components.map(component =>
              <Panel
                extra={
                  <Link to={`/components/${component.id}`} target="_blank">
                    <Icon type="profile" />
                  </Link>
                }
                header={component.name}
                key={`component-panel-${component.id}`}
              >
                <Component component={component} />
              </Panel>
            )
          }
        </Collapse>
      }

      {!error && (!components || !components.length) &&
        <Empty
          description="No components for this board."
        />
      }
    </React.Fragment>
  );
};

ComponentsContainer.propTypes = {
  boardId: PropTypes.string.isRequired
};

export default ComponentsContainer;
