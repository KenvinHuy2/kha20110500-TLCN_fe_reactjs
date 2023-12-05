import { axiosClient } from '../interceptors';

export const AuthService = {
  register: async (payload) => {
    const { data } = await axiosClient.post('/api/auth/register', payload);
    return data.responseData;
  },

  login: async (payload) => {
    const { data } = await axiosClient.post('/api/auth/login', payload);
    return data.responseData;
  },
};
