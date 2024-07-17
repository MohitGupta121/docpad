import { useTranslation } from 'react-i18next';
import { View, Text } from 'react-native';

import { makeStyles } from '../../helpers/hooks/useTheme';
import Layout from '../../components/layout/layout';
import PatientList from './patientList';

import { ITheme } from '../../assets/themes/mainTheme';
import PlusIcon from '../../assets/icons/thinPlus.svg';
import palette from '../../assets/themes/mainTheme/palette';
import Button from '../../components/button/button';
import { navigate } from '../../navigation/RootNavigation';
import { useGetCurrentPatientsList } from '../../docpad-api/queries/currentPatientsList';
import { useUpdatePatient } from '../../docpad-api/queries/patients';
import { PatientUpdate } from '../../docpad-api/open-api';
import { useGetUserProfile } from '../../helpers/hooks/useUser';

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
  tableContainer: {
    backgroundColor: palette.palette.surface.primary,
    borderRadius: theme.spacing.spacing6,
    height: '100%',
  },
}));

export default function CurrentPatientList() {
  const { department } = useGetUserProfile();
  const styles = useStyles();
  const { t } = useTranslation('translation', {
    keyPrefix: 'currentPatientList',
  });

  console.log(
    'Use department?.id instead of hardcoded value when data is available',
    department?.id,
  );
  // TODO: Use department?.id instead of hardcoded value when data is available
  const { data } = useGetCurrentPatientsList(
    '5315b6ac-1286-46a6-bde0-b30be3e4a6fe',
  );
  const { mutate: updatePatient } = useUpdatePatient();

  const handlePatientUpdate = (patientId: number, payload: PatientUpdate) => {
    updatePatient({ patientId, payload });
  };

  return (
    <Layout>
      <View style={styles.header}>
        <Text style={styles.headerText}>{t('title')}</Text>
        <View style={styles.buttonContainer}>
          <Button
            backgroundStyle="primary"
            onPress={() => navigate('AddPatient', undefined)}
            icon={<PlusIcon color={palette.palette.icon.invert} />}
          >
            {t('addPatientButtonLabel')}
          </Button>
        </View>
      </View>
      <View style={styles.tableContainer}>
        <PatientList data={data} onUpdate={handlePatientUpdate} />
      </View>
    </Layout>
  );
}
