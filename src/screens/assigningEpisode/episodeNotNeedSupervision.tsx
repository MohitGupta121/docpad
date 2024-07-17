import { Text, View } from 'react-native';
import { ITheme } from '../../assets/themes/mainTheme/index.ts';
import { makeStyles } from '../../helpers/hooks/useTheme.ts';
import Layout from '../../components/layout/layout.tsx';
import IconButton from '../../components/button/iconButton.tsx';
import { navigate } from '../../navigation/RootNavigation.tsx';
import ChevronLeftIcon from '../../assets/icons/chevronLeft.svg';
import { useTranslation } from 'react-i18next';
import Button from '../../components/button/button.tsx';
import SaveIcon from '../../assets/icons/save.svg';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'src/navigation.tsx';

const useStyles = makeStyles((theme: ITheme) => ({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    ...theme.typography.titleM,
    textAlign: 'center',
    marginBottom: theme.spacing.spacing7,
  },
  titleMiddle: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  line: {
    borderBottomWidth: 1,
    borderColor: theme.palette.border.brandSecondary,
    position: 'absolute',
    height: 1,
    width: '105%',
    left: -theme.spacing.spacing7,
    bottom: 0,
  },
  infoText: {
    ...theme.typography.bodyL,
    color: theme.palette.text.primary,
    marginTop: theme.spacing.spacing8,
  },
  descriptionText: {
    ...theme.typography.bodyL,
    color: theme.palette.text.primary,
    marginTop: theme.spacing.spacing4,
  },
  selectContentWrapper: {
    ...theme.globalStyles.elevation,
    borderRadius: theme.spacing.spacing4,
    backgroundColor: theme.palette.surface.primary,
    marginTop: theme.spacing.spacing6,
    minHeight: 150,
    maxWidth: 300,
    padding: theme.spacing.spacing5,
  },
  cardHeadingText: {
    ...theme.typography.titleXS,
  },
  cardValueText: {
    ...theme.typography.bodyM,
  },
  nameWrapper: {
    flexDirection: 'row',
    paddingVertical: theme.spacing.spacing2,
  },
  buttonText: {
    ...theme.typography.titleXXS,
    fontWeight: 700,
    color: theme.palette.text.primary,
  },
  activeButtonText: {
    color: theme.palette.text.brandPrimary,
  },
  buttonContainer: {
    marginTop: 'auto',
    backgroundColor: theme.palette.surface.primary,
    paddingHorizontal: theme.spacing.spacing7,
    paddingTop: theme.spacing.spacing6,
    paddingBottom: theme.spacing.spacing9,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: theme.spacing.spacing9,
  },
  saveIcon: {
    marginRight: theme.spacing.spacing2,
    color: theme.palette.icon.invert,
  },
  disabledIcon: {
    color: theme.palette.icon.disabled,
  },
  saveButtonText: {
    ...theme.typography.titleXS,
    color: theme.palette.text.disabled,
  },
}));

type IEpisodeNotNeedSupervisionScreen = NativeStackScreenProps<
  RootStackParamList,
  'EpisodeNotNeedSupervision'
>;

export default function EpisodeNotNeedSupervision({
  route,
}: IEpisodeNotNeedSupervisionScreen) {
  const styles = useStyles();
  const { t } = useTranslation();

  return (
    <>
      <Layout withoutSidebar>
        <View style={styles.header}>
          {!route.params.isAfterLogin && (
            <IconButton
              onPress={() => navigate('CurrentPatientList', undefined)}
            >
              <ChevronLeftIcon />
            </IconButton>
          )}
          <Text
            style={[
              styles.title,
              route.params.isAfterLogin && styles.titleMiddle,
            ]}
          >
            {t('episodeNotNeedSupervision.title')}
          </Text>
          <View style={styles.placeholder} />
          <View style={styles.line} />
        </View>

        <Text style={styles.infoText}>
          {t('episodeNotNeedSupervision.infoText')}
        </Text>

        <View style={styles.selectContentWrapper}>
          <View style={styles.nameWrapper}>
            <Text style={styles.cardHeadingText}>Name, Gender: </Text>
            <Text style={styles.cardValueText}>
              {'Leutheusser-Schnarrenberger,\n Sabine (W)'}
            </Text>
          </View>
          <View style={styles.nameWrapper}>
            <Text style={styles.cardHeadingText}>Age: </Text>
            <Text style={styles.cardValueText}>Age</Text>
          </View>
          <View style={styles.nameWrapper}>
            <Text style={styles.cardHeadingText}>Trigger For Visit: </Text>
            <Text style={styles.cardValueText}>Trigger For Visit</Text>
          </View>
          <View style={styles.nameWrapper}>
            <Text style={styles.cardHeadingText}>{'1\u00B0 - '}</Text>
            <Text style={styles.cardValueText} />
          </View>
          <View style={styles.nameWrapper}>
            <Text style={styles.cardHeadingText}>{'2\u00B0 - '}</Text>
            <Text style={styles.cardValueText} />
          </View>
        </View>
        <Text style={styles.descriptionText}>
          {t('episodeNotNeedSupervision.description')}
        </Text>
      </Layout>
      <View style={styles.buttonContainer}>
        {!route.params.isAfterLogin && (
          <Button
            backgroundStyle="tertiary"
            onPress={() => navigate('CurrentPatientList', undefined)}
          >
            {t('buttons.cancel')}
          </Button>
        )}
        <Button backgroundStyle="primary" onPress={() => {}}>
          <SaveIcon style={[styles.saveIcon]} />
          <Text style={styles.saveButtonText}>{t('buttons.assignToMe')}</Text>
        </Button>
      </View>
    </>
  );
}
