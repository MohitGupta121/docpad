import { ReactNode } from 'react';
import { Text, View } from 'react-native';

import { ITheme } from '../../assets/themes/mainTheme';
import { makeStyles } from '../../helpers/hooks/useTheme';
import CloseIcon from '../../assets/icons/close.svg';
import Colors from '../../assets/themes/mainTheme/palette';
import IconButton from '../button/iconButton';

const useStyles = makeStyles((theme: ITheme) => ({
  chipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.spacing4,
    padding: theme.spacing.spacing4,
    borderRadius: theme.spacing.spacing2,
  },
  defaultBg: {
    backgroundColor: theme.palette.surface.brandSecondary,
  },
  defaultText: {
    color: theme.palette.text.tertiary,
  },
  primaryBg: {
    backgroundColor: theme.palette.surface.brandSecondary,
  },
  primaryText: {
    color: theme.palette.text.brandPrimary,
  },
}));

type ChipProps = {
  children: ReactNode;
  color?: 'default' | 'primary';
  onRemove?: () => void;
  textStyle?: any;
  chipStyle?: any;
  numberOfLines?: number;
};

const Chip = ({
  children,
  color = 'primary',
  onRemove,
  chipStyle,
  textStyle,
  numberOfLines,
}: ChipProps) => {
  const styles = useStyles();

  return (
    <View style={[styles.chipContainer, styles[`${color}Bg`], chipStyle]}>
      {typeof children === 'string' ? (
        <Text
          style={[styles[`${color}Text`], textStyle]}
          numberOfLines={numberOfLines}
        >
          {children}
        </Text>
      ) : (
        children
      )}

      {!!onRemove && (
        <IconButton onPress={onRemove}>
          <CloseIcon color={Colors.palette.icon.brandPrimary} />
        </IconButton>
      )}
    </View>
  );
};

export default Chip;
