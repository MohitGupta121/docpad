import { View } from 'react-native';
import { Cell } from 'react-native-reanimated-table';

import Colors from '../../assets/themes/mainTheme/palette';
import spacing from '../../assets/themes/mainTheme/spacing';
import ChevronDownIcon from '../../assets/icons/chevronDown.svg';
import { IColumn } from '../../components/table/table';
import Chip from '../../components/chip';

type NotificationType =
  | 'newDocuments'
  | 'newImagingResults'
  | 'newLabResults'
  | 'signatureRequired';

const getColorByNotificationType = (notification: NotificationType) => {
  switch (notification) {
    case 'newDocuments':
      return Colors.palette.surface.documents;
    case 'newImagingResults':
      return Colors.palette.surface.imaging;
    case 'newLabResults':
      return Colors.palette.surface.labs;
    case 'signatureRequired':
      return Colors.palette.surface.cosignature;
    default:
      return Colors.palette.surface.disabled;
  }
};

export const renderNotificationIndicators = (notifications: {
  [key in NotificationType]: number;
}) => {
  const notificationKeys = (
    Object.keys(notifications) as NotificationType[]
  ).filter((key) => !!notifications[key]);
  if (!notificationKeys.length) {
    return (
      <Cell
        flex={1}
        style={{
          justifyContent: 'flex-start',
          flexDirection: 'row',
          gap: spacing.spacing.spacing4,
          paddingVertical: spacing.spacing.spacing4,
          paddingHorizontal: spacing.spacing.spacing2,
        }}
        data={<Chip>No update</Chip>}
      />
    );
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
          {notificationKeys.map((notification) => {
            return (
              <View
                key={notification}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: getColorByNotificationType(notification),
                }}
              />
            );
          })}
        </View>
      }
    />
  );
};

// TODO: Replace any with a patient data type
export const PatientListColumns: IColumn<any>[] = [
  {
    title: 'Last Name',
    dataIndex: 'lastName',
    key: 'lastName',
    sorter: true,
  },
  {
    title: 'First Name',
    dataIndex: 'firstName',
    key: 'firstName',
    sorter: true,
  },
  {
    title: 'Date of Birth',
    dataIndex: 'birthdate',
    key: 'birthdate',
    sorter: true,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    sorter: true,
  },
  {
    title: 'Last Visit Date',
    dataIndex: 'lastVisit',
    key: 'lastVisit',
    sorter: true,
  },
  {
    title: 'Notifications',
    dataIndex: 'notificationsCount',
    key: 'notificationsCount',
    sorter: false,
    render: ({ value }) => {
      return renderNotificationIndicators(value);
    },
  },
  {
    title: 'More Details',
    dataIndex: 'details',
    key: 'details',
    sorter: false,
    render: () => {
      return (
        <Cell
          flex={1}
          style={{ paddingHorizontal: 36 }}
          data={<ChevronDownIcon color={Colors.palette.icon.disabled} />}
        />
      );
    },
  },
];

export const PatientListData = [
  {
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '01-01-1990',
    age: 31,
    lastVisitDate: '01-01-2021',
    notifications: ['imaging', 'documents', 'cosignature'],
  },
  {
    firstName: 'Jane',
    lastName: 'Doe',
    dateOfBirth: '02-01-1990',
    age: 30,
    lastVisitDate: '01-01-2021',
    notifications: ['labs', 'cosignatures'],
  },
  {
    firstName: 'Alice',
    lastName: 'Doe',
    dateOfBirth: '03-01-1990',
    age: 29,
    lastVisitDate: '01-01-2021',
    notifications: [],
  },
];

export const sortOptions = [
  { label: 'In default order', value: '' },
  { label: 'New Lab Results first', value: 'newLabResults' },
  { label: 'New Documents & Episodes first', value: 'newDocuments' },
  { label: 'New Co-signature Requests first', value: 'signatureRequired' },
];

export const filterOptions = [
  { label: 'New Lab Results', value: 'newLabResults' },
  { label: 'New Imaging Results', value: 'newImagingResults' },
  { label: 'New Documents & Episodes', value: 'newDocuments' },
  { label: 'New Co-signature Requests', value: 'signatureRequired' },
];
