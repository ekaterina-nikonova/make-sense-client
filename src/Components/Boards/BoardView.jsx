import React, { useDispatch, useState } from 'reactn';
import PropTypes from 'prop-types';

import { baseUrl } from '../../Services/api';

import { Col, Icon, Row, Tabs, Upload, message } from 'antd';

import BoardDescriptionForm from './BoardDescriptionForm';
import ComponentsContainer from '../Components/ComponentsContainer';
import EmptyFullPage from '../UI/EmptyFullPage';

const BoardView = ({ board }) => {
  const [fileList, updateFileList] = useState([]);
  const dispatchUpdate = useDispatch('boardReducer');

  const Dragger = Upload.Dragger;
  const { TabPane } = Tabs;

  const draggerProps = {
    action: `${baseUrl}/api/v1/uploads`,
    headers: {
      'X-CSRF-TOKEN': localStorage.csrf
    },
    withCredentials: true,
    data: { parent: 'board', parent_id: board.id, type: 'image' },
    fileList: fileList,
    name: 'file',
    onChange(info) {
      const file = info.file;

      if (info.file.status === 'done') {
        dispatchUpdate({
          action: 'update',
          data: { ...board, image: info.file.response.data.url }
        });
        message.success(`File ${info.file.name} uploaded.`);
        file.url = info.file.response.data.url;
      }

      if (info.file.status === 'error') {
        message.error(`Could not upload file ${info.file.name}`);
      }

      updateFileList([file]);
    }
  };

  return (
    <React.Fragment>
      <div style={{ width: '100%' }}>
        <Row>
          <Col offset={6} span={12}>
            <Dragger {...draggerProps} className="board-image-upload-overlay">
              <p className="ant-upload-drag-icon">
                <Icon type="cloud-upload" />
              </p>
              <p className="ant-upload-text">Click or drag and drop an image file to upload</p>
              <p className="ant-upload-hint">Only JPG, JPEG, and PNG formats are supported.</p>
            </Dragger>
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
  board: PropTypes.object.isRequired
};

export default BoardView;
