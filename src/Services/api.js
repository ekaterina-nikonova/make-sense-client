import axios from './axios';

export const baseUrl = process.env.NODE_ENV === 'production' ? 'https://brittle-pins-api.herokuapp.com' : '';

console.log(`Base URL ${baseUrl} for ${process.env.NODE_ENV} environment`);

/** Account */

export const signup = data => axios.plain.post(`${baseUrl}/api/v1/signup`, data);

export const signin = data => axios.plain.post(`${baseUrl}/api/v1/signin`, data);

export const signout = () => axios.secured.delete(`${baseUrl}/api/v1/signin`);

/** Boards */

export const createBoard = data => axios.secured.post(`${baseUrl}/api/v1/boards`, data);

export const deleteBoard = id => axios.secured.delete(`${baseUrl}/api/v1/boards/${id}`);

export const getBoards = () => axios.secured.get(`${baseUrl}/api/v1/boards.json`);

export const getBoard = id => axios.secured.get(`${baseUrl}/api/v1/boards/${id}`);

export const updateBoard = ({ boardId, updates }) => axios.secured.patch(`${baseUrl}/api/v1/boards/${boardId}`, updates);

/** Components */

export const getComponents = boardId => axios.secured.get(`${baseUrl}/api/v1/boards/${boardId}/components`);

export const updateComponent = ({ componentId, updates }) => axios.secured.patch(`${baseUrl}/api/v1/components/${componentId}`, updates);

/** ActionCable */

export const wsBaseUrl = process.env.NODE_ENV === 'production'
  ? 'ws://brittle-pins-api.herokuapp.com/cable'
  : 'ws://localhost:3001/cable';

export const wsHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
};