import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import { ITheme } from '../../assets/themes/mainTheme';
import { makeStyles } from '../../helpers/hooks/useTheme';
import IconButton from '../../components/button/iconButton';
import { Button } from '../../components/button';
import ChevronLeftIcon from '../../assets/icons/chevronLeft.svg';
import PlusIcon from '../../assets/icons/plus.svg';
import PenIcon from '../../assets/icons/pen.svg';
import LabsIcon from '../../assets/icons/labs.svg';
import PillIcon from '../../assets/icons/pill.svg';
import DocumentsIcon from '../../assets/icons/documents.svg';
import DiagnoseIcon from '../../assets/icons/diagnose.svg';
import NewPillIcon from '../../assets/icons/newPill.svg';
import NewDiagnoseIcon from '../../assets/icons/newDiagnose.svg';
import NewLabsIcon from '../../assets/icons/newLabs.svg';
import NewDocumentsIcon from '../../assets/icons/newDocuments.svg';
import { navigate } from '../../navigation/RootNavigation.tsx';

const useStyles = makeStyles((theme: ITheme) => ({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.palette.surface.primary,
    borderBottomWidth: 1,
    borderColor: theme.palette.border.brandSecondary,
    width: '100%',
    paddingBottom: theme.spacing.spacing6,
    paddingHorizontal: theme.spacing.spacing7,
  },
  title: {
    ...theme.typography.titleM,
    textAlign: 'center',
    marginLeft: 214,
  },
  navigationWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconColor: {
    color: theme.palette.icon.brandPrimary,
  },
  navigationText: {
    ...theme.typography.titleXS,
    color: theme.palette.text.brandPrimary,
    marginLeft: theme.spacing.spacing2,
  },
  newEpisodeButton: {
    marginLeft: 'auto',
  },
  headerButtonIcon: {
    color: theme.palette.icon.invert,
  },
  headerButtonText: {
    ...theme.typography.titleXS,
    color: theme.palette.text.invert,
    marginLeft: theme.spacing.spacing2,
  },
  infoWrapper: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: theme.palette.surface.appBackground,
    paddingVertical: theme.spacing.spacing4,
    paddingHorizontal: theme.spacing.spacing7,
  },
  infoBox: {
    ...theme.globalStyles.elevation2,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.palette.surface.primary,
    borderRadius: theme.spacing.spacing4,
    padding: theme.spacing.spacing4,
    gap: theme.spacing.spacing2,
  },
  patientInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  name: {
    ...theme.typography.titleS,
  },
  age: {
    ...theme.typography.bodyM,
  },
  buttonsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  boxMargin: {
    marginRight: theme.spacing.spacing4,
    gap: theme.spacing.spacing4,
  },
  buttonText: {
    ...theme.typography.titleXS,
    color: theme.palette.text.brandPrimary,
  },
  disabledButton: {
    backgroundColor: theme.palette.surface.disabled,
  },
  disabledText: {
    color: theme.palette.text.disabled,
  },
  disabledIcon: {
    color: theme.palette.icon.disabled,
  },
}));

interface IPatientDashboardHeader {
  patient: any;
  onNewEpisode: () => void;
  onEditPatient: () => void;
  onDiagnosePress: () => void;
  onMedicationPress: () => void;
  onLabValuesPress: () => void;
  onDocumentsPress: () => void;
  areButtonsDisabled?: boolean;
}

export default function PatientDashboardHeader({
  patient,
  onNewEpisode,
  onEditPatient,
  onDiagnosePress,
  onMedicationPress,
  onLabValuesPress,
  onDocumentsPress,
  areButtonsDisabled,
}: IPatientDashboardHeader) {
  const { t } = useTranslation();
  const styles = useStyles();

  const goBack = () => {
    navigate('DoctorDashboard', undefined);
  };

  return (
    <View>
      <View style={styles.header}>
        <View style={styles.navigationWrapper}>
          <IconButton onPress={goBack}>
            <ChevronLeftIcon style={styles.iconColor} />
          </IconButton>
          <Text style={styles.navigationText}>
            {t('patientDashboard.header.myTasks')}
          </Text>
        </View>
        <Text style={[styles.title]}>
          {t('patientDashboard.header.patientDashboard')}
        </Text>
        <Button
          style={styles.newEpisodeButton}
          backgroundStyle={'primary'}
          onPress={onNewEpisode}
        >
          <PlusIcon style={styles.headerButtonIcon} />
          <Text style={styles.headerButtonText}>
            {t('patientDashboard.header.newEpisode')}
          </Text>
        </Button>
      </View>
      <View style={styles.infoWrapper}>
        <View style={styles.infoBox}>
          <TouchableOpacity onPress={onEditPatient}>
            <PenIcon style={styles.iconColor} />
          </TouchableOpacity>
          <View style={styles.patientInfo}>
            <Text
              style={styles.name}
            >{`${patient?.lastName}, ${patient?.firstName}`}</Text>
            <Text style={styles.age}>{`${patient?.sex}, ${patient?.age}`}</Text>
          </View>
        </View>

        <View style={styles.buttonsWrapper}>
          <TouchableOpacity
            disabled={areButtonsDisabled}
            style={[
              styles.infoBox,
              styles.boxMargin,
              areButtonsDisabled && styles.disabledButton,
            ]}
            onPress={onDiagnosePress}
          >
            {patient?.newDiagnose && !areButtonsDisabled ? (
              <NewDiagnoseIcon />
            ) : (
              <DiagnoseIcon
                style={
                  areButtonsDisabled ? styles.disabledIcon : styles.iconColor
                }
              />
            )}
            <Text
              style={[
                styles.buttonText,
                areButtonsDisabled && styles.disabledText,
              ]}
            >
              {t('patientDashboard.header.activeDiagnoses')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={areButtonsDisabled}
            style={[
              styles.infoBox,
              styles.boxMargin,
              areButtonsDisabled && styles.disabledButton,
            ]}
            onPress={onMedicationPress}
          >
            {patient?.newMedicationPlan && !areButtonsDisabled ? (
              <NewPillIcon />
            ) : (
              <PillIcon
                style={
                  areButtonsDisabled ? styles.disabledIcon : styles.iconColor
                }
              />
            )}
            <Text
              style={[
                styles.buttonText,
                areButtonsDisabled && styles.disabledText,
              ]}
            >
              {t('patientDashboard.header.medicationPlan')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={areButtonsDisabled}
            style={[
              styles.infoBox,
              styles.boxMargin,
              areButtonsDisabled && styles.disabledButton,
            ]}
            onPress={onLabValuesPress}
          >
            {patient?.newLabValues && !areButtonsDisabled ? (
              <NewLabsIcon />
            ) : (
              <LabsIcon
                style={
                  areButtonsDisabled ? styles.disabledIcon : styles.iconColor
                }
              />
            )}
            <Text
              style={[
                styles.buttonText,
                areButtonsDisabled && styles.disabledText,
              ]}
            >
              {t('patientDashboard.header.labValues')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={areButtonsDisabled}
            style={[
              styles.infoBox,
              areButtonsDisabled && styles.disabledButton,
            ]}
            onPress={onDocumentsPress}
          >
            {patient?.newDocuments && !areButtonsDisabled ? (
              <NewDocumentsIcon style={styles.iconColor} />
            ) : (
              <DocumentsIcon
                style={
                  areButtonsDisabled ? styles.disabledIcon : styles.iconColor
                }
              />
            )}
            <Text
              style={[
                styles.buttonText,
                areButtonsDisabled && styles.disabledText,
              ]}
            >
              {t('patientDashboard.header.documents')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
