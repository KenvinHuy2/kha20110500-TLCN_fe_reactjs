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

  forgotPassword: async (email) => {
    const { data } = await axiosClient.post('/api/auth/forgot-password', { email });
    return data;
  },

  resendOtp: async (email) => {
    const { data } = await axiosClient.post('/api/auth/resend-otp', { email });
    return data;
  },

  verifyOtp: async (payload) => {
    const { data } = await axiosClient.post('/api/auth/verify-otp', payload);
    return data.responseData;
  },
};
