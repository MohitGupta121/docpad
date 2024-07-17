import InAppBrowser from 'react-native-inappbrowser-reborn';

import apiClient from '../../docpad-api/apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const handleChangePassword = async (keycloak: any) => {
  if (keycloak) {
    // direct user to keycloak change password settings
    const server = keycloak.authServerUrl;
    const realm = keycloak.realm;
    const clientId = keycloak.clientId;
    const redirectUri = 'docpad://homepage';

    await InAppBrowser.openAuth(
      `${server}/realms/${realm}/protocol/openid-connect/auth?client_id=${clientId}` +
        `&redirect_uri=${redirectUri}&response_type=code&scope=openid&kc_action=UPDATE_PASSWORD`,
      redirectUri,
      { dismissButtonStyle: 'done', modalEnabled: true },
    );
  }
};

export const onLogout = async () => {
  await AsyncStorage.clear();
  apiClient.setToken(undefined);
  return Promise.resolve();
};
