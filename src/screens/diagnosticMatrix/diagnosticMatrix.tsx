import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity } from 'react-native';
import { makeStyles } from '../../helpers/hooks/useTheme';
import Layout from '../../components/layout/layout';
import { ITheme } from '../../assets/themes/mainTheme';
import InfoIcon from '../../assets/icons/info.svg';
import DiagnosticMatrixContainer from './diagnosticMatrixContainer';
import palette from '../../assets/themes/mainTheme/palette';
import DiagnosticDescriptionDialog from '../../components/diagnosticMatrix/diagnosticDescriptionDialog';
import { useState } from 'react';

const useStyles = makeStyles((theme: ITheme) => ({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.spacing5,
  },
  headerText: {
    ...theme.typography.titleL,
  },
  brandPrimaryColor: {
    color: theme.palette.icon.brandPrimary,
  },
  tableContainer: {
    backgroundColor: palette.palette.surface.primary,
    borderRadius: theme.spacing.spacing6,
    height: '103%',
  },
}));

const DiagnosticMatrix = () => {
  const styles = useStyles();
  const { t } = useTranslation('translation', {
    keyPrefix: 'diagnosticMatrix',
  });

  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <Layout>
      <View style={styles.header}>
        <Text style={styles.headerText}>{t('title')}</Text>
        <TouchableOpacity onPress={openModal}>
          <InfoIcon style={styles.brandPrimaryColor} />
        </TouchableOpacity>

        <DiagnosticDescriptionDialog
          isOpen={isModalVisible}
          onClose={closeModal}
        />
      </View>
      <View style={styles.tableContainer}>
        <DiagnosticMatrixContainer />
      </View>
    </Layout>
  );
};

export default DiagnosticMatrix;
