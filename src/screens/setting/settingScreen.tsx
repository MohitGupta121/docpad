import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import { ITheme } from '../../assets/themes/mainTheme';
import ChangePassword from '../../components/changePassword/index.tsx';
import Layout from '../../components/layout/layout.tsx';
import { makeStyles } from '../../helpers/hooks/useTheme';
import { useGetUserProfile } from '../../helpers/hooks/useUser';
import LanguageSelectCard from './languageSelectCard.tsx';

const useStyles = makeStyles((theme: ITheme) => ({
  root: {
    flexDirection: 'column',
  },
  title: {
    ...theme.typography.titleL,
    marginBottom: theme.spacing.spacing7,
  },
  settingsWrapper: {
    flexDirection: 'row',
  },
  languageCardWrapper: {
    marginLeft: theme.spacing.spacing7,
  },
  passwordChangeButton: {
    alignSelf: 'flex-start',
    padding: theme.spacing.spacing6,
  },
  iconColor: {
    color: theme.palette.icon.invert,
  },
  buttonText: {
    ...theme.typography.titleXS,
    fontWeight: 600,
    marginLeft: theme.spacing.spacing2,
    color: theme.palette.text.invert,
  },
}));

export default function SettingScreen() {
  const styles = useStyles();
  const { t } = useTranslation();
  const { profile, onUpdateUser, selectedLanguage } = useGetUserProfile();

  const onLanguageChange = (value: string) => {
    if (profile) {
      onUpdateUser({
        ...profile,
        attributes: {
          ...profile.attributes,
          language_selection: [value],
        },
      });
    } else {
      console.error('No user data found');
    }
  };

  return (
    <Layout>
      <View style={styles.root}>
        <Text style={styles.title}>{t('sidebar.settings')}</Text>
        <View style={styles.settingsWrapper}>
          <View>
            <ChangePassword />
          </View>
          <View style={styles.languageCardWrapper}>
            <LanguageSelectCard
              selectedLanguage={selectedLanguage}
              onChange={onLanguageChange}
            />
          </View>
        </View>
      </View>
    </Layout>
  );
}
