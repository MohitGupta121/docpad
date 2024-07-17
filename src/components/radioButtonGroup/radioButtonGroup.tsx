import React, { useMemo } from 'react';
import { ITheme } from '../../assets/themes/mainTheme';
import { makeStyles, useTheme } from '../../helpers/hooks/useTheme';
import BouncyCheckboxGroup, {
  ICheckboxButton,
} from 'react-native-bouncy-checkbox-group';
import { map } from 'lodash';
import { View } from 'react-native';

const useStyles = makeStyles((theme: ITheme) => ({
  root: {
    borderColor: theme.palette.border.dark,
  },
  checkedBorder: {
    borderColor: theme.palette.surface.brandPrimary,
  },
  disabledBackground: {
    backgroundColor: theme.palette.surface.disabled,
    borderColor: theme.palette.border.grayControlsDefaultDisabled,
  },
  disabledBackgroundIcon: {
    backgroundColor: theme.palette.border.grayControlsDefaultDisabled,
  },
  icon: {
    width: 10,
    height: 10,
    borderRadius: theme.spacing.spacing5,
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
  vertical: {
    flexDirection: 'column',
  },
}));

interface ICheckboxButtonCorrected extends Omit<ICheckboxButton, 'id'> {
  id: number;
}

export interface IRadioButtonGroup {
  options: ICheckboxButtonCorrected[];
  selectedOptionId: number | undefined;
  onChange: (selectedItemId: number | undefined) => void;
  disabled?: boolean;
  isHistoryValue?: boolean;
  isVertical?: boolean;
}

const RadioButtonGroup = ({
  options,
  selectedOptionId,
  onChange,
  disabled,
  isHistoryValue,
  isVertical,
}: IRadioButtonGroup) => {
  const styles = useStyles();
  const theme = useTheme();

  const radioOptions = useMemo(() => {
    return map(options, (aOption) => {
      aOption.isChecked = aOption.id === selectedOptionId;
      aOption.innerIconStyle = [
        styles.root,
        disabled && styles.disabledBackground,
        aOption.id === selectedOptionId && !disabled && styles.checkedBorder,
        isHistoryValue && styles.historyDataRoot,
        isHistoryValue && disabled && styles.historyDataDisabled,
      ];
      aOption.iconComponent = (
        <View
          style={
            aOption.id === selectedOptionId && [
              styles.root,
              styles.icon,
              disabled && styles.disabledBackgroundIcon,
              isHistoryValue && styles.historyDataIcon,
            ]
          }
        />
      );

      return aOption;
    });
  }, [
    disabled,
    isHistoryValue,
    options,
    selectedOptionId,
    styles.checkedBorder,
    styles.disabledBackground,
    styles.disabledBackgroundIcon,
    styles.historyDataDisabled,
    styles.historyDataIcon,
    styles.historyDataRoot,
    styles.icon,
    styles.root,
  ]);

  return (
    <BouncyCheckboxGroup
      style={isVertical && styles.vertical}
      data={radioOptions}
      initial={selectedOptionId}
      onChange={(selectedItem) => onChange(Number(selectedItem.id))}
      checkboxProps={{
        disabled: disabled,
        size: theme.spacing.spacing6,
        fillColor: 'transparent',
      }}
    />
  );
};

export default RadioButtonGroup;
