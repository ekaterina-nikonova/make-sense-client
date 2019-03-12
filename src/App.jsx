import React, { Component, useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import { Col, Layout, Row }  from 'antd';
import { Icon, Menu } from 'antd';
import { Alert } from 'antd';
import { Card } from 'antd';
import { Tabs } from 'antd';
import { Collapse } from 'antd';
import { Modal } from 'antd';
import { Empty } from 'antd';

import './App.less';
import { createBoard, deleteBoard, getBoard, getBoards, updateBoard } from './Services/api';

import Logo from './Components/UI/Logo';
import MainPageCard from './Components/MainPageCard';

import SimpleSchema from 'simpl-schema';
import AutoForm from 'uniforms-antd/AutoForm';
import TextField from 'uniforms-antd/TextField';
import LongTextField from 'uniforms-antd/LongTextField';

class App extends Component {
  render() {
    const { Content, Footer, Header } = Layout;

    return (
      <Layout>
        <Router>
          <React.Fragment>
            <Header>
              <Row>
                <Col span={24} className="app-header">
                  <Link to="/" style={{ display: 'flex' }}>
                    <Logo height={40} />
                  </Link>
                  <span className="app-title">Make sense</span>
                </Col>
              </Row>
            </Header>

            <Content className="page-content">
              <Route exact path="/" component=  {MainPageContent} />
              <Route path="/boards" component={BoardsContainer} />
              <Route path="/settings" component={SettingsContainer} />
            </Content>
          </React.Fragment>
        </Router>

        <Footer>Footer</Footer>
      </Layout>
    );
  }
}

export default App;

const MainPageContent = () => {
  return (
    <React.Fragment>
      <Row gutter={24} type="flex">
        <Col md={12} xs={24}>
          <Link to="/boards">
            <MainPageCard
              alt="boards"
              img="board-200.svg"
              title="Boards"
            />
          </Link>
        </Col>

        <Col md={12} xs={24}>
          <Link to="/settings">
            <MainPageCard
              alt="settings"
              img="settings-200.svg"
              title="Settings"
            />
          </Link>
        </Col>
      </Row>
    </React.Fragment>
  )
};

function BoardsContainer({ location, match }) {
  const [boards, setBoards] = useState();
  const [error, setError] = useState();

  const { pathname } = location;
  const { url } = match;

  const getBoardsAsync = async () => {
    await getBoards()
      .then(boards => setBoards(boards.data))
      .catch(error => setError(error));
  }

  useEffect(() => { getBoardsAsync(); }, []);

  return (
    <React.Fragment>
      <TopLevelMenu currentPath={pathname} item="boards" url={url} />

      <Switch>
        <Route path="/boards/:id" component={BoardContainer} />

        <Route path="/boards" component={() =>
          <Row gutter={12}>
            <Col span={24}>
              <AddBoard />
            </Col>

            {boards &&
              boards.map(board => (
                <Col xs={24} sm={12} md={6} key={board.id} className="board-col">
                  <BoardCard board={board} boards={boards} />
                </Col>
              ))
            }
          </Row>
        } />
      </Switch>

      {error &&
        <Alert description="Could not fetch boards." message="Error" showIcon type="error" />
      }
    </React.Fragment>
  );
};

const SettingsContainer = ({ location, match }) => {
  const { pathname } = location;
  const { url } = match;

  return (
    <React.Fragment>
      <TopLevelMenu currentPath={pathname} item="settings" url={url} />
      <div>Settings will be here</div>
    </React.Fragment>
  );
};

const TopLevelMenu = ({ currentPath, item, url }) => {
  const [activeMenuItem, setActiveMenuItem] = useState(item);

  const goTo = e => {
    setActiveMenuItem(e.key);
  };

  return (
    <Menu
      inlineCollapsed={currentPath !== url}
      mode="inline"
      onClick={goTo}
      selectedKeys={[activeMenuItem]}
      className="top-level-menu"
    >
      <Menu.Item key="boards">
        <Link to="/boards">
          <Icon type="hdd" />
          <span>Boards</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="settings">
        <Link to="/settings">
          <Icon type="sliders" />
          <span>Settings</span>
        </Link>
      </Menu.Item>
    </Menu>
  );
};

const BoardMenu = ({ currentBoardId, boards }) => {
  const [activeBoardId, setActiveBoard] = useState(currentBoardId);

  const goTo = e => {
    setActiveBoard(e.key)
  };

  return (
    <Menu onClick={goTo} mode="inline" selectedKeys={[activeBoardId]} className="top-level-menu">
      {boards &&
        boards.map(board => (
          <Menu.Item key={board.id}>
            <Link to={{
              pathname: `/boards/${board.id}`,
              state: { boards }
            }}>
              {board.name}
            </Link>
          </Menu.Item>
        ))
      }
    </Menu>
  );
};

const BoardCard = ({ board, boards }) => {
  const [modalOpen, openModal] = useState();

  const { Meta } = Card;

  const handleDelete = e => {
    e.preventDefault();
    deleteBoard(board.id);
  };

  const handleOpenModal = e => {
    e.preventDefault();
    openModal(true);
  };

  return (
    <React.Fragment>
      <Link to={{
        pathname: `/boards/${board.id}`,
        state: { boards }
      }}>
        <Card
          actions={[
            <Icon onClick={handleOpenModal} type="plus-circle" />,
            <Icon onClick={handleDelete} type="delete" />
          ]}
          hoverable
          cover={
            <img
              alt="board"
              src={board.image || require('./Assets/Images/board-generic.jpg')}
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

const BoardContainer = ({ location, match }) => {
  const [board, setBoard] = useState();
  const [error, setError] = useState();

  const { params } = match;
  const { state } = location;

  const getBoardAsync = async params => {
    await getBoard(params.id)
      .then(result => setBoard(result.data))
      .catch(error => setError(error));
  }

  useEffect(() => {
    getBoardAsync(params);
  }, [params]);

  return (
    <React.Fragment>
      {error &&
        <Alert description="Could not fetch board info." message="Error" showIcon type="error" />
      }

      {
        board &&
        <BoardView board={board} boards={state.boards} />
      }

    </React.Fragment>
  );
};

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
              src={board.image || require('./Assets/Images/board.jpg')}
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
                <p>{board.id}</p>
              </TabPane>
    
              <TabPane tab="Components" key="3">
                <p>Components will be here.</p>
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

const BoardDescriptionForm = ({ board }) => {
  const schema = new SimpleSchema({
    name: String,
    description: String
  },
  {
    requiredByDefault: false
  });

  const model = ({
    name: board.name || '',
    description: board.description || ''
  });

  return (
    <AutoForm
      autosave
      autosaveDelay={500}
      model={model}
      onSubmit={data => updateBoard({ boardId: board.id, updates: data })}
      schema={schema}
    >
      <TextField name="name" />
      <LongTextField name="description" />
    </AutoForm>
  );
};

const AddBoard = () => {
  const Panel = Collapse.Panel;

  const schema = new SimpleSchema({
    name: String,
    description: String
  });

  return (
    <Collapse bordered={false}>
      <Panel header="Add new board">
        <AutoForm
          onSubmit={data => createBoard(data)}
          schema={schema}
        >
        </AutoForm>
      </Panel>
    </Collapse>
  );
};
