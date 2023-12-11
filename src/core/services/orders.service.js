import { axiosClient } from '../interceptors';

export const OrdersService = {
  createPaymentIntents: async (totalBill) => {
    const { data } = await axiosClient.post('/api/orders/payment_intents', { totalBill });
    return data.responseData;
  },

  createOrder: async (payload) => {
    const { data } = await axiosClient.post('/api/orders', payload);
    return data.responseData;
  },

  getOrdersByUserId: async (userId) => {
    const { data } = await axiosClient.get(`/api/orders/users/${userId}`);
    return data.responseData;
  },

  getOrders: async (filterOptions) => {
    const { data } = await axiosClient.get('/api/orders', {
      params: filterOptions,
    });
    return data.responseData;
  },

  updateOrder: async (orderId, changes) => {
    const { data } = await axiosClient.patch(`/api/orders/${orderId}`, changes);
    return data.responseData;
  },
};
