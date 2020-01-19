import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333'
});
export const deleteUserGit = id => api.delete(`/devs/:'${id}`)

export default api;