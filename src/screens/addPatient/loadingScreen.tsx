import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { CirclesLoader } from 'react-native-indicator';
import { ITheme } from '../../assets/themes/mainTheme';
import { makeStyles, useTheme } from '../../helpers/hooks/useTheme';

const useStyles = makeStyles((theme: ITheme) => ({
  root: {
    backgroundColor: theme.palette.surface.appBackground,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    ...theme.typography.bodyL,
    marginTop: theme.spacing.spacing8,
  },
}));

export default function LoadingScreen() {
  const { t } = useTranslation('translation', {
    keyPrefix: 'addPatientScreen',
  });
  const styles = useStyles();
  const theme = useTheme();

  return (
    <View style={styles.root}>
      <CirclesLoader color={theme.palette.surface.brandPrimary} size={48} />
      <Text style={styles.text}>{t('searchResults.searchingPatients')}</Text>
    </View>
  );
}
