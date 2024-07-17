import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from '@tanstack/react-query';
import { useKeycloak } from '@react-keycloak/native';

import { makeStyles } from '../helpers/hooks/useTheme';
import { navigate, useCurrentRoute } from '../navigation/RootNavigation';
import { useGetUserProfile } from '../helpers/hooks/useUser';
import { useUserById, useUpdateUser } from '../docpad-api/queries/user';

const useStyles = makeStyles(() => ({
  root: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default function SplashScreen() {
  const styles = useStyles();
  const route = useCurrentRoute();
  const { initialized } = useKeycloak();
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();
  const { profile, userId } = useGetUserProfile();
  const { data: userData, refetch: refetchUser } = useUserById(userId || '');
  const { mutate } = useUpdateUser(userId);

  useEffect(() => {
    if (profile && userData) {
      if (initialized && userData) {
        mutate(
          {
            ...userData,
            attributes: {
              ...userData.attributes,
              language_selection: [i18n.language ?? 'de_de_x'],
            },
          },
          {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ['user', userId] });
            },
          },
        );
      }
    }
  }, [
    i18n.language,
    initialized,
    profile,
    refetchUser,
    mutate,
    userData,
    queryClient,
    userId,
  ]);

  useEffect(() => {
    if (route?.name === 'SplashScreen' && profile) {
      if (!profile?.attributes?.selected_department?.[0]) {
        navigate('DepartmentSelect', { isAfterLogin: true });
      } else {
        navigate('DoctorDashboard', undefined);
      }
    }
  }, [route?.name, profile, profile?.attributes?.selected_department]);

  return (
    <View style={styles.root}>
      <Text>LOADING</Text>
    </View>
  );
}
