import apiClient from '../apiClient';
import { useQuery, useMutation } from '@tanstack/react-query';
import { UserInfo, UserRepresentation } from '../open-api';

export const useUsers = (only_physicians: boolean) => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async (): Promise<KeycloakUser[]> => {
      const { data } = await apiClient
        .getKeycloakExtensionsAPI()
        .getUsersKeycloakExtensionsUsersGet(only_physicians);
      return data;
    },
  });
};

export const useUserById = (userId: string) => {
  return useQuery({
    enabled: !!userId,
    queryKey: ['user', userId],
    queryFn: async (): Promise<UserInfo> => {
      const { data } = await apiClient
        .getKeycloakExtensionsAPI()
        .getSingleUserKeycloakExtensionsUsersUserIdGet(userId);
      return data;
    },
  });
};

export const useUpdateUser = (userId: string) => {
  return useMutation({
    mutationFn: async (attributes: UserRepresentation) => {
      return apiClient
        .getKeycloakExtensionsAPI()
        .editUserKeycloakExtensionsUsersEditUserIdPut(userId, attributes);
    },
  });
};
