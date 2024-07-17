import AsyncStorage from '@react-native-async-storage/async-storage';
import { refreshToken as refreshTokenApi } from '../docpad-api/queries/login';
import apiClient from '../docpad-api/apiClient';
import { useEffect, useState } from 'react';
import { AuthKeys } from '../helpers/constants';

export const useAuth = () => {
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchAuthToken = async () => {
      const token = await getAccessToken();
      if (token) {
        setAuthToken(token);
        apiClient.setToken(token);
      }
    };
    fetchAuthToken();
  }, []);

  return { authToken };
};

export const setLogin = async ({
  access_token,
  refresh_token,
  expires_in,
}: {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}) => {
  await AsyncStorage.setItem(AuthKeys.ACCESS_TOKEN, access_token);
  await AsyncStorage.setItem(AuthKeys.REFRESH_TOKEN, refresh_token);
  await AsyncStorage.setItem(AuthKeys.EXPIRES_IN, expires_in.toString());

  apiClient.setToken(access_token);

  return true;
};

export const refreshToken = async () => {
  const refresh_token = await AsyncStorage.getItem(AuthKeys.REFRESH_TOKEN);
  if (!refresh_token) {
    throw new Error('No refresh token available');
  }

  const response = await refreshTokenApi(refresh_token);
  const {
    access_token,
    refresh_token: new_refresh_token,
    expires_in,
  } = response;

  await AsyncStorage.setItem(AuthKeys.ACCESS_TOKEN, access_token);
  await AsyncStorage.setItem(AuthKeys.REFRESH_TOKEN, new_refresh_token);
  await AsyncStorage.setItem(AuthKeys.EXPIRES_IN, expires_in.toString());

  apiClient.setToken(access_token);

  return access_token;
};

export const getAccessToken = () => AsyncStorage.getItem(AuthKeys.ACCESS_TOKEN);
