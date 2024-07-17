import { useMutation } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { AuthKeys } from '../../helpers/constants';
import { BASE_URL } from '@env';

const apiClient = axios.create({
  baseURL: BASE_URL,
});

export const changePassword = async ({
  newPassword,
}: {
  newPassword: string;
}) => {
  const token = await AsyncStorage.getItem(AuthKeys.ACCESS_TOKEN);
  const userId = await AsyncStorage.getItem(AuthKeys.USER_ID);
  if (!token) {
    throw new Error('No token available');
  }
  if (!userId) {
    throw new Error('No user id available');
  }

  const url = `/admin/realms/development_new/users/${userId}/reset-password`;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  const data = {
    type: 'password',
    temporary: false,
    value: newPassword,
  };

  try {
    const response = await apiClient.put(url, data, { headers });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return Promise.reject(error.response.data);
    }
  }
};

export const useChangePassword = () => {
  return useMutation({ mutationFn: changePassword });
};
