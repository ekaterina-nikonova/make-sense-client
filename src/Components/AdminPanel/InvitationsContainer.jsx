import React, { useEffect, useState } from "react";
import { useGlobal } from "reactn";

import { getInvitations } from "../../Services/api";

import { Alert, Icon, List } from "antd";

import EmptyFullPage from "../UI/EmptyFullPage";

const InvitationsContainer = () => {
  const [invitations, setInvitations] = useGlobal('invitations');
  const [error, setError] = useState();

  useEffect(() => {
    getInvitations()
      .then(response => setInvitations(response.data))
      .catch(error => setError(error));
  }, []);

  return (
    <React.Fragment>
      { error &&
        <Alert message="Error" description="Could not fetch invitations." showIcon type="error" />
      }

      { (!error && !invitations.length) && <EmptyFullPage /> }

      { (!error && invitations.length) && (
        <List
          dataSource={invitations}
          renderItem={invitation => (
            <List.Item
              actions={[
                <Icon type="close-circle" />,
                <Icon type="check-circle" />
              ]}>
              <List.Item.Meta
                title={invitation.email}
                description={invitation.code}
              />
            </List.Item>
          )}
        />
      ) }
    </React.Fragment>
  );
};

export default InvitationsContainer;
