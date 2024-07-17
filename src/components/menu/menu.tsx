import { ReactNode, useMemo, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import {
  Menu as RNMenu,
  MenuOptions,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';

import MenuOptionSimple from './menuOptionSimple';
import MenuOptionCheckbox from './menuOptionCheckbox';
import { ITheme } from '../../assets/themes/mainTheme';
import { makeStyles } from '../../helpers/hooks/useTheme';
import spacing from '../../assets/themes/mainTheme/spacing';
import SearchInput, { ISearchInput } from '../textInputs/searchInput';
import SelectedOptions from './selectedOptions';

const useStyles = makeStyles((theme: ITheme) => ({
  optionsContainer: {
    ...theme.globalStyles.elevation,
    borderRadius: theme.spacing.spacing4,
    width: 280,
    marginTop: 35,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: theme.palette.border.grayInputDefault,
  },
  searchContainer: {
    paddingHorizontal: theme.spacing.spacing4,
    paddingVertical: theme.spacing.spacing5,
    borderBottomWidth: 1,
    borderBottomColor: theme.palette.border.grayInputDefault,
  },
  scrollMaxHeight: {
    maxHeight: 350,
  },
}));

export type MenuOption = {
  label: string;
  value: string;
};

type MenuProps = {
  children: ReactNode;
  options: MenuOption[];
  onChange: (options: string[]) => void;
  selected?: string[];
  optionStyle?: 'simple' | 'checkbox';
  allowSearch?: boolean;
  searchProps?: Omit<ISearchInput, 'onChange' | 'value'>;
  showSelected?: boolean;
  multiple?: boolean;
  optionsCustomWidth?: any;
};

const Menu = ({
  children,
  options,
  optionStyle = 'simple',
  selected = [],
  onChange,
  allowSearch = false,
  searchProps,
  showSelected,
  multiple,
  optionsCustomWidth,
}: MenuProps) => {
  const styles = useStyles();
  const [filterText, setFilterText] = useState('');
  const CustomMenuOption =
    optionStyle === 'simple' ? MenuOptionSimple : MenuOptionCheckbox;

  const filteredOptions = useMemo(() => {
    return options.filter((option) =>
      option.label.toLowerCase().includes(filterText.toLowerCase()),
    );
  }, [options, filterText]);

  const handleSelect = (option: string) => {
    if (multiple) {
      // If multiple options are allowed, toggle the selected option
      if (selected.includes(option)) {
        onChange(selected.filter((item) => item !== option));
      } else {
        onChange([...selected, option]);
      }
    } else {
      // If only one option is allowed, select the option
      onChange([option]);
    }
  };

  return (
    <RNMenu renderer={renderers.NotAnimatedContextMenu}>
      <MenuTrigger
        customStyles={{
          TriggerTouchableComponent: TouchableOpacity,
          triggerTouchable: { activeOpacity: 1 },
        }}
      >
        {children}
      </MenuTrigger>
      <MenuOptions
        optionsContainerStyle={[
          styles.optionsContainer,
          optionsCustomWidth && optionsCustomWidth,
        ]}
      >
        {allowSearch && (
          <View style={styles.searchContainer}>
            <SearchInput
              {...searchProps}
              onChange={(v) => setFilterText(v || '')}
              value={filterText}
            />
          </View>
        )}
        <ScrollView style={styles.scrollMaxHeight}>
          {showSelected && (
            <SelectedOptions
              options={options}
              selected={selected}
              onRemove={handleSelect}
              onClear={() => onChange([])}
            />
          )}
          {showSelected && selected.length > 0 && (
            <View
              style={[
                styles.borderBottom,
                selected.length === 1
                  ? { paddingTop: spacing.spacing.spacing5 }
                  : null,
              ]}
            />
          )}
          {filteredOptions.map((option, index) => (
            <CustomMenuOption
              key={index}
              onSelect={() => handleSelect(option.value)}
              text={option.label}
              selected={selected.includes(option.value)}
            />
          ))}
        </ScrollView>
      </MenuOptions>
    </RNMenu>
  );
};

export default Menu;
