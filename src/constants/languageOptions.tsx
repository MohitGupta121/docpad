import React from 'react';
import { Text, View } from 'react-native';
import DEFlag from '../assets/icons/de_flag.svg';
import ENFlag from '../assets/icons/en_flag.svg';
import { makeStyles } from '../helpers/hooks/useTheme';
import { ITheme } from '../assets/themes/mainTheme';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: ITheme) => ({
  checkboxOption: {
    marginBottom: theme.spacing.spacing6,
  },
  checkboxOptionTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: theme.spacing.spacing4,
  },
  checkboxOptionText: {
    ...theme.typography.bodyL,
    marginLeft: theme.spacing.spacing4,
  },
}));

export const SELECTED_LANGAUGE_STORAGE_KEY = '__docpad_selected_language__';
export const DE_X = 'de_de_x';
export const DE_M = 'de_de_m';
export const EN_GB = 'en_gb';

export const getLanguageCodeById = (id: number) => {
  switch (id) {
    case 1:
      return DE_X;
    case 2:
      return EN_GB;
    case 3:
      return DE_M;
    default:
      return DE_X;
  }
};

export const getLanguageIdByCode = (code: string) => {
  switch (code) {
    case DE_X:
      return 1;
    case EN_GB:
      return 2;
    case DE_M:
      return 3;
    default:
      return 1;
  }
};

export const useLanguageOptions = () => {
  const styles = useStyles();
  return [
    {
      id: getLanguageIdByCode(DE_X),
      textComponent: (
        <View style={styles.checkboxOptionTextWrapper}>
          <DEFlag />
          <Text style={styles.checkboxOptionText}>(DE) Deutsch</Text>
        </View>
      ),
      style: styles.checkboxOption,
    },
    {
      id: getLanguageIdByCode(EN_GB),
      textComponent: (
        <View style={styles.checkboxOptionTextWrapper}>
          <ENFlag />
          <Text style={styles.checkboxOptionText}>(EN) English</Text>
        </View>
      ),
    },
  ];
};

export const useLanguageGenderOptions = () => {
  const { t } = useTranslation();
  const styles = useStyles();

  return [
    {
      id: getLanguageIdByCode(DE_X),
      textComponent: (
        <Text style={styles.checkboxOptionText}>
          {t('languageSelection.germanGendered')}
        </Text>
      ),
      style: styles.checkboxOption,
    },
    {
      id: getLanguageIdByCode(DE_M),
      textComponent: (
        <Text style={styles.checkboxOptionText}>
          {t('languageSelection.germanMale')}
        </Text>
      ),
    },
  ];
};
