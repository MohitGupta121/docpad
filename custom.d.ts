// allows imports of .svg, .json and .png files
declare module '*.png' {
  const value: any;
  export = value;
}

declare module '*.svg' {
  import { SvgProps } from 'react-native-svg';
  const content: React.StatelessComponent<SvgProps>;
  export default content;
}

declare module '*.json' {
  const content: Record<string, unknown>;
  export default content;
}

type KeycloakUser = {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  attributes?: Record<string, string | string[]>;
  groups?: string[];
  enabled?: boolean;
};

declare module 'react-native-indicator';

declare module 'react-native-gesture-responder';

declare module 'react-native-gifted-charts';
