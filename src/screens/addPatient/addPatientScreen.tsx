import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { ITheme } from '../../assets/themes/mainTheme';
import { makeStyles } from '../../helpers/hooks/useTheme';
import Layout from './../../components/layout/layout';
import TextInput from './../../components/textInputs/textInput';
import Header from '../../components/navigationHeaderWithTitle/header.tsx';
import ButtonContainer from '../../components/addPatient/buttonContainer.tsx';
import { useValidatePatient } from '../../docpad-api/queries/patients.ts';
import { isValidInsuranceId } from '../../helpers/insuranceId.ts';
import { Controller, useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { navigate } from '../../navigation/RootNavigation.tsx';
import { extractStatusCode } from '../../helpers/utils.ts';
import LoadingScreen from '../../screens/addPatient/loadingScreen.tsx';

const useStyles = makeStyles((theme: ITheme) => ({
  body: {
    ...theme.typography.bodyL,
    marginBottom: theme.spacing.spacing6,
  },
  inputContainer: {
    gap: theme.spacing.spacing6,
  },
}));

type PatientForm = {
  healthInsuranceNumber: string;
  // insuranceProvider: number; TODO: uncomment this when the private health insurance workflow is implemented
};

export default function AddPatientScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const noDataError = t('addPatientScreen.searchResults.noDataError');
  const multipleDataError = t(
    'addPatientScreen.searchResults.multipleDataError',
  );
  const styles = useStyles();
  const { control, formState, handleSubmit } = useForm<PatientForm>({
    defaultValues: {
      healthInsuranceNumber: '',
      //insuranceProvider: 0, TODO: uncomment this when the private health insurance workflow is implemented
    },
  });
  const [healthInsuranceNumber, setHealthInsuranceNumber] = useState('');
  const [validationLoading, setValidationLoading] = useState(false);
  const {
    data: validatePatient,
    isError,
    isSuccess,
    error,
    isLoading,
  } = useValidatePatient(healthInsuranceNumber || '');

  useEffect(() => {
    if (healthInsuranceNumber && isLoading) {
      setValidationLoading(true);
    }

    if (healthInsuranceNumber && !isLoading) {
      setValidationLoading(false);
    }

    if (healthInsuranceNumber && validatePatient) {
      if (isSuccess && validatePatient.patientData) {
        // if an existing docpad patient was found, navigate to patient dashboard
        navigate('PatientDashboard', {
          patientId: validatePatient.patientData.id,
        });
      } else if (isSuccess && !validatePatient.patientData) {
        // if a patient was found in the pms but not in the docpad, navigate to the patient consent screen
        navigate('PatientSearchResults', {
          healthInsuranceNumber: healthInsuranceNumber,
        });
      }
    } else if (isError) {
      const errorCode = extractStatusCode(error.message);
      if (errorCode === 404) {
        // if no patient was found in the pms, display an error
        navigate('PatientSearchResults', { errorMsg: noDataError });
      } else if (errorCode === 409) {
        // if multiple patients were found in the pms, display an error
        navigate('PatientSearchResults', { errorMsg: multipleDataError });
      }
    }
  }, [
    validatePatient,
    error,
    isError,
    isSuccess,
    healthInsuranceNumber,
    multipleDataError,
    noDataError,
    isLoading,
  ]);

  const goBack = () => {
    navigation.goBack();
  };

  const onSubmit = (data: PatientForm) => {
    setHealthInsuranceNumber(data.healthInsuranceNumber);
  };

  const validateInsuranceId = (value: string) => {
    if (value.length > 0) {
      return isValidInsuranceId(value);
    } else {
      return true;
    }
  };

  return (
    <>
      {validationLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Layout withoutSidebar>
            <Header
              title={t('addPatientScreen.title')}
              onBackNavigation={goBack}
            />
            <View>
              <Text style={styles.body}>{t('addPatientScreen.body')}</Text>
              <View style={styles.inputContainer}>
                <Controller
                  control={control}
                  name="healthInsuranceNumber"
                  rules={{
                    required: true,
                    validate: { custom: validateInsuranceId },
                  }}
                  render={({ field: { value, onChange } }) => {
                    return (
                      <TextInput
                        label={t('general.insuranceId')}
                        isError={!validateInsuranceId(value)}
                        message={
                          !validateInsuranceId(value)
                            ? t('addPatientScreen.insuranceIdError')
                            : undefined
                        }
                        messageType={'error'}
                        placeholder={t(
                          'addPatientScreen.insuranceIdPlaceholder',
                        )}
                        value={value}
                        onChange={(e) => {
                          onChange(e);
                        }}
                        fullWidth
                      />
                    );
                  }}
                />
                {/* TODO: uncomment this when the private health insurance workflow is implemented */}
                {/* <Controller
                  control={control}
                  name="insuranceProvider"
                  render={({ field: { value, onChange } }) => {
                    return (
                      <Dropdown
                        label={t('addPatientScreen.insuranceProvider')}
                        placeholder={t('general.selectPlaceholder')}
                        options={[
                          { value: 1, label: 'test1' },
                          { value: 2, label: 'test2' },
                          { value: 3, label: 'test3' },
                        ]}
                        value={value}
                        onChange={(e) => onChange(e)}
                        disabled={false}
                        fullWidth
                      />
                    );
                  }}
                /> */}
              </View>
            </View>
          </Layout>
          <ButtonContainer
            cancelButtonLabel={t('buttons.cancel')}
            confirmButtonLabel={t('addPatientScreen.addPatientButton')}
            confirmDisabled={!formState.isValid}
            onCancel={goBack}
            onConfirm={handleSubmit(onSubmit)}
          />
        </>
      )}
    </>
  );
}
