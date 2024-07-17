import { useState } from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ITheme } from '../../assets/themes/mainTheme';
import { makeStyles } from '../../helpers/hooks/useTheme';
import Layout from './../../components/layout/layout';
import { navigate } from '../../navigation/RootNavigation';
import Header from '../../components/navigationHeaderWithTitle/header.tsx';
import ButtonContainer from '../../components/addPatient/buttonContainer.tsx';
import ErrorMsg from '../../components/errorDialog/errorMsg.tsx';
import Checkbox from '../../components/checkbox/checkbox.tsx';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'src/navigation.tsx';
import { useCreatePatient } from '../../docpad-api/queries/patients.ts';
import { DBPatientResponse } from 'src/docpad-api/open-api';

const useStyles = makeStyles((theme: ITheme) => ({
  body: {
    ...theme.typography.bodyL,
    marginBottom: theme.spacing.spacing4,
  },
  info: {
    ...theme.typography.bodyS,
    marginBottom: theme.spacing.spacing9,
  },
}));

type IPatientSearchResults = NativeStackScreenProps<
  RootStackParamList,
  'PatientSearchResults'
>;

export default function PatientSearchResults({ route }: IPatientSearchResults) {
  const { errorMsg, healthInsuranceNumber } = route.params || undefined;
  const { t } = useTranslation();
  const styles = useStyles();
  const [confirmationChecked, setConfirmationChecked] = useState(false);
  const { mutate: createPatient } = useCreatePatient(confirmationChecked);

  const onConfirm = () => {
    if (errorMsg) {
      navigate('AddPatient', undefined);
    } else {
      const createPatientData = {
        healthInsuranceNumber: healthInsuranceNumber,
      };
      createPatient(createPatientData, {
        onSuccess: (data: DBPatientResponse) => {
          navigate('PatientDashboard', { patientId: data.patientData.id });
        },
        onError: (error: Error) => console.log(error.message),
      });
    }
  };

  return (
    <>
      <Layout withoutSidebar>
        {errorMsg ? (
          <>
            <Header
              title={t('addPatientScreen.searchResults.title')}
              onBackNavigation={() => navigate('AddPatient', undefined)}
            />
            <ErrorMsg errorMsg={errorMsg} />
          </>
        ) : (
          <>
            <Header
              title={t('addPatientScreen.consentConfirmation.title')}
              onBackNavigation={() => navigate('AddPatient', undefined)}
            />
            <View>
              <Text style={styles.body}>
                {t('addPatientScreen.consentConfirmation.body')}
              </Text>
              <Text style={styles.info}>
                {t('addPatientScreen.consentConfirmation.info')}
              </Text>
              <Checkbox
                text={t('addPatientScreen.consentConfirmation.checkbox')}
                checked={confirmationChecked}
                onChange={() => setConfirmationChecked(!confirmationChecked)}
              />
            </View>
          </>
        )}
      </Layout>
      <ButtonContainer
        cancelButtonLabel={t('buttons.cancel')}
        confirmButtonLabel={
          errorMsg
            ? t('addPatientScreen.searchResults.errorButton')
            : t('addPatientScreen.consentConfirmation.confirmButton')
        }
        confirmDisabled={!confirmationChecked && !errorMsg}
        onCancel={() => navigate('DoctorDashboard', undefined)}
        onConfirm={onConfirm}
      />
    </>
  );
}
