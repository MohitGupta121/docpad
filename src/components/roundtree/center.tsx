import { View } from 'react-native';
import { ITheme } from '../../assets/themes/mainTheme';
import {
  CIRCLE_RADIUS,
  HIGHLIGHTED_CIRCLE_RADIUS,
} from '../../constants/roundtree.ts';
import { makeStyles } from '../../helpers/hooks/useTheme.ts';

const useStyles = makeStyles((theme: ITheme) => ({
  root: {
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS,
    borderWidth: 2,
    borderColor: theme.palette.border.grayControlsDefaultDisabled,
    backgroundColor: theme.palette.surface.primary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  highlight: {
    borderWidth: 1,
    width: HIGHLIGHTED_CIRCLE_RADIUS * 2,
    height: HIGHLIGHTED_CIRCLE_RADIUS * 2,
    borderRadius: HIGHLIGHTED_CIRCLE_RADIUS * 1.5,
    borderColor: theme.palette.border.brandPrimary,
    backgroundColor: theme.palette.surface.brandSecondary,
  },
}));

export interface ICenter {
  isHighlighted: boolean;
}

const Center = ({ isHighlighted }: ICenter) => {
  const styles = useStyles();

  return <View style={[styles.root, isHighlighted && styles.highlight]} />;
};

export default Center;
