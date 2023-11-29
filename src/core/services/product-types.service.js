import { axiosClient } from '../interceptors';

export const ProductTypesService = {
  getAllProductTypes: async () => {
    const { data } = await axiosClient.get('/api/product-types');
    return data.responseData;
  },

  createProductType: async (payload) => {
    const { data } = await axiosClient.post('/api/product-types', payload);
    return data.responseData;
  },
};
