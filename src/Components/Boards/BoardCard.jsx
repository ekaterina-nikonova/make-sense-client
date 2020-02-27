import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Button, Card, Icon, Modal, Popconfirm } from 'antd';

import ComponentsContainer from "./Components/ComponentsContainer";

const BoardCard = ({ board, deleteBoard }) => {
  const [modalOpen, openModal] = useState(false);

  const { Meta } = Card;

  const handleOpenModal = e => {
    e.preventDefault();
    openModal(true);
  };

  return (
    <React.Fragment>
      <Link to={{
        pathname: `/boards/${board.id}`
      }}>
        <Card
          actions={[
            <Icon onClick={handleOpenModal} type="plus-circle" />,

            <Popconfirm
              placement="topRight"
              title="Delete the board?"
              onCancel={e => e.stopPropagation()}
              onConfirm={e => deleteBoard(e, board.id)}
              okText="Yes"
              cancelText="No"
            >
              <Icon type="delete" />
            </Popconfirm>
          ]}
          hoverable
          cover={
            <img
              alt="board"
              src={board.imageUrl || require('../../Assets/Icons/icon-board-default.svg')}
            />
          }
        >
          <Meta
            title={board.name}
          />
        </Card>
      </Link>

      <Modal
        footer={
          <Button onClick={() => openModal(false)}>
            Close
          </Button>
        }
        onCancel={() => openModal(false)}
        title={`Components for ${board.name}`}
        visible={modalOpen}
      >
        <ComponentsContainer boardId={board.id} />
      </Modal>
    </React.Fragment>
  );
};

BoardCard.propTypes = {
  board: PropTypes.object.isRequired
};

export default BoardCard;
