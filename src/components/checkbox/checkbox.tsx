import React from 'react';
import { ITheme } from '../../assets/themes/mainTheme';
import { makeStyles, useTheme } from '../../helpers/hooks/useTheme';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { View } from 'react-native';

const useStyles = makeStyles((theme: ITheme) => ({
  root: {
    borderColor: theme.palette.border.grayControlsDefaultDisabled,
    borderRadius: theme.spacing.spacing2,
    backgroundColor: theme.palette.surface.primary,
  },
  checkedBorder: {
    borderColor: theme.palette.surface.brandPrimary,
  },
  disabledBackground: {
    backgroundColor: theme.palette.surface.disabled,
  },
  disabledBackgroundIcon: {
    backgroundColor: theme.palette.border.grayControlsDefaultDisabled,
  },
  icon: {
    width: 15,
    height: 15,
    borderRadius: theme.spacing.spacing1,
    backgroundColor: theme.palette.surface.brandPrimary,
  },
  historyDataRoot: {
    borderColor: theme.palette.border.grayControlsHistoryDataDefaultDisabled,
  },
  historyDataIcon: {
    backgroundColor:
      theme.palette.border.grayControlsHistoryDataDefaultDisabled,
  },
  historyDataDisabled: {
    backgroundColor: theme.palette.border.grayControlsDefaultDisabled,
  },
  text: {
    ...theme.typography.bodyM,
    color: theme.palette.text.primary,
    textDecorationLine: 'none',
    marginLeft: -theme.spacing.spacing3,
  },
}));

export interface ICheckbox {
  checked: boolean | undefined;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  isHistoryValue?: boolean;
  text?: string;
}

const Checkbox = ({
  checked,
  onChange,
  disabled,
  isHistoryValue,
  text,
}: ICheckbox) => {
  const styles = useStyles();
  const theme = useTheme();

  return (
    <BouncyCheckbox
      text={text}
      textStyle={styles.text}
      disabled={disabled}
      isChecked={checked}
      disableBuiltInState={true}
      size={theme.spacing.spacing7}
      onPress={(c) => onChange(!c)}
      innerIconStyle={[
        styles.root,
        disabled && styles.disabledBackground,
        checked && !disabled && styles.checkedBorder,
        isHistoryValue && styles.historyDataRoot,
        isHistoryValue && disabled && styles.historyDataDisabled,
      ]}
      iconComponent={
        <View
          style={
            checked && [
              styles.root,
              styles.icon,
              disabled && styles.disabledBackgroundIcon,
              isHistoryValue && styles.historyDataIcon,
            ]
          }
        />
      }
      fillColor={'transparent'}
    />
  );
};

export default Checkbox;
