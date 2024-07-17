import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Cell } from 'react-native-reanimated-table';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';

import { PatientUpdate } from '../../docpad-api/open-api';
import Colors from '../../assets/themes/mainTheme/palette';
import spacing from '../../assets/themes/mainTheme/spacing';
import globalStyles from '../../assets/themes/mainTheme/globalStyles';
import typography from '../../assets/themes/mainTheme/typography';
import { IColumn } from '../../components/table/table';
import ArrowRightIcon from '../../assets/icons/chevronRight.svg';
import { navigate } from '../../navigation/RootNavigation';
import { useGetUserProfile } from '../../helpers/hooks/useUser';
import {
  calculateAgeByBirthDate,
  calculateTotalPatientTime,
} from '../../helpers/utils';
import { getColorByScore } from './util';
import { useGetAllDoctors } from '../../docpad-api/queries/doctors';

export let headerColumnsWidthArr = [
  60, 40, 180, 45, 110, 30, 30, 80, 45, 70, 50, 100, 85, 70, 70,
];

export let recordColumnsWidthArr = [
  60, 40, 180, 45, 105, 30, 45, 62, 55, 60, 50, 90, 100, 80, 65,
];

type NotificationType = 'vitalSigns' | 'laboratory' | 'imaging' | 'medication';

const getColorByNotificationType = (notification: NotificationType) => {
  switch (notification) {
    case 'medication':
      return Colors.palette.surface.documents;
    case 'imaging':
      return Colors.palette.surface.imaging;
    case 'laboratory':
      return Colors.palette.surface.labs;
    case 'vitalSigns':
      return Colors.palette.surface.cosignature;
    default:
      return Colors.palette.surface.disabled;
  }
};

export const renderTriageArrivalStatus = (
  arrivalTime: string,
  severity: number,
) => {
  const date = new Date(arrivalTime);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const time = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  return (
    <Cell
      flex={1}
      style={{
        paddingVertical: spacing.spacing.spacing4,
      }}
      data={
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 50,
            backgroundColor: severity
              ? getColorByScore(severity)
              : 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ ...typography.typography.titleXXS }}>{time}</Text>
        </View>
      }
    />
  );
};

export const renderNotificationIndicators = (
  count: number,
  notificationType: NotificationType,
) => {
  if (count === 0) {
  }
  return (
    <Cell
      flex={1}
      style={{
        paddingVertical: spacing.spacing.spacing4,
        paddingHorizontal: spacing.spacing.spacing5,
      }}
      data={
        <View style={{ flexDirection: 'row', gap: spacing.spacing.spacing4 }}>
          <View
            key={notificationType}
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: getColorByNotificationType(notificationType),
            }}
          />
        </View>
      }
    />
  );
};

export const getDoctorIdName = (doctorId: string, allDoctors: any) => {
  const matchedDoctor = allDoctors.find((d) => d.id === doctorId);
  return matchedDoctor
    ? `${matchedDoctor.firstName[0].toUpperCase()}${matchedDoctor.lastName[0].toUpperCase()}`
    : '-';
};

