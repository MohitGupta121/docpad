import { Text, TouchableOpacity, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { find } from 'lodash';

import Layout from '../../components/layout/layout';
import IconButton from '../../components/button/iconButton';
import { navigate } from '../../navigation/RootNavigation';
import ChevronLeftIcon from '../../assets/icons/chevronLeft.svg';
import { useTranslation } from 'react-i18next';
import { useCallback, useMemo, useState } from 'react';
import TextInput from '../../components/textInputs/textInput';
import Button from '../../components/button/button';
import SaveIcon from '../../assets/icons/save.svg';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'src/navigation';
import ChevronDownIcon from '../../assets/icons/chevronDown.svg';
import Colors from '../../assets/themes/mainTheme/palette';
import Menu from '../../components/menu';
import {
  useGetAllDepartments,
  useUpdateDoctorDepartment,
} from '../../docpad-api/queries/departments';
import { DoctorsSelectedDepartment } from '../../docpad-api/open-api';
import { useGetUserProfile } from '../../helpers/hooks/useUser';
import { getDepartmentNameFromPath } from '../../helpers/department';
import { useStyles } from './styles';
import { useQueryClient } from '@tanstack/react-query';

type IDepartmentSelectScreen = NativeStackScreenProps<
  RootStackParamList,
  'DepartmentSelect'
>;

type DepartmentForm = {
  department?: DoctorsSelectedDepartment;
  textInputData?: string;
};

export default function DepartmentSelectScreen({
  route,
}: IDepartmentSelectScreen) {
  const styles = useStyles();
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { userId } = useGetUserProfile();
  const { data: departments } = useGetAllDepartments(userId || '');
  const updateDepartment = useUpdateDoctorDepartment(userId || '');
  const [activeTab, setActiveTab] = useState('myDepartments');
  const { control, formState, handleSubmit, setValue } =
    useForm<DepartmentForm>();

  const handleTabChange = useCallback(
    (selected: string) => {
      if (selected === activeTab) {
        return;
      }

      setValue('department', undefined);
      setValue('textInputData', undefined);
      setActiveTab(selected);
    },
    [activeTab, setValue],
  );

  const myDepartmentsOptions = useMemo(() => {
    return departments?.doctorAssignedDepartments.map((department) => {
      return {
        label: getDepartmentNameFromPath(department.path),
        value: department.id,
      };
    });
  }, [departments?.doctorAssignedDepartments]);

  const allDepartmentsOptions = useMemo(() => {
    return departments?.institutionDepartments.map((department) => {
      return {
        label: getDepartmentNameFromPath(department.path),
        value: department.id,
      };
    });
  }, [departments?.institutionDepartments]);

  const onSubmitDepartment = (data: DepartmentForm) => {
    if (data.department?.id) {
      updateDepartment.mutate(
        {
          departmentId: data.department?.id,
          reason: data.textInputData,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user', userId] });
            navigate('DoctorDashboard', undefined);
          },
        },
      );
    }
  };

  return (
    <>
      <Layout withoutSidebar>
        <View style={styles.header}>
          {!route.params.isAfterLogin && (
            <IconButton onPress={() => navigate('DoctorDashboard', undefined)}>
              <ChevronLeftIcon />
            </IconButton>
          )}
          <Text
            style={[
              styles.title,
              route.params.isAfterLogin && styles.titleMiddle,
            ]}
          >
            {route.params.isAfterLogin
              ? t('departmentChange.departmentSelection')
              : t('departmentChange.departmentChange')}
          </Text>
          <View style={styles.placeholder} />
          <View style={styles.line} />
        </View>

        <Text style={styles.infoText}>{t('departmentChange.infoText')}</Text>

        <View style={styles.selectContentWrapper}>
          <View style={styles.tabWrapper}>
            <TouchableOpacity
              onPress={() => handleTabChange('myDepartments')}
              disabled={activeTab === 'myDepartments'}
              style={[
                styles.tabButton,
                activeTab === 'myDepartments' && styles.activeTabButton,
              ]}
            >
              <Text
                style={[
                  styles.buttonText,
                  activeTab === 'myDepartments' && styles.activeButtonText,
                ]}
              >
                {t('departmentChange.myDepartments')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleTabChange('allDepartments')}
              disabled={activeTab === 'allDepartments'}
              style={[
                styles.tabButton,
                activeTab === 'allDepartments' && styles.activeTabButton,
              ]}
            >
              <Text
                style={[
                  styles.buttonText,
                  activeTab === 'allDepartments' && styles.activeButtonText,
                ]}
              >
                {t('departmentChange.allDepartments')}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dropdownWrapper}>
            <View style={styles.dropdown}>
              <Controller
                control={control}
                name="department"
                defaultValue={undefined}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => {
                  const departmentOptions =
                    (activeTab === 'myDepartments'
                      ? myDepartmentsOptions
                      : allDepartmentsOptions) || [];
                  return (
                    <Menu
                      options={departmentOptions}
                      selected={value?.id ? [value?.id] : undefined}
                      onChange={(v) => {
                        const selected =
                          activeTab === 'myDepartments'
                            ? find(departments?.doctorAssignedDepartments, {
                                id: v[0],
                              })
                            : find(departments?.institutionDepartments, {
                                id: v[0],
                              });
                        onChange(selected);
                      }}
                      allowSearch={true}
                      optionsCustomWidth={{ width: 1108, marginTop: 80 }}
                      searchProps={{
                        placeholder: t('departmentChange.search'),
                        isSearchFullWidth: true,
                      }}
                    >
                      <View>
                        <Text style={styles.dropdownLabel}>
                          {t('departmentChange.department')}
                        </Text>
                        <View style={styles.menuContent}>
                          <Text
                            style={
                              value
                                ? styles.selectedText
                                : styles.placeholderText
                            }
                          >
                            {value
                              ? getDepartmentNameFromPath(value.path)
                              : t('general.selectPlaceholder')}
                          </Text>
                          <ChevronDownIcon
                            style={styles.menuIcon}
                            color={Colors.palette.icon.primary}
                          />
                        </View>
                      </View>
                    </Menu>
                  );
                }}
              />
              {activeTab === 'allDepartments' && (
                <Controller
                  control={control}
                  name="textInputData"
                  rules={{
                    required: true,
                  }}
                  render={({ field: { value, onChange } }) => {
                    return (
                      <>
                        <TextInput
                          onChange={onChange}
                          label={t('departmentChange.switchExplanation')}
                          placeholder={t('general.addExplanation')}
                          fullWidth
                          isExtended
                          maxLength={200}
                          value={value}
                        />
                        {!!value && (
                          <Text
                            style={styles.textInputCounter}
                          >{`${value?.length}/200`}</Text>
                        )}
                      </>
                    );
                  }}
                />
              )}
            </View>
          </View>
        </View>
      </Layout>
      <View style={styles.buttonContainer}>
        {!route.params.isAfterLogin && (
          <Button
            backgroundStyle="tertiary"
            onPress={() => navigate('DoctorDashboard', undefined)}
          >
            {t('buttons.cancel')}
          </Button>
        )}
        <Button
          backgroundStyle="primary"
          onPress={handleSubmit(onSubmitDepartment)}
          disabled={!formState.isValid}
        >
          <SaveIcon
            style={[styles.saveIcon, !formState.isValid && styles.disabledIcon]}
          />
          <Text style={styles.saveButtonText}>{t('buttons.save')}</Text>
        </Button>
      </View>
    </>
  );
}
