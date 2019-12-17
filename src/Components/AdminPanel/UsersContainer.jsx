import React, { useEffect, useState } from "react";
import { useDispatch, useGlobal } from "reactn";

import { deleteUser, getUsers } from "../../Services/api";
import { UserContext } from "../../App";

import { Empty, Icon, List, Popconfirm, Result } from "antd";


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
      { error && (
        <div className="top-level-state">
          <Result
            status="error"
            title="Something's wrong"
            subTitle="Could not fetch users."
          />
        </div>
      ) }

      { (!error && !users.length) && (
        <Empty
          description="No users."
          className="top-level-state"
        />
      ) }

      {(!error && !!users.length) && (
        <UserContext.Consumer>
          {currentUser => (currentUser &&
            <List
              dataSource={users}
              renderItem={user => (
                <List.Item
                  actions={[
                    user.id !== currentUser.id && <Popconfirm
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
            />
          )}
        </UserContext.Consumer>
      )}
    </React.Fragment>
  );
};

export default UsersContainer;
