import React, { Component, useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import { Col, Layout, Row }  from 'antd';
import { Icon, Menu } from 'antd';
import { Alert } from 'antd';
import { Card } from 'antd';
import { Tabs } from 'antd';

import './App.less';
import { getBoard, getBoards } from './Services/api';

import Logo from './Components/UI/Logo';
import MainPageCard from './Components/MainPageCard';

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
  const { Meta } = Card;

  return (
    <Link to={{
      pathname: `/boards/${board.id}`,
      state: { boards }
    }}>
      <Card
        hoverable
        cover={
          <img alt="board" src={board.image || require('./Assets/Images/board-generic.jpg')} />
        }
      >
        <Meta
          title={board.name}
        />
      </Card>
    </Link>
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
                <p>{board.name}</p>
                <p>{board.description}</p>
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
