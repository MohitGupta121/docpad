import React, { useState } from 'react';
import { useTheme } from '../../helpers/hooks/useTheme';
import { TextInput, TouchableOpacity, View } from 'react-native';
import SearchIcon from '../../assets/icons/search.svg';
import CloseIcon from '../../assets/icons/close.svg';
import { useStyles } from './styles';

export interface ISearchInput {
  placeholder?: string;
  onChange: (text: string | undefined) => void;
  disabled?: boolean;
  value?: string;
  isSearchFullWidth?: boolean;
}

const SearchInput = ({
  placeholder,
  onChange,
  disabled,
  value,
  isSearchFullWidth,
}: ISearchInput) => {
  const styles = useStyles();
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const handleOnFocus = () => {
    setIsFocused(true);
  };

  const handleOnBlur = () => {
    setIsFocused(false);
  };

  const handleClear = () => {
    onChange('');
  };

  return (
    <View>
      <View
        style={[
          styles.inputContainer,
          styles.searchInputContainer,
          disabled && styles.disabledBorder,
          disabled && styles.disabledBackground,
          isFocused && styles.focusBorder,
          isSearchFullWidth && styles.fullWidth,
        ]}
      >
        <SearchIcon
          style={[styles.searchIcon, disabled && styles.disabledIcon]}
        />
        <TextInput
          style={[
            styles.textInput,
            styles.searchTextInput,
            disabled && styles.disabledBackground,
            disabled && styles.disabledText,
          ]}
          editable={!disabled}
          placeholder={placeholder}
          placeholderTextColor={
            disabled
              ? theme.palette.text.disabled
              : theme.palette.text.inputPlaceholder
          }
          onChangeText={onChange}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          value={value}
        />
        {value && (
          <TouchableOpacity style={styles.closeIcon} onPress={handleClear}>
            <CloseIcon
              style={[
                styles.searchIcon,
                disabled && styles.disabledIcon,
                styles.closeIcon,
              ]}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SearchInput;
