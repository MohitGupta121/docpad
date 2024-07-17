import { useQuery } from '@tanstack/react-query';

import apiClient from '../apiClient';

export const useGetDashboardPatients = () => {
  return useQuery({
    queryKey: ['patients-list'],
    queryFn: async () => {
      const { data } = await apiClient
        .getDoctorDashboardApi()
        .getDashboardDashboardsPatientsGet();
      return data;
    },
  });
};
