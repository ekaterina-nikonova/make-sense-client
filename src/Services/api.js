import axios from './axios';

export const baseUrl = process.env.NODE_ENV === 'production' ? 'https://api.brittle-pins.com' : '';

console.log(`Base URL ${baseUrl} for ${process.env.NODE_ENV} environment`);

/** Account */

export const requestInvitation = data => axios.plain.post(`${baseUrl}/api/v1/admin/invitations`, data);

export const signup = data => axios.plain.post(`${baseUrl}/api/v1/signup`, data);

export const signupAsGuest = () => axios.plain.post(`${baseUrl}/api/v1/signup-guest`);

export const signin = data => axios.plain.post(`${baseUrl}/api/v1/signin`, data);

export const signout = () => axios.secured.delete(`${baseUrl}/api/v1/signin`);

export const me = () => axios.secured.get(`${baseUrl}/api/v1/me`);

/** Projects */

export const getPublicProjects = () => axios.plain.get(`${baseUrl}/api/v1/public-projects`);

/** Boards */

export const createBoard = data => axios.secured.post(`${baseUrl}/api/v1/boards`, data);

export const deleteBoard = id => axios.secured.delete(`${baseUrl}/api/v1/boards/${id}`);

export const getBoards = () => axios.secured.get(`${baseUrl}/api/v1/boards.json`);

export const getBoard = id => axios.secured.get(`${baseUrl}/api/v1/boards/${id}`);

export const updateBoard = ({ boardId, updates }) => axios.secured.patch(`${baseUrl}/api/v1/boards/${boardId}`, updates);

/** Components */

export const getComponents = boardId => axios.secured.get(`${baseUrl}/api/v1/boards/${boardId}/components`);

export const updateComponent = ({ componentId, updates }) => axios.secured.patch(`${baseUrl}/api/v1/components/${componentId}`, updates);

/** Admin */

export const getUsers = () => axios.secured.get(`${baseUrl}/api/v1/admin/users`);

export const deleteUser = id => axios.secured.delete(`${baseUrl}/api/v1/admin/users/${id}`);

export const getInvitations = () => axios.secured.get(`${baseUrl}/api/v1/admin/invitations`);

export const acceptInvitation = id => axios.secured.patch(`${baseUrl}/api/v1/admin/invitation-accept/${id}`);

export const deleteInvitationSilent = id => axios.secured.delete(`${baseUrl}/api/v1/admin/invitations/${id}`);

export const deleteInvitationWithEmail = id => axios.secured.delete(`${baseUrl}/api/v1/admin/invitation-reject/${id}`);

/** Uploads */

export const deleteUpload = params => axios.secured.delete(`${baseUrl}/api/v1/uploads`, { data: params });

/** ActionCable */

export const wsBaseUrl = process.env.NODE_ENV === 'production'
  ? 'wss://api.brittle-pins.com/cable'
  : 'ws://localhost:3001/cable';

export const wsHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
};