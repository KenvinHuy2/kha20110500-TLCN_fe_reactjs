import { axiosClient } from '../interceptors';

export const UsersService = {
  getAllUsers: async () => {
    const { data } = await axiosClient.get('/api/users');
    return data.responseData;
  },
};
