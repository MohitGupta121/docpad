import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import apiClient from '../apiClient';

const getInstitutionId = async () => {
  try {
    const { data } = await axios.get(
      `${apiClient.getKeycloakUrl('groups')}`,
      apiClient.getAxiosConfig(),
    );
    return data?.[0]?.id;
  } catch (error) {
    console.error('Error fetching institution id', error);
    throw error;
  }
};

const getAllDoctors = async () => {
  try {
    const institutionId = await getInstitutionId();

    const response = await axios.get(
      `${apiClient.getKeycloakUrl(`groups/${institutionId}/members`)}`,
      apiClient.getAxiosConfig(),
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching doctors', error);
    throw error;
  }
};

export const useGetAllDoctors = () => {
  return useQuery({
    queryKey: ['doctors-all'],
    queryFn: getAllDoctors,
  });
};
