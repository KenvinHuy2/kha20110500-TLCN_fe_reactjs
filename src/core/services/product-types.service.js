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

  updateProductType: async (productTypeId, payload) => {
    const { data } = await axiosClient.patch(`/api/product-types/${productTypeId}`, payload);
    return data.responseData;
  },

  deleteProductType: async (productTypeId) => {
    const { data } = await axiosClient.delete(`/api/product-types/${productTypeId}`);
    return data.responseData;
  },
};
