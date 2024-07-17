import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useUpdateUser, useUserById } from '../../docpad-api/queries/user';

import { UserRepresentation } from '../../docpad-api/open-api';
import { useGetSelectedDepartment } from '../../docpad-api/queries/departments';
import { DE_X } from '../../constants/languageOptions';
import { useAuth } from '../../contextProviders/authContext';
import decodeJwt from '../decodeJwt';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthKeys } from '../constants';

export const useGetUserProfile = () => {
  const { authToken } = useAuth();
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();
  const [userId, setUserId] = useState<string | undefined>();
  const [selectedLanguage, setSelectedLanguage] = useState(
    i18n.language || DE_X,
  );
  const { data: profile } = useUserById(userId);
  const updateUser = useUpdateUser(userId || '');
  const { data: department } = useGetSelectedDepartment(profile?.id || '');

  const handleUpdateUser = (payload: UserRepresentation) => {
    updateUser.mutate(payload, {
      onSuccess: () => {
        if (
          payload?.attributes?.language_selection &&
          payload?.attributes?.language_selection?.[0]
        ) {
          setSelectedLanguage(payload?.attributes?.language_selection?.[0]);
        }
        queryClient.invalidateQueries({ queryKey: ['user', userId] });
      },
    });
  };

  useEffect(() => {
    console.log('toke: ', authToken);
    if (authToken) {
      const sub = decodeJwt(authToken);
      console.log('Sub:', sub);
      AsyncStorage.setItem(AuthKeys.USER_ID, sub);
      setUserId(sub);
    }
  }, [authToken]);

  useEffect(() => {
    i18n.changeLanguage(selectedLanguage);
  }, [selectedLanguage, i18n]);

  return {
    profile,
    userId,
    selectedLanguage: profile?.attributes?.language_selection?.[0] ?? 'de_de_x',
    department,
    onUpdateUser: handleUpdateUser,
  };
};
