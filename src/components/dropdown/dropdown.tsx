import React, { useCallback, useState } from 'react';
import { ITheme } from '../../assets/themes/mainTheme';
import { makeStyles } from '../../helpers/hooks/useTheme';
import { Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import ChevronDownIcon from '../../assets/icons/chevronDown.svg';
import ChevronUpIcon from '../../assets/icons/chevronUp.svg';
import TickIcon from '../../assets/icons/check.svg';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: ITheme) => ({
  root: {
    flexDirection: 'column',
    width: 342,
  },
  fullWidth: {
    width: '100%',
  },
  label: {
    ...theme.typography.bodySMediumWeight,
    paddingVertical: theme.spacing.spacing4,
    paddingHorizontal: theme.spacing.spacing5,
    fontWeight: 500,
    color: theme.palette.text.primary,
  },
  dropdown: {
    height: theme.spacing.spacing10,
    borderWidth: 1,
    borderRadius: theme.spacing.spacing2,
    borderColor: theme.palette.border.grayInputDefault,
  },
  dropdownContainer: {
    minHeight: 100,
    maxHeight: 400,
    borderWidth: 1,
    borderRadius: theme.spacing.spacing2,
    borderColor: theme.palette.border.grayInputDefault,
  },
  disabledBackground: {
    backgroundColor: theme.palette.surface.disabled,
  },
  disabledBorder: {
    borderColor: theme.palette.border.grayControlsDefaultDisabled,
  },
  activeBorder: {
    borderColor: theme.palette.border.brandSecondary,
  },
  placeholderText: {
    ...theme.typography.bodyM,
    color: theme.palette.text.inputPlaceholder,
  },
  disabledText: {
    color: theme.palette.text.disabled,
  },
  iconEnabled: {
    color: theme.palette.icon.primary,
  },
  iconDisabled: {
    color: theme.palette.icon.disabled,
  },
  listItemStyle: {
    ...theme.typography.bodyM,
    color: theme.palette.text.primary,
  },
  listItemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: theme.palette.border.grayInputDefault,
  },
  selectedItemContainer: {
    backgroundColor: theme.palette.surface.visualSeparator,
  },
  tickIcon: {
    color: theme.palette.icon.positive,
  },
  innerLabel: {
    ...theme.typography.bodyM,
    color: theme.palette.text.primary,
  },
  searchContainer: {
    borderBottomWidth: 0,
  },
  searchTextInputContainer: {
    ...theme.typography.bodyM,
    borderRadius: theme.spacing.spacing15,
    borderWidth: 1,
    borderColor: theme.palette.border.grayInputDefault,
  },
}));

export interface IDropdown {
  placeholder?: string;
  label: string;
  options: any[];
  value: string | number;
  onChange: (value: any) => void;
  disabled?: boolean;
  fullWidth?: boolean;
  customStyle?: any;
  isSearchable?: boolean;
  searchPlaceholder?: string;
}

const Dropdown = ({
  placeholder,
  label,
  options,
  value,
  onChange,
  disabled,
  fullWidth,
  customStyle,
  isSearchable,
  searchPlaceholder,
}: IDropdown) => {
  const styles = useStyles();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const renderIcons = useCallback(
    (isUp: boolean) => {
      if (isUp) {
        return (
          <ChevronUpIcon
            style={disabled ? styles.iconDisabled : styles.iconEnabled}
          />
        );
      } else {
        return (
          <ChevronDownIcon
            style={disabled ? styles.iconDisabled : styles.iconEnabled}
          />
        );
      }
    },
    [disabled, styles.iconDisabled, styles.iconEnabled],
  );

  const renderTickIcon = useCallback(() => {
    return <TickIcon style={styles.tickIcon} />;
  }, [styles.tickIcon]);

  return (
    <View style={[styles.root, fullWidth && styles.fullWidth]}>
      <Text style={styles.label}>{label}</Text>
      <DropDownPicker
        placeholder={placeholder ? placeholder : t('general.selectPlaceholder')}
        items={options}
        setValue={(getValue) => onChange(getValue(value))}
        value={value}
        open={open}
        setOpen={setOpen}
        disabled={disabled}
        style={[
          styles.dropdown,
          disabled && styles.disabledBackground,
          disabled && styles.disabledBorder,
          open && styles.activeBorder,
          customStyle,
        ]}
        placeholderStyle={[
          styles.placeholderText,
          disabled && styles.disabledText,
        ]}
        dropDownContainerStyle={styles.dropdownContainer}
        listItemLabelStyle={styles.listItemStyle}
        listItemContainerStyle={styles.listItemContainer}
        selectedItemContainerStyle={styles.selectedItemContainer}
        TickIconComponent={renderTickIcon}
        ArrowDownIconComponent={() => renderIcons(false)}
        ArrowUpIconComponent={() => renderIcons(true)}
        labelStyle={styles.innerLabel}
        searchable={isSearchable}
        searchContainerStyle={styles.searchContainer}
        searchTextInputStyle={styles.searchTextInputContainer}
        searchPlaceholder={searchPlaceholder}
      />
    </View>
  );
};

export default Dropdown;
