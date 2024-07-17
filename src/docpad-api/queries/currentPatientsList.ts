import { useQuery } from '@tanstack/react-query';

import apiClient from '../apiClient';

export const useGetCurrentPatientsList = (departmentId: string) => {
  return useQuery({
    queryKey: ['current_patients_list'],
    queryFn: async () => {
      const { data } = await apiClient
        .getCurrentPatientsApi()
        .getCurrentPatientListCurrentPatientsListGet(departmentId);
      return data;
    },
  });
};
