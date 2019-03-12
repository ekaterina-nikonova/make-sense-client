import axios from 'axios';

export const createBoard = data => axios.post('http://localhost:3001/api/v1/boards', data);

export const getBoards = () => axios.get('http://localhost:3001/api/v1/boards.json');

export const getBoard = id => axios.get(`http://localhost:3001/api/v1/boards/${id}`);

export const updateBoard = ({ boardId, updates }) => axios.patch(`http://localhost:3001/api/v1/boards/${boardId}`, updates);
