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
};
