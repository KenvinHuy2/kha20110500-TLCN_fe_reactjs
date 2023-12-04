import { axiosClient } from '../interceptors';

export const MarkersService = {
  getAllMarkers: async () => {
    const { data } = await axiosClient.get('/api/markers');
    return data.responseData;
  },

  createMarker: async (payload) => {
    const { data } = await axiosClient.post('/api/markers', payload);
    return data.responseData;
  },

  updateMarker: async (markerId, payload) => {
    const { data } = await axiosClient.patch(`/api/markers/${markerId}`, payload);
    return data.responseData;
  },

  deleteMarker: async (markerId) => {
    const { data } = await axiosClient.delete(`/api/markers/${markerId}`);
    return data.responseData;
  },
};
