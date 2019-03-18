import React from 'react';
import PropTypes from 'prop-types';

import { Col, Row, Tabs } from 'antd';

import BoardDescriptionForm from './BoardDescriptionForm';
import BoardMenu from '../Layout/BoardMenu';
import ComponentsContainer from '../Components/ComponentsContainer';
import EmptyFullPage from '../UI/EmptyFullPage';

const BoardView = ({ board, boards }) => {
  const { TabPane } = Tabs;

  return (
    <React.Fragment>
      <BoardMenu currentBoardId={board.id} boards={boards} />
      <div style={{ width: '100%' }}>
        <Row>
          <Col offset={6} span={12}>
            <img
              alt="board main"
              src={board.image || require('../../Assets/Images/board.jpg')}
              className="board-main-image"
            />
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Tabs>
              <TabPane tab="Description" key="1">
                <BoardDescriptionForm board={board} />
              </TabPane>

              <TabPane tab="Tech specs" key="2">
                <EmptyFullPage />
              </TabPane>

              <TabPane tab="Components" key="3">
                <ComponentsContainer boardId={board.id} />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

BoardView.propTypes = {
  board: PropTypes.object.isRequired,
  boards: PropTypes.array.isRequired
};

export default BoardView;
