import React, { useEffect, useState } from "react";
import { useGlobal } from "reactn";

import { deleteInvitationSilent,
  deleteInvitationWithEmail,
  getInvitations } from "../../Services/api";

import { Alert, Icon, List, Popconfirm } from "antd";

import EmptyFullPage from "../UI/EmptyFullPage";

const InvitationsContainer = () => {
  const [invitations, setInvitations] = useGlobal('invitations');
  const [error, setError] = useState();

  useEffect(() => {
    getInvitations()
      .then(response => setInvitations(response.data))
      .catch(error => setError(error));
  }, []);

  const handleDeleteSilent = invitation => {
    deleteInvitationSilent(invitation.id)
      .then();
  };

  const handleDeleteWithEmail = invitation => {
    deleteInvitationWithEmail(invitation.id)
      .then();
  };

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
                <Popconfirm
                  placement="topRight"
                  title={`Send rejection email to ${invitation.email}?`}
                  onConfirm={ () => handleDeleteWithEmail(invitation) }
                  onCancel={ () => handleDeleteSilent(invitation) }
                  okText="Yes"
                  cancelText="No"
                >
                  <Icon type="close-circle" />
                </Popconfirm>,
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
