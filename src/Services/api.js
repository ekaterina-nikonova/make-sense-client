import axios from 'axios';

export const getBoards = () => axios.get('http://localhost:3001/api/v1/boards.json');

export const getBoard = id => axios.get(`http://localhost:3001/api/v1/boards/${id}`);
