import { axiosClient } from '../interceptors';

export const UsersService = {
  getAllUsers: async () => {
    const { data } = await axiosClient.get('/api/users');
    return data.responseData;
  },

  createUser: async (payload) => {
    const { data } = await axiosClient.post('/api/users', payload);
    return data.responseData;
  },

  getUserById: async (userId) => {
    const { data } = await axiosClient.get(`/api/users/${userId}`);
    return data.responseData;
  },

  updateUser: async (userId, payload) => {
    const { data } = await axiosClient.patch(`/api/users/${userId}`, payload);
    return data.responseData;
  },

  deleteUser: async (userId) => {
    const { data } = await axiosClient.delete(`/api/users/${userId}`);
    return data.responseData;
  },
};
