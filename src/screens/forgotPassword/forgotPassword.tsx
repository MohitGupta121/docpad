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
import { makeStyles } from '../../helpers/hooks/useTheme';
import { useNavigation } from '@react-navigation/native';
import { Controller, useForm } from 'react-hook-form';
import TextInput from '../../components/textInputs/textInput';

const ForgotPassword: React.FC = () => {
  const { t } = useTranslation();
  const styles = useStyles();
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log('errors: ', errors);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.root}>
        <Logo style={styles.logo} />
        <Text style={styles.headerText}>{t('forgotPassword.title')}</Text>
        <Text style={styles.infoText}>{t('forgotPassword.body')}</Text>
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
                  label={t('forgotPassword.email')}
                  placeholder={t('forgotPassword.emailPlaceholder')}
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
          <Button
            style={styles.forgotPasswordButton}
            onPress={() => {
              Keyboard.dismiss();
              navigation.navigate('CheckYourInbox');
              // handleSubmit(onSubmit)();
            }}
          >
            <Text style={styles.buttonText}>
              {t('forgotPassword.forgotPasswordBtn')}
            </Text>
          </Button>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login');
            }}
          >
            <Text style={styles.loginTxt}>{t('forgotPassword.login')}</Text>
          </TouchableOpacity>
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
    marginBottom: theme.spacing.spacing8,
  },
  inputContainer: {
    width: 390,
  },
  forgotPasswordButton: {
    width: 390,
    marginTop: theme.spacing.spacing8,
  },
  loginTxt: {
    alignSelf: 'center',
    ...theme.typography.titleXS,
    color: theme.palette.text.brandPrimary,
    marginTop: theme.spacing.spacing4,
  },
  buttonText: {
    ...theme.typography.bodyL,
    color: theme.palette.text.invert,
  },
  infoText: {
    ...theme.typography.bodyM,
    color: theme.palette.text.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.spacing8,
  },
}));

export default ForgotPassword;
