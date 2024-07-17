import { useMutation, useQuery } from '@tanstack/react-query';
import apiClient from '../apiClient.ts';
import {
  DBPatient,
  DBPatientResponse,
  PatientUpdate,
  ValidInsuranceID,
} from '../open-api';

export const useCreatePatient = (patientConsent: boolean) => {
  return useMutation({
    mutationFn: async (payload: ValidInsuranceID) => {
      const { data } = await apiClient
        .getPatientApi()
        .createPatientPatientCreatePost(patientConsent, payload);
      return data;
    },
  });
};

export const useUpdatePatient = () => {
  return useMutation({
    mutationFn: async ({
      patientId,
      payload,
    }: {
      patientId: number;
      payload: PatientUpdate;
    }) => {
      const { data } = await apiClient
        .getPatientApi()
        .updatePatientPatientPatientIdUpdatePut(patientId, payload);
      return data;
    },
  });
};

export const useGetPatient = (patientId: number) => {
  return useQuery({
    queryKey: ['patient', patientId],
    queryFn: async (): Promise<DBPatient> => {
      const { data } = await apiClient
        .getPatientApi()
        .readPatientPatientPatientIdGet(patientId);
      return data;
    },
  });
};

export const useValidatePatient = (healthInsuranceNumber: string) => {
  return useQuery({
    queryKey: ['validatePatient', healthInsuranceNumber],
    retry: false,
    queryFn: async (): Promise<DBPatientResponse> => {
      const { data } = await apiClient
        .getPatientApi()
        .validatePatientPatientValidatePatientGet(healthInsuranceNumber);
      return data;
    },
  });
};
