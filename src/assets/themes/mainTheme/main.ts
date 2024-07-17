import typography from './typography';
import palette from './palette';
import spacing from './spacing';
import globalStyles from './globalStyles';

const main = () => {
  return {
    ...typography,
    ...palette,
    ...spacing,
    ...globalStyles,
  };
};
export default main;
