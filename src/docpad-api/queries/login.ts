import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_URL, CLIENT_ID, CLIENT_SECRET } from '@env';

const url = '/realms/development_new/protocol/openid-connect/token';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

export const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const data = new URLSearchParams({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    username,
    password,
    grant_type: 'password',
  });

  try {
    const response = await apiClient.post(url, data);
    return response.data;
  } catch (error) {
    console.error('Error fetching token:', error.response?.data);
    throw error.response?.data.error_description;
  }
};

export const useLogin = () => {
  return useMutation({ mutationFn: login });
};

export const refreshToken = async (token: string) => {
  const data = new URLSearchParams({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: 'refresh_token',
    refresh_token: token,
  });

  try {
    const response = await apiClient.post(url, data);
    return response.data;
  } catch (error) {
    console.error('Error fetching token:', error);
    throw error;
  }
};
