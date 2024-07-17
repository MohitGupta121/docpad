import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, ImageBackground } from 'react-native';

import { makeStyles } from '../../helpers/hooks/useTheme';
import Layout from './../../components/layout/layout';
import PatientList from './patientList';

import { ITheme } from '../../assets/themes/mainTheme';
import RefreshIcon from '../../assets/icons/arrowCounterClockwise.svg';
import PlusIcon from '../../assets/icons/thinPlus.svg';
import LabResults from './../../assets/images/lab-result.png';
import ImagingResults from './../../assets/images/imaging-result.png';
import Episodes from './../../assets/images/episodes.png';
import SupervisorsNote from './../../assets/images/supervisors-note.png';
import palette from './../../assets/themes/mainTheme/palette';
import Button from '../../components/button/button';
import { navigate } from '../../navigation/RootNavigation';
import { useGetDashboardPatients } from '../../docpad-api/queries/dashboard';

const useStyles = makeStyles((theme: ITheme) => ({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    ...theme.typography.titleL,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: theme.spacing.spacing6,
  },
  cards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.spacing7,
  },
  card: {
    width: 254,
    height: 109,
  },
  image: {
    ...theme.globalStyles.elevation,
    flex: 1,
    justifyContent: 'space-between',
    borderRadius: theme.spacing.spacing6,
    padding: theme.spacing.spacing6,
  },
  cardHead: {
    ...theme.typography.titleXXL,
  },
  cardContent: {
    ...theme.typography.titleS,
  },
  dashboardText: {
    ...theme.typography.titleXS,
  },
  tableContainer: {
    backgroundColor: palette.palette.surface.primary,
    borderRadius: theme.spacing.spacing6,
    height: '79%',
  },
  refreshButton: {
    ...theme.typography.titleXS,
    color: palette.palette.text.brandPrimary,
  },
}));

export default function DoctorDashboard() {
  const styles = useStyles();
  const { t } = useTranslation('translation', {
    keyPrefix: 'doctorDashboard',
  });
  const { data, refetch } = useGetDashboardPatients();

  const notificationCards = useMemo(
    () => [
      {
        type: 'Lab Results',
        label: 'New Lab Results',
        count: data?.notificationsCount?.newLabResults,
        image: LabResults,
        color: palette.palette.text.labs,
      },
      {
        type: 'Imaging Results',
        label: 'New Imaging Results',
        count: data?.notificationsCount?.newImagingResults,
        image: ImagingResults,
        color: palette.palette.text.imaging,
      },
      {
        type: 'Documents & Episodes',
        label: 'New Documents & Episodes',
        count: data?.notificationsCount?.newDocuments,
        image: Episodes,
        color: palette.palette.text.documents,
      },
      {
        type: 'Co-signature Requests',
        label: 'New Co-signature Requests',
        count: data?.notificationsCount?.signatureRequired,
        image: SupervisorsNote,
        color: palette.palette.text.coSignature,
      },
    ],
    [data?.notificationsCount],
  );

  return (
    <Layout>
      <View style={styles.header}>
        <Text style={styles.headerText}>{t('title')}</Text>
        <View style={styles.buttonContainer}>
          <Button
            backgroundStyle="secondary"
            onPress={refetch}
            icon={<RefreshIcon color={palette.palette.icon.brandPrimary} />}
          >
            <Text style={styles.refreshButton}>{t('refreshButtonLabel')}</Text>
          </Button>
          <Button
            backgroundStyle="primary"
            onPress={() => navigate('AddPatient', undefined)}
            icon={<PlusIcon color={palette.palette.icon.invert} />}
          >
            {t('addPatientButtonLabel')}
          </Button>
        </View>
      </View>
      <View style={styles.cards}>
        {notificationCards.map((record) => (
          <View style={styles.card} key={record.type}>
            <ImageBackground
              source={record.image}
              resizeMode="cover"
              style={styles.image}
            >
              <Text style={[styles.cardHead, { color: record.color }]}>
                {record.count}
              </Text>
              <Text style={[styles.cardContent, { color: record.color }]}>
                {record.label}
              </Text>
            </ImageBackground>
          </View>
        ))}
      </View>
      <Text style={styles.dashboardText}>
        {t('overviewActionsDescription')}
      </Text>
      <View style={styles.tableContainer}>
        <PatientList data={data?.patients} />
      </View>
    </Layout>
  );
}
