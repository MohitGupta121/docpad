import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Logo from '../../assets/icons/logo.svg';
import { ITheme } from '../../assets/themes/mainTheme';
import { Button } from '../../components/button';
import TextInput from '../../components/textInputs/textInput';
import { setLogin } from '../../contextProviders/authContext';
import { useLogin } from '../../docpad-api/queries/login';
import { makeStyles } from '../../helpers/hooks/useTheme';

const LoginScreen: React.FC = () => {
  const { t } = useTranslation();
  const styles = useStyles();
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log('errors: ', errors);
  const { mutate } = useLogin();
  const [apiError, setApiError] = useState<string | null>(null);

  const onSubmit = (data) => {
    setApiError(null);
    console.log(data);
    mutate(
      { username: data.email, password: data.password },
      {
        onSuccess: (response) => {
          setLogin(response);
          navigation.navigate('SplashScreen');
        },
        onError: (error: any) => {
          console.log('Login Failed', error);
          setApiError(error);
        },
      },
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.root}>
        <Logo style={styles.logo} />
        <Text style={styles.headerText}>{t('loginScreen.login')}</Text>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            name="email"
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Enter a valid email address',
              },
            }}
            render={({ field: { value, onChange } }) => {
              return (
                <TextInput
                  label={t('loginScreen.email')}
                  placeholder={t('loginScreen.emailPlaceholder')}
                  value={value}
                  onChange={(e) => {
                    onChange(e);
                  }}
                  isError={!!errors?.email?.message}
                  message={errors?.email?.message as string}
                  inputProps={{
                    keyboardType: 'email-address',
                    inputMode: 'email',
                    textContentType: 'emailAddress',
                  }}
                  fullWidth
                />
              );
            }}
          />
          <Controller
            control={control}
            name="password"
            rules={{ required: 'Password is required' }}
            render={({ field: { value, onChange } }) => {
              return (
                <TextInput
                  label={t('loginScreen.password')}
                  placeholder={t('loginScreen.passwordPlaceholder')}
                  value={value}
                  onChange={(e) => {
                    onChange(e);
                  }}
                  isError={!!errors?.password?.message || !!apiError}
                  message={(errors?.password?.message as string) || apiError}
                  inputProps={{
                    secureTextEntry: true,
                    textContentType: 'password',
                  }}
                  fullWidth
                />
              );
            }}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ForgotPassword');
            }}
          >
            <Text style={styles.forgotPassword}>
              {t('loginScreen.forgotPassword')}
            </Text>
          </TouchableOpacity>
          <Button
            style={styles.loginButton}
            onPress={() => {
              Keyboard.dismiss();
              handleSubmit(onSubmit)();
            }}
          >
            <Text style={styles.buttonText}>
              {t('loginScreen.loginButton')}
            </Text>
          </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const useStyles = makeStyles((theme: ITheme) => ({
  root: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.surface.primary,
  },
  logo: {
    marginBottom: theme.spacing.spacing11,
  },
  headerText: {
    ...theme.typography.titleXXL,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing.spacing10,
  },
  inputContainer: {
    gap: theme.spacing.spacing6,
  },
  loginButton: {
    width: 450,
    marginBottom: theme.spacing.spacing6,
  },
  forgotPassword: {
    ...theme.typography.titleXS,
    color: theme.palette.text.brandPrimary,
    marginBottom: theme.spacing.spacing7,
    marginStart: theme.spacing.spacing5,
  },
  buttonText: {
    ...theme.typography.bodyL,
    color: theme.palette.text.invert,
  },
  infoText: {
    ...theme.typography.bodyM,
    color: theme.palette.text.tertiary,
    textAlign: 'center',
    marginBottom: theme.spacing.spacing10,
  },
}));

export default LoginScreen;
