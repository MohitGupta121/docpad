import { QueryClientProvider } from '@tanstack/react-query';
import { MenuProvider } from 'react-native-popup-menu';
import { ReactNativeKeycloakProvider } from '@react-keycloak/native';

import keycloakConf from './keycloack';
import queryClient from './queryClient';
import Navigation from './navigation';

export default function App() {
  return (
    <ReactNativeKeycloakProvider
      authClient={keycloakConf}
      initOptions={{
        flow: 'implicit',
        redirectUri: 'docpad://homepage',
        useNonce: true,
        enableLogging: true,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <MenuProvider>
          <Navigation />
        </MenuProvider>
      </QueryClientProvider>
    </ReactNativeKeycloakProvider>
  );
}
