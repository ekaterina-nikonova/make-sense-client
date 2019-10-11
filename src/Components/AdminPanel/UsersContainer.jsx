import React, { useEffect, useState } from "react";

import { getUsers } from "../../Services/api";

import {Alert, Icon, List} from "antd";
import EmptyFullPage from "../UI/EmptyFullPage";

const UsersContainer = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    getUsers()
      .then(response => setUsers(response.data))
      .catch(error => setError(error));
  }, []);

  return (
    <React.Fragment>
      {error && <Alert message="Error" description="Could not fetch users." showIcon type="error" />}

      {(!error && !users.length) && <EmptyFullPage />}

      {(!error && users.length) && (<List
        dataSource={users}
        renderItem={user => (
          <List.Item
            actions={[<Icon type="delete" /> ]}
          >
            <List.Item.Meta
              title={<a href={`profile/${user.id}`}>{user.email}</a>}
            />
          </List.Item>
        )}
      />)}
    </React.Fragment>
  );
};

export default UsersContainer;
