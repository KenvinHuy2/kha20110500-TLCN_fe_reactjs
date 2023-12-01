import { axiosClient } from '../interceptors';

export const ProductsService = {
  createProduct: async (payload) => {
    const { data } = await axiosClient.post('/api/products', payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data.responseData;
  },
};
