import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Card, Empty, Icon, Modal, Popconfirm } from 'antd';

const BoardCard = ({ board, deleteBoard }) => {
  const [modalOpen, openModal] = useState();

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
              src={board.imageUrl || require('../../Assets/Images/board-generic.svg')}
            />
          }
        >
          <Meta
            title={board.name}
          />
        </Card>
      </Link>

      <Modal
        onOk={() => openModal(false)}
        onCancel={() => openModal(false)}
        title="Add component"
        visible={modalOpen}
      >
        <Empty
          description="Soon you'll be able to create here a new component for the selected board."
        />
      </Modal>
    </React.Fragment>
  );
};

BoardCard.propTypes = {
  board: PropTypes.object.isRequired
};

export default BoardCard;
