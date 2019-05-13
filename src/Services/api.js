import axios from 'axios';

export const baseUrl = process.env.NODE_ENV === 'production' ? 'https://make-sense-api.herokuapp.com' : '';

console.log(`Base URL ${baseUrl} for ${process.env.NODE_ENV} environment`);

/** Account */

export const signin = data => axios.post(`${baseUrl}/api/v1/signin`, data);

export const signout = () => axios.delete(`${baseUrl}/api/v1/signin`);

/** Boards */

export const createBoard = data => axios.post(`${baseUrl}/api/v1/boards`, data);

export const deleteBoard = id => axios.delete(`${baseUrl}/api/v1/boards/${id}`);

export const getBoards = () => axios.get(`${baseUrl}/api/v1/boards.json`);

export const getBoard = id => axios.get(`${baseUrl}/api/v1/boards/${id}`);

export const updateBoard = ({ boardId, updates }) => axios.patch(`${baseUrl}/api/v1/boards/${boardId}`, updates);

/** Components */

export const getComponents = boardId => axios.get(`${baseUrl}/api/v1/boards/${boardId}/components`);

export const updateComponent = ({ componentId, updates }) => axios.patch(`${baseUrl}/api/v1/components/${componentId}`, updates);
