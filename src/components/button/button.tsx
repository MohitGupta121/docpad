import { ReactNode, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { ITheme } from '../../assets/themes/mainTheme';
import { makeStyles, useTheme } from '../../helpers/hooks/useTheme';

const useStyles = makeStyles((theme: ITheme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 44,
    height: 44,
    borderRadius: theme.spacing.spacing11,
    padding: theme.spacing.spacing5,
  },
  leftIconContainer: {
    marginRight: theme.spacing.spacing2,
  },
  rightIconContainer: {
    marginLeft: theme.spacing.spacing2,
  },
  text: {
    ...theme.typography.titleXS,
  },
  focussedBorder: {
    borderWidth: theme.spacing.spacing1,
    borderColor: theme.palette.border.dark,
  },
  linkButton: {
    paddingHorizontal: theme.spacing.spacing1,
    paddingVertical: theme.spacing.spacing5,
  },
}));

export interface IButton {
  children: ReactNode;
  onPress: () => void;
  backgroundStyle?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'quaternary'
    | 'linkButton';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  style?: any;
}

const Button = ({
  children,
  onPress,
  backgroundStyle = 'primary',
  icon,
  iconPosition = 'left',
  disabled,
  style,
}: IButton) => {
  const styles = useStyles();
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const findBackground = () => {
    switch (backgroundStyle) {
      case 'secondary':
        if (disabled) {
          return {
            backgroundColor: theme.palette.button.primarySecondaryDisabled,
          };
        }
        if (isFocused) {
          return { backgroundColor: theme.palette.button.secondaryFocused };
        }
        if (isPressed) {
          return { backgroundColor: theme.palette.button.secondaryPressed };
        }
        return { backgroundColor: theme.palette.button.secondaryDefault };
      case 'tertiary':
        if (isPressed) {
          return { backgroundColor: theme.palette.button.tertiaryPressed };
        }
        return { backgroundColor: 'transparent' };
      case 'quaternary':
        if (isPressed) {
          return { backgroundColor: theme.palette.button.quaternaryPressed };
        }
        return { backgroundColor: theme.palette.surface.primary };
      case 'linkButton':
        return { backgroundColor: 'transparent' };
      default:
        if (disabled) {
          return {
            backgroundColor: theme.palette.button.primarySecondaryDisabled,
          };
        }
        if (isFocused) {
          return { backgroundColor: theme.palette.button.primaryFocused };
        }
        if (isPressed) {
          return { backgroundColor: theme.palette.button.primaryPressed };
        }
        return { backgroundColor: theme.palette.button.primaryDefault };
    }
  };

  const findTextColor = () => {
    switch (backgroundStyle) {
      case 'secondary':
        if (disabled) {
          return { color: theme.palette.text.disabled };
        }
        if (isFocused) {
          return { color: theme.palette.text.invert };
        }
        return { color: theme.palette.text.brandPrimary };
      case 'tertiary':
        if (disabled) {
          return { color: theme.palette.text.disabled };
        }
        if (isFocused) {
          return { color: theme.palette.text.primary };
        }
        return { color: theme.palette.text.brandPrimary };
      case 'quaternary':
        if (disabled) {
          return { color: theme.palette.text.disabled };
        }
        if (isFocused) {
          return { color: theme.palette.text.brandPrimary };
        }
        return { color: theme.palette.text.primary };
      case 'linkButton':
        if (disabled) {
          return { color: theme.palette.text.disabled };
        }
        return { color: theme.palette.text.brandPrimary };
      default:
        if (disabled) {
          return { color: theme.palette.text.disabled };
        }
        if (isFocused) {
          return { color: theme.palette.text.brandPrimary };
        }
        return { color: theme.palette.text.invert };
    }
  };

  const handleOnPress = () => {
    setIsFocused(false);
    onPress();
  };

  const handleOnFocus = () => {
    setIsFocused(true);
  };

  const handleOnBlur = () => {
    setIsFocused(false);
  };

  const handlePressIn = (isPressIn: boolean) => {
    setIsPressed(isPressIn);
  };

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={handleOnPress}
      style={[
        styles.root,
        style,
        findBackground(),
        isFocused && styles.focussedBorder,
        backgroundStyle === 'linkButton' && styles.linkButton,
      ]}
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
      onPressIn={() => handlePressIn(true)}
      onPressOut={() => handlePressIn(false)}
      activeOpacity={1}
    >
      {iconPosition === 'left' && icon && (
        <View style={styles.leftIconContainer}>{icon}</View>
      )}
      {typeof children === 'string' ? (
        <Text style={[styles.text, findTextColor()]}>{children}</Text>
      ) : (
        children
      )}
      {iconPosition === 'right' && icon && (
        <View style={styles.rightIconContainer}>{icon}</View>
      )}
    </TouchableOpacity>
  );
};

export default Button;
