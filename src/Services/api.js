import axios from 'axios';

export const createBoard = data => axios.post('http://localhost:3001/api/v1/boards', data);

export const deleteBoard = id => axios.delete(`http://localhost:3001/api/v1/boards/${id}`);

export const getBoards = () => axios.get('http://localhost:3001/api/v1/boards.json');

export const getBoard = id => axios.get(`http://localhost:3001/api/v1/boards/${id}`);

export const updateBoard = ({ boardId, updates }) => axios.patch(`http://localhost:3001/api/v1/boards/${boardId}`, updates);

/** Components */

export const getComponents = boardId => axios.get(`http://localhost:3001/api/v1/boards/${boardId}/components`);

export const updateComponent = ({ componentId, updates }) => axios.patch(`http://localhost:3001/api/v1/components/${componentId}`, updates);