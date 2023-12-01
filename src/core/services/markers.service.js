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
};
