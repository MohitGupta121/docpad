import 'react-native-url-polyfill/auto';
import axios from 'axios';
import { formatISO } from 'date-fns';
import Config from 'react-native-config';

import {
  Configuration,
  CurrentPatientsListApi,
  DoctorsDashboardApi,
  KeycloakExtensionsApi,
  PatientApi,
} from './open-api';
import keycloakConf from '../keycloack';
import { refreshToken } from '../contextProviders/authContext';

const API_LOG_LEVEL: 'default' | 'verbose' = 'verbose';
const API_URL = Config.API_URL;

class ApiClient {
  public accessToken?: string;

  getAPIConfiguration = () => {
    const config = new Configuration({
      accessToken: this.accessToken,
    });

    config.isJsonMime = () => false;

    return config;
  };

  getAxiosInstance = () => {
    const axiosInstance = axios.create();

    axiosInstance.interceptors.request.use(
      (config) => {
        const ts = formatISO(new Date());
        if (API_LOG_LEVEL === 'verbose') {
          console.debug(
            `${ts} - request: ${config.method} ${config.url} ${JSON.stringify(
              config.headers,
            )} ${JSON.stringify(config.data)}`,
          );
        } else {
          console.debug(`${ts} - request: ${config.method} ${config.url}`);
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    axiosInstance.interceptors.response.use(
      (response) => {
        const ts = formatISO(new Date());
        if (API_LOG_LEVEL === 'verbose') {
          console.debug(
            `${ts} - response: [${response.status}] ${response.config.method} ${
              response.config.url
            } ${JSON.stringify(response.headers)} ${JSON.stringify(
              response.data,
            )}`,
          );
        } else {
          console.debug(
            `${ts} - response: [${response.status}] ${response.config.method} ${response.config.url}`,
          );
        }

        return response;
      },
      (error) => {
        const ts = formatISO(new Date());

        if (API_LOG_LEVEL === 'verbose') {
          console.debug(
            `${ts} - response: [${error.response?.status}] ${
              error.config.method
            } ${error.config.url} ${JSON.stringify(
              error.headers,
            )} ${JSON.stringify(error.data)}`,
          );
        } else {
          console.debug(
            `${ts} - response: [${error.response?.status}] ${error.config.method} ${error.config.url}`,
          );
        }

        return Promise.reject(error);
      },
    );

    axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        console.log('error.response.status', error.response.status);
        if (error.response.status === 401) {
          const newToken = await refreshToken();
          console.log('newToken', newToken);
          this.setToken(newToken);
          return axios(originalRequest);
        }
        return Promise.reject(error);
      },
    );

    return axiosInstance;
  };

  public setToken = (value: string | undefined) => {
    this.accessToken = value;
  };

  public getAxiosConfig = () => {
    return { headers: { Authorization: `Bearer ${this.accessToken}` } };
  };

  public getKeycloakUrl = (urlEnd: string) => {
    return `${keycloakConf.authServerUrl}/admin/realms/${keycloakConf.realm}/${urlEnd}`;
  };

  public getDoctorDashboardApi = (): DoctorsDashboardApi => {
    return new DoctorsDashboardApi(
      this.getAPIConfiguration(),
      API_URL,
      this.getAxiosInstance(),
    );
  };

  public getPatientApi = (): PatientApi => {
    return new PatientApi(
      this.getAPIConfiguration(),
      API_URL,
      this.getAxiosInstance(),
    );
  };

  public getCurrentPatientsApi = (): CurrentPatientsListApi => {
    return new CurrentPatientsListApi(
      this.getAPIConfiguration(),
      API_URL,
      this.getAxiosInstance(),
    );
  };

  public getKeycloakExtensionsAPI = (): KeycloakExtensionsApi => {
    return new KeycloakExtensionsApi(
      this.getAPIConfiguration(),
      API_URL,
      this.getAxiosInstance(),
    );
  };
}

const apiClient = new ApiClient();

export default apiClient;