// TODO: Replace any with a patient data type
export const usePatientListColumns = ({
  onUpdate,
}: {
  onUpdate?: (patientId: number, payload: PatientUpdate) => void;
}): IColumn<any>[] => {
  const { t, i18n } = useTranslation('translation', {
    keyPrefix: 'currentPatientList',
  });
  const { data: allDoctors = [] } = useGetAllDoctors();
  const { userId, department } = useGetUserProfile();

  const isInCare = department?.path.includes('in_care');
  const isOutCare = department?.path.includes('out_care');

  if (i18n.language === 'en_gb') {
    if (isInCare) {
      headerColumnsWidthArr = [
        85, 40, 155, 45, 110, 30, 30, 80, 45, 70, 55, 90, 90, 70, 70,
      ];
      recordColumnsWidthArr = [
        80, 40, 170, 35, 105, 30, 40, 62, 55, 60, 50, 90, 100, 80, 65,
      ];
    } else if (isOutCare) {
      headerColumnsWidthArr = [
        85, 30, 155, 45, 110, 30, 30, 80, 45, 70, 55, 90, 90, 70, 70,
      ];
      recordColumnsWidthArr = [
        80, 30, 170, 35, 105, 30, 40, 62, 55, 60, 50, 90, 100, 80, 65,
      ];
    }
  } else if (['de_de_x', 'de_de_m'].includes(i18n.language)) {
    headerColumnsWidthArr = [
      90, 40, 145, 55, 95, 30, 40, 60, 50, 60, 50, 100, 95, 70, 80,
    ];
    recordColumnsWidthArr = [
      85, 45, 150, 40, 102, 30, 45, 55, 50, 55, 50, 90, 100, 100, 65,
    ];
    if (isOutCare) {
      headerColumnsWidthArr = [
        90, 15, 155, 55, 95, 30, 45, 65, 50, 60, 50, 100, 95, 70, 80,
      ];
      recordColumnsWidthArr = [
        90, 15, 160, 40, 102, 30, 45, 65, 50, 55, 50, 90, 100, 100, 65,
      ];
    }
  }

  const firstColumn = isInCare
    ? {
        title: t('table.arrivalTimeDate'),
        dataIndex: 'arrivalTime',
        key: 'arrivalTime',
        sorter: true,
        render: ({ value, raw }) => {
          return renderTriageArrivalStatus(value, raw.severity);
        },
      }
    : isOutCare
    ? {
        title: t('table.severityScheduledTime'),
        dataIndex: 'arrivalTime',
        key: 'arrivalTime',
        sorter: true,
        render: ({ value, raw }) => {
          return renderTriageArrivalStatus(value, raw.severity);
        },
      }
    : {
        title: t('table.arrival'),
        dataIndex: 'arrivalTime',
        key: 'arrivalTime',
        sorter: true,
        render: ({ value, raw }) => {
          return renderTriageArrivalStatus(value, raw.severity);
        },
      };

  const secondColumn = isOutCare
    ? {
        title: '',
        dataIndex: '',
        key: '',
      }
    : {
        title: t('table.rm'),
        dataIndex: 'room',
        key: 'room',
        sorter: true,
      };

  return [
    firstColumn,
    secondColumn,
    {
      title: t('table.nameGender'),
      dataIndex: '',
      key: '',
      sorter: true,
      render: ({ raw }) => {
        return <Text>{`${raw.firstName}, ${raw.sex}`}</Text>;
      },
    },
    {
      title: t('table.age'),
      dataIndex: 'birthdate',
      key: 'birthdate',
      sorter: true,
      render: ({ value }) => {
        return <Text>{calculateAgeByBirthDate(value)}</Text>;
      },
    },
    {
      title: t('table.triggerForVisit'),
      dataIndex: 'triggerForVisit',
      key: 'triggerForVisit',
      sorter: true,
    },
    {
      title: t('table.d1'),
      dataIndex: 'd1',
      key: 'd1',
      sorter: true,
      render: ({ value }) => {
        return <Text>{getDoctorIdName(value, allDoctors)}</Text>;
      },
    },
    {
      title: t('table.d2'),
      dataIndex: 'd2',
      key: 'd2',
      sorter: true,
      render: ({ value }) => {
        return <Text>{getDoctorIdName(value, allDoctors)}</Text>;
      },
    },
    {
      title: t('table.vitalSigns'),
      dataIndex: 'vitalSigns',
      key: 'vitalSigns',
      sorter: true,
      render: ({ value }) => {
        return renderNotificationIndicators(value, 'vitalSigns');
      },
    },
    {
      title: t('table.lab'),
      dataIndex: 'laboratory',
      key: 'laboratory',
      sorter: true,
      render: ({ value }) => {
        return renderNotificationIndicators(value, 'laboratory');
      },
    },
    {
      title: t('table.imaging'),
      dataIndex: 'imaging',
      key: 'imaging',
      sorter: true,
      render: ({ value }) => {
        return renderNotificationIndicators(value, 'imaging');
      },
    },
    {
      title: t('table.meds'),
      dataIndex: 'medication',
      key: 'medication',
      sorter: true,
      render: ({ value }) => {
        return renderNotificationIndicators(value, 'medication');
      },
    },
    {
      title: t('table.dispo'),
      dataIndex: 'release',
      key: 'release',
      sorter: true,
    },
    {
      title: t('table.totalTime'),
      dataIndex: 'arrivalTime',
      key: 'arrivalTime',
      sorter: true,
      render: ({ value }) => {
        return (
          <Cell
            flex={1}
            data={
              <Text
                style={{
                  ...typography.typography.bodyM,
                  backgroundColor: Colors.palette.surface.secondary,
                  borderRadius: spacing.spacing.spacing2,
                  padding: spacing.spacing.spacing2,
                  textAlign: 'center',
                }}
              >
                {calculateTotalPatientTime(value)}
              </Text>
            }
          />
        );
      },
    },
    {
      title: t('table.assigning'),
      dataIndex: 'details',
      key: 'details',
      sorter: true,
      render: ({ raw }) => {
        return (
          <Cell
            flex={1}
            data={
              <TouchableOpacity
                disabled={raw.d1 === userId}
                onPress={() => {
                  if (onUpdate) {
                    onUpdate(raw.patientId, {
                      mainDoctorId: userId,
                    });
                  }
                }}
              >
                <Text
                  style={{
                    ...typography.typography.titleXS,
                    color: Colors.palette.surface.brandPrimary,
                    paddingStart: spacing.spacing.spacing4,
                  }}
                >
                  {t('patientTableActions.assignMe')}
                </Text>
              </TouchableOpacity>
            }
          />
        );
      },
    },
    {
      title: '',
      dataIndex: '',
      key: 'patientId',
      sorter: false,
      render: ({ raw }) => {
        return (
          <Cell
            flex={1}
            data={
              <Menu renderer={renderers.NotAnimatedContextMenu}>
                <MenuTrigger
                  customStyles={{
                    TriggerTouchableComponent: TouchableOpacity,
                    triggerTouchable: { activeOpacity: 1 },
                  }}
                >
                  <View
                    style={{
                      height: spacing.spacing.spacing10,
                      width: spacing.spacing.spacing10,
                      backgroundColor: Colors.palette.button.secondaryDefault,
                      borderRadius: spacing.spacing.spacing11,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <ArrowRightIcon
                      style={{
                        color: Colors.palette.icon.brandPrimary,
                      }}
                    />
                  </View>
                </MenuTrigger>
                <MenuOptions
                  optionsContainerStyle={{
                    ...globalStyles.globalStyles.elevation,
                    borderRadius: spacing.spacing.spacing4,
                    borderWidth: 1,
                    borderColor: Colors.palette.border.grayInputDefault,
                    width: 500,
                    marginLeft: -40,
                    marginTop: 44,
                  }}
                >
                  <MenuOption
                    onSelect={() => {
                      navigate('PatientDashboard', {
                        patientId: raw.patientId,
                      });
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: spacing.spacing.spacing4,
                      }}
                    >
                      <Text
                        style={{
                          ...typography.typography.titleXS,
                          color: Colors.palette.text.brandPrimary,
                        }}
                      >
                        {t('patientTableActions.gotoPatientDashboard')}
                      </Text>
                      <ArrowRightIcon
                        style={{
                          color: Colors.palette.icon.brandPrimary,
                        }}
                      />
                    </View>
                  </MenuOption>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: Colors.palette.border.grayInputDefault,
                    }}
                  />
                  <MenuOption
                    onSelect={() => {
                      // TODO: Go to episode dashboard using the value lastEpisode.id
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: spacing.spacing.spacing4,
                      }}
                    >
                      <Text
                        style={{
                          ...typography.typography.titleXS,
                          color: Colors.palette.text.brandPrimary,
                        }}
                      >
                        {t('patientTableActions.gotoEpisodeDashboard')}
                      </Text>
                      <ArrowRightIcon
                        style={{
                          color: Colors.palette.icon.brandPrimary,
                        }}
                      />
                    </View>
                  </MenuOption>
                </MenuOptions>
              </Menu>
            }
          />
        );
      },
    },
  ];
};

export const filterOptions = ({
  t,
}: {
  t: TFunction<'translation', 'currentPatientList.filterOptions'>;
}) => [
  {
    label: t('patientsAssignedToMe'),
    value: 'patientsAssignedToMe',
  },
  {
    label: t('patientsNotAssignedToAnyone'),
    value: 'patientsNotAssignedToAnyone',
  },
];
