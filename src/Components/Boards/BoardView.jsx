import React from 'react';
import PropTypes from 'prop-types';

import { baseUrl } from '../../Services/api';

import { Col, Icon, Row, Tabs, Upload, message } from 'antd';

import BoardDescriptionForm from './BoardDescriptionForm';
import BoardMenu from '../Layout/BoardMenu';
import ComponentsContainer from '../Components/ComponentsContainer';
import EmptyFullPage from '../UI/EmptyFullPage';

const BoardView = ({ board, boards }) => {
  const Dragger = Upload.Dragger;
  const { TabPane } = Tabs;

  const props = {
    action: `${baseUrl}/api/v1/uploads`,
    data: { parent: 'board', parent_id: board.id, type: 'image' },
    name: 'file',
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`File ${info.file.name} uploaded.`);
      }

      if (info.file.status === 'error') {
        message.error(`Could not upload file ${info.file.name}`);
      }
    }
  };

  return (
    <React.Fragment>
      <BoardMenu currentBoardId={board.id} boards={boards} />
      <div style={{ width: '100%' }}>
        <Row>
          <Col offset={6} span={12}>
            <img
              alt="board main"
              src={board.image || require('../../Assets/Images/board-generic.svg')}
              className="board-main-image"
            />
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Tabs>
              <TabPane tab="Description" key="1">
                <Dragger {...props} className="board-image-upload">
                  <p className="ant-upload-drag-icon">
                    <Icon type="cloud-upload" />
                  </p>
                  <p className="ant-upload-text">Click or drag and drop an image file to upload</p>
                  <p className="ant-upload-hint">Only JPG, JPEG, and PNG formats are supported.</p>
                </Dragger>
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
