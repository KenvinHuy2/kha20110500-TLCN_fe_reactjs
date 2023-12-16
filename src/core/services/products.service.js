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

  getAllProducts: async (filterOptions, page, pageSize) => {
    const { data } = await axiosClient.get('/api/products', {
      params: { ...filterOptions, page, pageSize },
    });
    return data.responseData;
  },

  deleteProduct: async (productId) => {
    const { data } = await axiosClient.delete(`/api/products/${productId}`);
    return data.responseData;
  },

  getProductById: async (productId) => {
    const { data } = await axiosClient.get(`/api/products/${productId}`);
    return data.responseData;
  },

  updateProduct: async (productId, payload) => {
    const { data } = await axiosClient.patch(`/api/products/${productId}`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data.responseData;
  },
};
