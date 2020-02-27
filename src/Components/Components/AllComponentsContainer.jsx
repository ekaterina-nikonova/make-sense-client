import React, {useEffect, useState} from 'react';
import { Redirect, Route, Switch } from "react-router-dom";
import { Query, useQuery } from "react-apollo";

import { LoggedInContext } from "../../App";
import { queries } from "../../Services/graphql";

import { Button, Empty, Icon, Result, Select, Spin } from "antd";

import EmptyFullPage from '../UI/EmptyFullPage';
import TopLevelMenu from "../Layout/TopLevelMenu";
import ComponentContainer from "./ComponentContainer";
import AllComponentsList from "./AllComponentsList";
import NewComponentForm from "../Boards/Components/NewComponentForm";

const AllComponentsContainer = ({ location, match }) => {
  const { pathname } = location;
  const { url } = match;

  return (
    <React.Fragment>
      <TopLevelMenu url={url} currentPath={pathname} item="components" />

      <Switch>
        <Route path="/components/:id" component={ComponentContainer} />
        <Route path="/components" component={AllComponents} />
      </Switch>
    </React.Fragment>
  );
};

const AllComponents = () => {
  const [boardId, setBoardId] = useState('');
  const [newComponentShows, setNewComponentShows] = useState(false);

  const subscribe = subscribeToMore => {
    subscribeToMore({
      document: queries.componentAdded,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        const newComponent = subscriptionData.data.componentAdded;

        if (prev.components.map(comp => comp.id).includes(newComponent.id)) return prev;

        return Object.assign({}, prev, {
          components: [newComponent, ...prev.components],
          __typename: prev.components.__typename
        });
      }
    });

    subscribeToMore({
      document: queries.componentDeleted,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        const deletedComponent = subscriptionData.data.componentDeleted;

        return Object.assign({}, prev, {
          components: prev.components.filter(comp => comp.id !== deletedComponent),
          __typename: prev.components.__typename
        })
      }
    });
  };

  const toggleNewComponent = () => setNewComponentShows(!newComponentShows);

  return (
    <div className="all-components-container">
      <div className="new-component-form-container">
        <Button
          type="primary"
          shape="circle"
          ghost
          className="add-component-button"
          onClick={toggleNewComponent}
        >
          <Icon type={newComponentShows ? 'minus' : 'plus'} />
        </Button>

        { newComponentShows && <SelectBoard setBoardId={setBoardId} /> }

        { newComponentShows && boardId && <NewComponentForm boardId={boardId} /> }
      </div>

      <Query query={queries.components}>
        {({ loading, error, data, subscribeToMore }) => {
          useEffect(() => subscribe(subscribeToMore), []);

          if (loading) return (
            <div className="top-level-state">
              <Spin />
            </div>
          );

          if (error) return (
            <div className="top-level-state">
              <Result
                status="error"
                title="Something's wrong"
                subTitle={error.message}
              />
            </div>
          );

          if (!data || !data.components || !data.components.length) return (
            <Empty
              description="No components created yet."
              className="top-level-state"
            />
          );

          return (
            <div className="components-container">
              <AllComponentsList
                components={data.components}
                subscribeToMore={subscribeToMore}
              />
            </div>
          );
        }}
      </Query>
    </div>
  );
};

const SelectBoard = ({ setBoardId }) => {
  const { loading, error, data } = useQuery(queries.boards);

  const { Option } = Select;

  const handleSelect = id => setBoardId(id);

  return (
    <Select
      onChange={handleSelect}
      placeholder={
        (error && (
          <span>
              <Icon type="exclamation-circle" theme="twoTone" twoToneColor="red" /> Could not load
            </span>
        )) ||
        (loading && (<span><Icon type="loading" /> Loading...</span>)) ||
        (data && 'Select a board') ||
        (<span><Icon type="frown" /> Something went wrong</span>)
      }
      filterOption={(input, option) =>
        option.props.children[2].toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      className="board-select"
    >
      { data && data.boards && data.boards.map(b =>
        <Option
          key={b.id}
          value={b.id}
        >
          <img
            src={b.imageUrl || require("../../Assets/Icons/icon-board.svg")}
            alt={b.name}
            className="board-select-image"
          /> { b.name }
        </Option>
      ) }
    </Select>
  );
};

const WrappedAllComponentsContainer = ({ location, match }) => (
  <LoggedInContext.Consumer>
    { loggedIn => loggedIn
      ? <AllComponentsContainer location={location} match={match} />
      : <Redirect to="/start" />
    }
  </LoggedInContext.Consumer>
);

export default WrappedAllComponentsContainer;
