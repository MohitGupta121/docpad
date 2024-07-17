import { RNKeycloak } from '@react-keycloak/native';

// Setup Keycloak instance as needed
// Pass initialization options as required
const keycloakConf = new RNKeycloak({
  url: 'https://authservice.docpad.saturn.pi-medical-germany.de',
  realm: 'development_new',
  clientId: 'docpad_application',
});

export default keycloakConf;
