import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import apiClient from '../apiClient.ts';

export const useGetAllDepartments = (userId: string) => {
  return useQuery({
    queryKey: ['all-departments', userId],
    queryFn: async () => {
      const { data } = await apiClient
        .getDoctorDashboardApi()
        .getAllDepartmentsDashboardsDoctorDoctorIdAllDepartmentsGet(userId);
      return data;
    },
  });
};

export const useGetSelectedDepartment = (userId: string) => {
  return useQuery({
    queryKey: ['selected-department', userId],
    queryFn: async () => {
      const { data } = await apiClient
        .getDoctorDashboardApi()
        .getDoctorSelectedDepartmentDashboardsDoctorDoctorIdSelectedDepartmentGet(
          userId,
        );
      return data;
    },
    enabled: !!userId,
  });
};

export const useUpdateDoctorDepartment = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { departmentId: string; reason?: string }) => {
      return apiClient
        .getDoctorDashboardApi()
        .patchDoctorSelectedDepartmentDashboardsDoctorDoctorIdDepartmentDepartmentIdSelectedDepartmentPut(
          userId,
          payload.departmentId,
          payload.reason,
        )
        .then(() => {
          queryClient.invalidateQueries({ queryKey: ['selected-department'] });
        });
    },
  });
};
