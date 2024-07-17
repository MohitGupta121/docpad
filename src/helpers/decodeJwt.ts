import { jwtDecode } from 'jwt-decode';
import 'core-js/stable/atob';

interface JwtPayload {
  sub: string;
  [key: string]: any;
}

const decodeJwt = (token: string): string | null => {
  try {
    const decoded: JwtPayload = jwtDecode<JwtPayload>(token);
    return decoded.sub;
  } catch (error) {
    console.error('Failed to decode JWT token:', error);
    return null;
  }
};

export default decodeJwt;
