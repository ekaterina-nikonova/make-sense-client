import axios from 'axios';

export const createBoard = data => axios.post('/api/v1/boards', data);

export const deleteBoard = id => axios.delete(`/api/v1/boards/${id}`);

export const getBoards = () => axios.get('/api/v1/boards.json');

export const getBoard = id => axios.get(`/api/v1/boards/${id}`);

export const updateBoard = ({ boardId, updates }) => axios.patch(`/api/v1/boards/${boardId}`, updates);

/** Components */

export const getComponents = boardId => axios.get(`/api/v1/boards/${boardId}/components`);

export const updateComponent = ({ componentId, updates }) => axios.patch(`/api/v1/components/${componentId}`, updates);
