import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';
import Modal from 'react-native-modal';

import ArrowRightIcon from '../../assets/icons/chevronRight.svg';
import SignOutIcon from '../../assets/icons/signOut.svg';
import BellIcon from '../../assets/icons/bell.svg';
import SettingsIcon from '../../assets/icons/settings.svg';
import PersonsIcon from '../../assets/icons/persons.svg';
import MatrixIcon from '../../assets/icons/matrix.svg';
import { Button } from '../button';
import { navigate, useCurrentRoute } from '../../navigation/RootNavigation';
import { useGetSelectedDepartment } from '../../docpad-api/queries/departments';
import { useGetUserProfile } from '../../helpers/hooks/useUser';
import { getDepartmentNameFromPath } from '../../helpers/department';
import { useStyles } from './styles';
import CloseIcon from '../../assets/icons/close.svg';
import { onLogout } from '../../helpers/login/login';

const Sidebar = () => {
  const styles = useStyles();
  const route = useCurrentRoute();
  const { t } = useTranslation('translation', { keyPrefix: 'sidebar' });
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { profile, userId } = useGetUserProfile();
  const { data: selectedDepartment } = useGetSelectedDepartment(userId || '');

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: isSideBarOpen
        ? withTiming(258, { duration: 500 })
        : withTiming(64, { duration: 500 }),
    };
  });

  const handleLogout = async () => {
    await onLogout();
    setIsLogoutModalOpen(false);
    navigate('LanguageSelection', { isAfterLogout: true });
  };

  return (
    <Animated.View style={[styles.root, animatedStyle]}>
      <View style={styles.headerWrapper}>
        <TouchableOpacity
          onPress={() => setIsSideBarOpen((prev) => !prev)}
          style={styles.buttonWrapper}
        >
          <ArrowRightIcon
            style={[
              styles.brandPrimaryColor,
              isSideBarOpen && styles.rotatedArrow,
            ]}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => navigate('DoctorDashboard', undefined)}
        style={styles.option}
        disabled={route?.name === 'DoctorDashboard'}
      >
        <BellIcon
          style={
            route?.name === 'DoctorDashboard'
              ? styles.brandPrimaryColor
              : styles.notActiveOption
          }
        />
        {isSideBarOpen && (
          <Text
            style={[
              styles.optionText,
              route?.name === 'DoctorDashboard' && styles.brandPrimaryColor,
            ]}
          >
            {t('doctorDashboard')}
          </Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigate('SettingScreen', undefined)}
        style={styles.option}
        disabled={route?.name === 'SettingScreen'}
      >
        <SettingsIcon
          style={
            route?.name === 'SettingScreen'
              ? styles.brandPrimaryColor
              : styles.notActiveOption
          }
        />
        {isSideBarOpen && (
          <Text
            style={[
              styles.optionText,
              route?.name === 'SettingScreen' && styles.brandPrimaryColor,
            ]}
          >
            {t('settings')}
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigate('CurrentPatientList', undefined)}
        style={styles.option}
        disabled={route?.name === 'CurrentPatientList'}
      >
        <PersonsIcon
          style={
            route?.name === 'CurrentPatientList'
              ? styles.brandPrimaryColor
              : styles.notActiveOption
          }
        />
        {isSideBarOpen && (
          <Text
            style={[
              styles.optionText,
              route?.name === 'CurrentPatientList' && styles.brandPrimaryColor,
            ]}
          >
            {t('currentPatientList')}
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigate('DiagnosticMatrix', undefined)}
        style={styles.option}
        disabled={route?.name === 'DiagnosticMatrix'}
      >
        <MatrixIcon
          style={
            route?.name === 'DiagnosticMatrix'
              ? styles.brandPrimaryColor
              : styles.notActiveOption
          }
        />
        {isSideBarOpen && (
          <Text
            style={[
              styles.optionText,
              route?.name === 'DiagnosticMatrix' && styles.brandPrimaryColor,
            ]}
          >
            {t('diagnosticMatrix')}
          </Text>
        )}
      </TouchableOpacity>

      {isSideBarOpen ? (
        <View style={styles.doctorDataWrapper}>
          <View style={styles.doctorInitials}>
            <Text
              style={styles.doctorInitialsText}
            >{`${profile?.firstName?.substring(
              0,
              1,
            )}${profile?.lastName?.substring(0, 1)}`}</Text>
          </View>
          <View style={styles.doctorInfoWrapper}>
            <Text style={styles.doctorInfoHeader}>
              {`${profile?.firstName} ${profile?.lastName}`}
            </Text>
            <Text
              style={styles.doctorAdditionalInfo}
            >{`${profile?.firstName}`}</Text>
            <Text
              style={styles.doctorAdditionalInfo}
            >{`${getDepartmentNameFromPath(selectedDepartment?.path)}`}</Text>
            <TouchableOpacity
              style={styles.changeDepartmentButtonWrapper}
              onPress={() =>
                navigate('DepartmentSelect', { isAfterLogin: false })
              }
            >
              <Text style={styles.buttonText}>{t('changeDepartment')}</Text>
              <ArrowRightIcon style={styles.brandPrimaryColor} />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.doctorInitials}>
          <Text
            style={styles.doctorInitialsText}
          >{`${profile?.firstName?.substring(
            0,
            1,
          )}${profile?.lastName?.substring(0, 1)}`}</Text>
        </View>
      )}

      <View style={styles.spacer} />
      {/*FOR TESTING*/}
      <Button onPress={() => navigate('StoryBook', undefined)}>
        <Text>SB</Text>
      </Button>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => setIsLogoutModalOpen(true)}
      >
        <SignOutIcon style={styles.iconPrimaryColor} />
      </TouchableOpacity>
      <Modal
        isVisible={isLogoutModalOpen}
        style={styles.modal}
        backdropOpacity={0.5}
        onBackdropPress={() => setIsLogoutModalOpen(false)}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
      >
        <View style={styles.modalHeader}>
          <Text style={styles.modalHeaderText}>{t('logoutHeader')}</Text>
          <TouchableOpacity
            style={styles.modalCloseIcon}
            onPress={() => setIsLogoutModalOpen(false)}
          >
            <CloseIcon width={32} height={32} style={styles.iconPrimaryColor} />
          </TouchableOpacity>
        </View>
        <Text style={styles.modalInfoText}>{t('logoutInfo')}</Text>
        <View style={styles.modalButtonWrapper}>
          <Button onPress={handleLogout}>
            <SignOutIcon style={styles.modalButtonIcon} />
            <Text style={[styles.modalButtonText, styles.textInvert]}>
              {t('logout')}
            </Text>
          </Button>
          <Button
            style={styles.cancelButton}
            backgroundStyle={'tertiary'}
            onPress={() => setIsLogoutModalOpen(false)}
          >
            <Text style={[styles.modalButtonText, styles.textPrimary]}>
              {t('cancel')}
            </Text>
          </Button>
        </View>
      </Modal>
    </Animated.View>
  );
};

export default Sidebar;
