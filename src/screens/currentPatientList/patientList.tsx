import { useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import { EmergencyRecord, PatientUpdate } from 'src/docpad-api/open-api';
import SearchInput from '../../components/textInputs/searchInput';
import Table from '../../components/table/table';
import { ITheme } from '../../assets/themes/mainTheme';
import ChevronDownIcon from '../../assets/icons/chevronDown.svg';
import Colors from '../../assets/themes/mainTheme/palette';
import { makeStyles } from '../../helpers/hooks/useTheme';
import { usePatientListColumns, filterOptions } from './constants';
import Menu from '../../components/menu';
import { headerColumnsWidthArr, recordColumnsWidthArr } from './constants';
import { useGetUserProfile } from '../../helpers/hooks/useUser';

const useStyles = makeStyles((theme: ITheme) => ({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.spacing6,
    paddingVertical: theme.spacing.spacing6,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.spacing8,
  },
  title: {
    ...theme.typography.titleM,
  },
  filterContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.spacing2,
  },
  selectedFilterColor: {
    color: theme.palette.text.brandPrimary,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.spacing8,
  },
}));

type PatientListProps = {
  data?: EmergencyRecord[];
  onUpdate?: (patientId: number, payload: PatientUpdate) => void;
};

const PatientList = ({ data, onUpdate }: PatientListProps) => {
  const styles = useStyles();
  const { t: translateTableActions } = useTranslation('translation', {
    keyPrefix: 'currentPatientList.filterOptions',
  });
  const { t } = useTranslation('translation', {
    keyPrefix: 'doctorDashboard.patientList',
  });
  const [filters, setFilters] = useState<Array<string>>([]);
  const [searchText, setSearchText] = useState('');
  const tableColumns = usePatientListColumns({ onUpdate });
  const { userId } = useGetUserProfile();

  const handleSearchChange = (text: string | undefined) => {
    setSearchText(text || '');
  };

  const filteredPatientListData = useMemo(() => {
    let list = data ?? [];

    // Filter records matching search text
    if (searchText) {
      list = _.filter(list, (record) => {
        return (
          record.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
          record.lastName.toLowerCase().includes(searchText.toLowerCase())
        );
      });
    }

    // Filter records matching filters
    if (filters.length) {
      list = _.filter(list, (record) => {
        return filters.some((filter) => {
          if (filter === 'patientsAssignedToMe') {
            return record.d1 === userId;
          }
          if (filter === 'patientsNotAssignedToAnyone') {
            return record.d1 === null;
          }
          return false;
        });
      });
    }

    return list;
  }, [data, userId, searchText, filters]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <SearchInput
            onChange={handleSearchChange}
            disabled={false}
            placeholder={t('searchPlaceholder')}
            value={searchText}
          />
        </View>

        <View style={styles.headerActions}>
          <View>
            <Menu
              options={filterOptions({ t: translateTableActions })}
              selected={filters}
              onChange={(v) => setFilters(v as Array<string>)}
              optionStyle="checkbox"
              allowSearch
              searchProps={{
                placeholder: t('filters.searchPlaceholder'),
              }}
              showSelected
              multiple
              optionsCustomWidth={{ width: 350 }}
            >
              <View style={styles.filterContent}>
                <Text>{t('filters.label', { count: filters.length })}</Text>
                <Text
                  style={filters.length > 0 ? styles.selectedFilterColor : null}
                >
                  {t('filters.filterCount', { count: filters.length })}
                </Text>
                <ChevronDownIcon color={Colors.palette.icon.primary} />
              </View>
            </Menu>
          </View>
        </View>
      </View>

      {/* Table */}
      <Table
        columns={tableColumns}
        data={filteredPatientListData ?? []}
        headerColumnsWidthArr={headerColumnsWidthArr}
        recordColumnsWidthArr={recordColumnsWidthArr}
      />
    </View>
  );
};

export default PatientList;
