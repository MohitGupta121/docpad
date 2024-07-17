import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import Logo from '../../assets/icons/logo.svg';
import { ITheme } from '../../assets/themes/mainTheme';
import { Button } from '../../components/button';
import { makeStyles } from '../../helpers/hooks/useTheme';
import { useNavigation } from '@react-navigation/native';

const useStyles = makeStyles((theme: ITheme) => ({
  root: {
    height: '100%',
    width: 392,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    marginBottom: theme.spacing.spacing11,
  },
  headerText: {
    ...theme.typography.titleXXL,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing.spacing10,
  },
  loginButton: {
    width: 440,
    marginBottom: theme.spacing.spacing6,
  },
  buttonText: {
    ...theme.typography.bodyL,
    color: theme.palette.text.brandPrimary,
  },
  infoText: {
    ...theme.typography.bodyM,
    color: theme.palette.text.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.spacing10,
  },
}));

export default function CheckYourInbox() {
  const { t } = useTranslation();
  const styles = useStyles();
  const navigation = useNavigation();

  return (
    <View style={styles.root}>
      <Logo style={styles.logo} />
      <Text style={styles.headerText}>
        {t('forgotPassword.checkYourInbox.title')}
      </Text>
      <Text style={styles.infoText}>
        {t('forgotPassword.checkYourInbox.body')}
      </Text>
      <Button
        backgroundStyle="secondary"
        style={styles.loginButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>
          {t('forgotPassword.checkYourInbox.backToLogin')}
        </Text>
      </Button>
    </View>
  );
}
