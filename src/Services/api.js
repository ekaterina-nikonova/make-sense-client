import axios from 'axios';

export const getBoards = axios.get('http://localhost:3001/api/v1/boards.json');