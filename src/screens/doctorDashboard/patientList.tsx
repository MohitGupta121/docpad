import { useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import { DashboardPatient, NotificationsCount } from 'src/docpad-api/open-api';

import SearchInput from '../../components/textInputs/searchInput';
import Table from '../../components/table/table';
import { ITheme } from '../../assets/themes/mainTheme';
import ChevronDownIcon from '../../assets/icons/chevronDown.svg';
import Colors from '../../assets/themes/mainTheme/palette';
import { makeStyles } from '../../helpers/hooks/useTheme';
import { PatientListColumns, filterOptions, sortOptions } from './constants';
import Menu from '../../components/menu';

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
  data?: DashboardPatient[];
};

const PatientList = ({ data }: PatientListProps) => {
  const styles = useStyles();
  const { t } = useTranslation('translation', {
    keyPrefix: 'doctorDashboard.patientList',
  });
  const [sortOrder, setSortOrder] = useState<keyof NotificationsCount | ''>('');
  const [filters, setFilters] = useState<Array<keyof NotificationsCount>>([]);
  const [searchText, setSearchText] = useState('');

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
        return filters.some((filter) => !!record?.notificationsCount?.[filter]);
      });
    }

    // // Sort records
    if (sortOrder) {
      list = _.orderBy(
        list,
        [(record) => record.notificationsCount[sortOrder]],
        ['desc'],
      );
    }

    return list;
  }, [data, searchText, filters, sortOrder]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <Text style={styles.title}>{t('title')}</Text>
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
              options={sortOptions}
              selected={[sortOrder]}
              onChange={(v) => setSortOrder(v[0] as keyof NotificationsCount)}
            >
              <View style={styles.filterContent}>
                <Text>{t('sort.label')}</Text>
                <Text
                  style={
                    sortOrder !== sortOptions[0].value
                      ? styles.selectedFilterColor
                      : null
                  }
                >
                  {_.find(sortOptions, { value: sortOrder })?.label ?? ''}
                </Text>
                <ChevronDownIcon color={Colors.palette.icon.primary} />
              </View>
            </Menu>
          </View>

          <View>
            <Menu
              options={filterOptions}
              selected={filters}
              onChange={(v) => setFilters(v as Array<keyof NotificationsCount>)}
              optionStyle="checkbox"
              allowSearch
              searchProps={{
                placeholder: t('filters.searchPlaceholder'),
              }}
              showSelected
              multiple
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
        columns={PatientListColumns}
        data={filteredPatientListData ?? []}
      />
    </View>
  );
};

export default PatientList;
