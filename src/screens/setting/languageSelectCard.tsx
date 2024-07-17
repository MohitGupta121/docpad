import { startsWith } from 'lodash';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { ITheme } from '../../assets/themes/mainTheme';
import RadioButtonGroup from '../../components/radioButtonGroup/radioButtonGroup';
import {
  DE_M,
  DE_X,
  getLanguageCodeById,
  getLanguageIdByCode,
  useLanguageGenderOptions,
  useLanguageOptions,
} from '../../constants/languageOptions';
import { makeStyles } from '../../helpers/hooks/useTheme';

const useStyles = makeStyles((theme: ITheme) => ({
  root: {
    flexDirection: 'column',
    backgroundColor: theme.palette.surface.primary,
    borderRadius: theme.spacing.spacing6,
    padding: theme.spacing.spacing8,
    width: 382,
  },
  title: {
    ...theme.typography.titleM,
    fontWeight: 600,
    marginBottom: theme.spacing.spacing6,
  },
  selectLanguageText: {
    ...theme.typography.bodySMediumWeight,
    marginBottom: theme.spacing.spacing6,
  },
  selectGenderText: {
    marginTop: theme.spacing.spacing8,
  },
}));

interface ILanguageSelectCard {
  selectedLanguage: string;
  onChange: (value: string) => void;
}

export default function LanguageSelectCard({
  selectedLanguage,
  onChange,
}: ILanguageSelectCard) {
  const styles = useStyles();
  const { t } = useTranslation();
  const languageOptions = useLanguageOptions();
  const genderOptions = useLanguageGenderOptions();
  const selectedLanguageCode = getLanguageIdByCode(selectedLanguage);

  const onLanguageChange = (value?: number) => {
    onChange(getLanguageCodeById(value));
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>
        {t('languageSelection.languageSwitcher')}
      </Text>
      <Text style={styles.selectLanguageText}>
        {t('languageSelection.selectLanguage')}
      </Text>
      <View style={styles.radioButtonGroup}>
        <RadioButtonGroup
          isVertical={true}
          options={languageOptions}
          selectedOptionId={
            selectedLanguageCode === getLanguageIdByCode(DE_M)
              ? getLanguageIdByCode(DE_X)
              : selectedLanguageCode
          }
          onChange={onLanguageChange}
        />
      </View>
      <Text style={[styles.selectLanguageText, styles.selectGenderText]}>
        {t('languageSelection.selectGender')}
      </Text>
      <View style={styles.radioButtonGroup}>
        <RadioButtonGroup
          disabled={!startsWith(selectedLanguage, 'de')}
          isVertical={true}
          options={genderOptions}
          selectedOptionId={selectedLanguageCode}
          onChange={onLanguageChange}
        />
      </View>
    </View>
  );
}
