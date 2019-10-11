import React, { useEffect, useState } from "react";
import { useDispatch, useGlobal } from "reactn";

import { deleteUser, getUsers } from "../../Services/api";

import { Alert, Icon, List, Popconfirm } from "antd";
import EmptyFullPage from "../UI/EmptyFullPage";

const UsersContainer = () => {
  const [users, setUsers] = useGlobal('users');
  const [error, setError] = useState();

  const dispatchDelete = useDispatch('userReducer');

  useEffect(() => {
    getUsers()
      .then(response => setUsers(response.data))
      .catch(error => setError(error));
  }, []);

  const handleDelete = user => {
    deleteUser(user.id)
      .then(dispatchDelete({
        action: 'destroy',
        data: { ...user }
      }));
  };

  return (
    <React.Fragment>
      {error && <Alert message="Error" description="Could not fetch users." showIcon type="error" />}

      {(!error && !users.length) && <EmptyFullPage />}

      {(!error && users.length) && (<List
        dataSource={users}
        renderItem={user => (
          <List.Item
            actions={[
              <Popconfirm
                placement="topRight"
                title={`Delete user ${user.email}?`}
                onConfirm={() => handleDelete(user)}
                okText="Yes"
                cancelText="Cancel"
              >
                <Icon type="delete" />
              </Popconfirm>
            ]}
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
