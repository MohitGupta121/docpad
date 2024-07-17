import { useState } from 'react';
import {
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputProps,
  TextInputSubmitEditingEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import CloseIcon from '../../assets/icons/close.svg';
import EyeIcon from '../../assets/icons/eye.svg';
import TextAreaGripIcon from '../../assets/icons/textAreaGrip.svg';
import { useTheme } from '../../helpers/hooks/useTheme';
import { useStyles } from './styles';

export interface IDefaultTextInput {
  placeholder?: string;
  onChange: (text: string | undefined) => void;
  onSubmitEditing?: (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => void;
  disabled?: boolean;
  label?: string;
  isSuccess?: boolean;
  isError?: boolean;
  message?: string;
  messageType?: 'error' | 'success';
  isExtended?: boolean;
  isEyeIcon?: boolean;
  onPressEye?: () => void;
  isGripIconAvailable?: boolean;
  value?: string;
  fullWidth?: boolean;
  maxLength?: number;
  inputProps?: TextInputProps;
}

const DefaultTextInput = ({
  placeholder,
  onChange,
  disabled,
  label,
  isSuccess,
  isError,
  message,
  messageType,
  isExtended,
  isGripIconAvailable,
  isEyeIcon,
  onPressEye,
  value,
  onSubmitEditing,
  fullWidth,
  maxLength,
  inputProps,
}: IDefaultTextInput) => {
  const styles = useStyles();
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const handleOnFocus = () => {
    setIsFocused(true);
  };

  const handleOnBlur = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => {
    setIsFocused(false);
    onSubmit(e);
  };

  const handleChange = (textValue: string) => {
    onChange(textValue);
  };

  const onSubmit = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => {
    onSubmitEditing ? onSubmitEditing(e!) : undefined;
  };

  return (
    <View style={styles.root}>
      {label && (
        <Text
          style={[
            styles.label,
            isSuccess && styles.successText,
            isError && !isFocused && styles.errorText,
          ]}
        >
          {label}
        </Text>
      )}
      <View
        style={[
          styles.inputContainer,
          isExtended && styles.extendedHeight,
          disabled && styles.disabledBorder,
          disabled && styles.disabledBackground,
          isFocused && styles.focusBorder,
          isSuccess && styles.successBorder,
          isError && !isFocused && styles.errorBorder,
          fullWidth && styles.fullWidthInputContainer,
        ]}
      >
        <TextInput
          style={[
            styles.textInput,
            disabled && styles.disabledBackground,
            disabled && styles.disabledText,
            isEyeIcon && styles.ifEyeIcon,
          ]}
          editable={!disabled}
          placeholder={placeholder}
          placeholderTextColor={
            disabled
              ? theme.palette.text.disabled
              : theme.palette.text.inputPlaceholder
          }
          onChangeText={handleChange}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          blurOnSubmit={true}
          multiline={isExtended}
          value={value}
          numberOfLines={2}
          maxLength={maxLength}
          {...inputProps}
        />
        {isEyeIcon && (
          <TouchableOpacity style={styles.eyeIcon} onPress={onPressEye}>
            <EyeIcon />
          </TouchableOpacity>
        )}
        {isExtended && isGripIconAvailable && (
          <TextAreaGripIcon
            style={[styles.icon, disabled && styles.disabledIcon]}
          />
        )}
      </View>
      {message && !isFocused && (
        <View style={styles.errorMessageWrapper}>
          {messageType === 'error' && (
            <View style={styles.errorIconWrapper}>
              <CloseIcon height={10} width={10} style={styles.errorIcon} />
            </View>
          )}
          <Text
            style={[
              styles.label,
              styles.message,
              isSuccess && styles.successText,
              isError && styles.errorText,
            ]}
          >
            {message}
          </Text>
        </View>
      )}
    </View>
  );
};

export default DefaultTextInput;
