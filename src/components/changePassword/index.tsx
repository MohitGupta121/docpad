import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from 'react-native';
import { ITheme } from 'src/assets/themes/mainTheme';
import Check from '../../assets/icons/check.svg';
import Cross from '../../assets/icons/close.svg';
import Colors from '../../assets/themes/mainTheme/palette';
import { makeStyles } from '../../helpers/hooks/useTheme';
import { Button } from '../button';
import TextInput from '../textInputs/textInput';
import { useChangePassword } from '../../docpad-api/queries/changePassword';

const useStyles = makeStyles((theme: ITheme) => ({
  root: {
    width: 382,
    flexDirection: 'column',
    backgroundColor: theme.palette.surface.primary,
    borderRadius: theme.spacing.spacing6,
    padding: theme.spacing.spacing8,
  },
  headerText: {
    ...theme.typography.titleM,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing.spacing7,
  },
  inputContainer: {
    gap: theme.spacing.spacing6,
  },
  loginButton: {
    width: 130,
  },
  forgotPassword: {
    ...theme.typography.titleXS,
    color: theme.palette.text.brandPrimary,
    marginBottom: theme.spacing.spacing7,
    marginStart: theme.spacing.spacing5,
  },
  buttonText: {
    ...theme.typography.titleXS,
    color: theme.palette.text.invert,
  },
  conditionWrapper: {
    marginTop: theme.spacing.spacing2,
  },
  conditionItem: {
    gap: theme.spacing.spacing4,
    paddingHorizontal: theme.spacing.spacing5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  conditionText: {
    ...theme.typography.bodyXS,
    color: theme.palette.text.primary,
  },
}));

const ChangePassword = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'changePassword',
  });
  const styles = useStyles();
  const { mutate } = useChangePassword();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm();
  const [isOldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setNewPasswordVisible] = useState(false);
  const [isRePasswordVisible, setRePasswordVisible] = useState(false);

  const newPassword = watch('newPassword', '');

  const onSubmit = (data) => {
    console.log(data);
    mutate(
      { newPassword: newPassword },
      {
        onSuccess: (response) => {
          console.log('Password Changed Successfully', response);
          control._reset();
        },
        onError: (error: any) => {
          console.log('Login Failed', error);
        },
      },
    );
  };

  const validatePassword = (value: string) => {
    const conditions = [
      {
        label: t('newPasswordCondition1'),
        test: (v: string) => v.length >= 12,
      },
      {
        label: t('newPasswordCondition2'),
        test: (v: string) => /[A-Z]/.test(v),
      },
      {
        label: t('newPasswordCondition3'),
        test: (v: string) => /[0-9]/.test(v),
      },
      {
        label: t('newPasswordCondition4'),
        test: (v: string) => /[!@#$%^&*(),.?":{}|<>]/.test(v),
      },
    ];
    return conditions.every((condition) => condition.test(value));
  };

  const validateRePassword = (value: string) => {
    return value === newPassword;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.root}>
        <Text style={styles.headerText}>{t('title')}</Text>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            name="oldPassword"
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => {
              return (
                <>
                  <TextInput
                    label={t('oldPassword')}
                    placeholder={t('oldPasswordPlaceholder')}
                    value={value}
                    onChange={(e) => {
                      onChange(e);
                    }}
                    isError={!!errors?.oldPassword?.message}
                    message={errors?.oldPassword?.message as string}
                    inputProps={{
                      secureTextEntry: !isOldPasswordVisible,
                      textContentType: 'password',
                    }}
                    onPressEye={() =>
                      setOldPasswordVisible(!isOldPasswordVisible)
                    }
                    fullWidth
                    isEyeIcon
                  />
                </>
              );
            }}
          />
          <View>
            <Controller
              control={control}
              name="newPassword"
              rules={{ required: true, validate: validatePassword }}
              render={({ field: { value, onChange } }) => {
                return (
                  <TextInput
                    label={t('newPassword')}
                    placeholder={t('newPasswordPlaceholder')}
                    value={value}
                    onChange={(e) => {
                      onChange(e);
                    }}
                    inputProps={{
                      secureTextEntry: !isNewPasswordVisible,
                      textContentType: 'password',
                    }}
                    onPressEye={() =>
                      setNewPasswordVisible(!isNewPasswordVisible)
                    }
                    fullWidth
                    isEyeIcon
                  />
                );
              }}
            />

            <View style={styles.conditionWrapper}>
              {[
                {
                  label: t('newPasswordCondition1'),
                  valid: newPassword.length >= 12,
                },
                {
                  label: t('newPasswordCondition2'),
                  valid: /[A-Z]/.test(newPassword),
                },
                {
                  label: t('newPasswordCondition3'),
                  valid: /[0-9]/.test(newPassword),
                },
                {
                  label: t('newPasswordCondition4'),
                  valid: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
                },
              ].map((condition, index) => (
                <View key={index} style={styles.conditionItem}>
                  {condition.valid ? (
                    <Check color={Colors.palette.icon.positive} />
                  ) : (
                    <Cross color={Colors.palette.icon.primary} />
                  )}
                  <Text style={styles.conditionText}>{condition.label}</Text>
                </View>
              ))}
            </View>
          </View>
          <Controller
            control={control}
            name="rePassword"
            rules={{
              required: true,
              validate: validateRePassword,
            }}
            render={({ field: { value, onChange } }) => {
              return (
                <TextInput
                  label={t('reEnterPassword')}
                  placeholder={t('reEnterPasswordPlaceholder')}
                  value={value}
                  onChange={(e) => {
                    onChange(e);
                  }}
                  isError={!validateRePassword(value)}
                  message={
                    !validateRePassword(value)
                      ? t('rePasswordError')
                      : undefined
                  }
                  messageType={'error'}
                  inputProps={{
                    secureTextEntry: !isRePasswordVisible,
                    textContentType: 'password',
                  }}
                  onPressEye={() => setRePasswordVisible(!isRePasswordVisible)}
                  fullWidth
                  isEyeIcon
                />
              );
            }}
          />
          <Button
            disabled={!isValid}
            style={styles.loginButton}
            onPress={() => {
              Keyboard.dismiss();
              handleSubmit(onSubmit)();
            }}
          >
            <Text style={styles.buttonText}>{t('changePasswordButton')}</Text>
          </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChangePassword;
