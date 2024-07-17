import { useMemo } from 'react';
import { MainTheme } from '../../assets/themes/mainTheme';

export const makeStyles = (fn: any) => {
  return () => {
    return fn(MainTheme());
  };
};

export const useTheme = () => {
  return useMemo(() => {
    return MainTheme();
  }, []);
};
