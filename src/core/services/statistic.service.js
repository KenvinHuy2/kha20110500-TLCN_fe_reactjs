import { axiosClient } from '../interceptors';

export const StatisticService = {

  getStatistics: async (filterOptions) => {
    const { data } = await axiosClient.get('/api/statistics', {
      params: filterOptions,
    });
    return data.responseData;
  },
};
