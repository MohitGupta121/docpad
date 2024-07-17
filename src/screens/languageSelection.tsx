import { View, Text } from 'react-native';
import Logo from '../assets/icons/logo.svg';
import { useTranslation } from 'react-i18next';
import RadioButtonGroup from '../components/radioButtonGroup/radioButtonGroup';
import { Button } from '../components/button';
import { ITheme } from '../assets/themes/mainTheme';
import { makeStyles } from '../helpers/hooks/useTheme';
import {
  getLanguageCodeById,
  getLanguageIdByCode,
  useLanguageOptions,
} from '../constants/languageOptions';
import { useAuth } from '../contextProviders/authContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';

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
  radioButtonGroup: {
    marginBottom: theme.spacing.spacing10,
    width: '100%',
  },
  confirmButton: {
    width: 440,
    marginBottom: theme.spacing.spacing6,
  },
  buttonText: {
    ...theme.typography.titleXS,
    color: theme.palette.text.invert,
  },
  infoText: {
    ...theme.typography.bodyM,
    color: theme.palette.text.tertiary,
  },
}));

type ILanguageSelectionScreen = NativeStackScreenProps<
  RootStackParamList,
  'LanguageSelection'
>;

export default function LanguageSelection({ route }: ILanguageSelectionScreen) {
  const { authToken } = useAuth();
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const styles = useStyles();
  const languageOptions = useLanguageOptions();

  const onLanguageChange = (value: number | undefined) => {
    i18n.changeLanguage(getLanguageCodeById(value));
  };

  return (
    <View style={styles.root}>
      <Logo style={styles.logo} />
      <Text style={styles.headerText}>
        {t('languageSelection.selectLanguage')}
      </Text>
      <View style={styles.radioButtonGroup}>
        <RadioButtonGroup
          isVertical={true}
          options={languageOptions}
          selectedOptionId={getLanguageIdByCode(i18n.language)}
          onChange={(value) => onLanguageChange(value)}
        />
      </View>
      <Button
        style={styles.confirmButton}
        onPress={() => {
          authToken && !route.params.isAfterLogout
            ? navigation.navigate('SplashScreen')
            : navigation.navigate('Welcome');
        }}
      >
        <Text style={styles.buttonText}>{t('languageSelection.start')}</Text>
      </Button>
      <Text style={styles.infoText}>{t('languageSelection.info')}</Text>
    </View>
  );
}
