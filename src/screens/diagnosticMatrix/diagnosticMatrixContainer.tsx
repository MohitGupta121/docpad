import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ITheme } from '../../assets/themes/mainTheme';
import { makeStyles } from '../../helpers/hooks/useTheme';
import Dropdown from './../../components/dropdown/dropdown';
import { useState } from 'react';
import Menu from '../../components/menu';
import Colors from '../../assets/themes/mainTheme/palette';
import ChevronDownIcon from '../../assets/icons/chevronDown.svg';
import { NotificationsCount } from 'src/docpad-api/open-api';
import { filterOptions } from './constants';
import DiagnosticTable from '../../components/diagnosticMatrix/diagnosticTable/diagnosticTable';
import DiagnosticListDetails from '../../components/diagnosticMatrix/diagnosticListDetails/diagnosticListDetails';

const useStyles = makeStyles((theme: ITheme) => ({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.spacing7,
    paddingVertical: theme.spacing.spacing7,
    gap: theme.spacing.spacing6,
  },
  title: {
    ...theme.typography.bodyL,
  },
  chiefComplaintDropdown: {
    minHeight: 40,
    maxHeight: 40,
  },
  filterWrapper: {
    borderWidth: 1,
    borderRadius: theme.spacing.spacing2,
    alignSelf: 'flex-start',
    paddingVertical: theme.spacing.spacing4,
    paddingHorizontal: theme.spacing.spacing4,
    borderColor: theme.palette.border.grayInputDefault,
  },
  filterContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.spacing2,
  },
  filterLabelText: {
    ...theme.typography.titleXS,
  },
  filterCountText: {
    ...theme.typography.bodyM,
  },
  diagnosticMatrixWrapper: {
    marginHorizontal: theme.spacing.spacing7,
    marginVertical: theme.spacing.spacing9,
    zIndex: -1,
  },
  diagnosticTableWrapper: {
    marginTop: theme.spacing.spacing8,
    flexDirection: 'row',
    gap: theme.spacing.spacing5,
  },
}));

const DiagnosticMatrixContainer = () => {
  const styles = useStyles();
  const { t } = useTranslation('translation', {
    keyPrefix: 'diagnosticMatrix',
  });

  const [selectedChief, setSelectedChief] = useState<string>('');
  const handleChiefChange = (newValue: string) => {
    setSelectedChief(newValue);
  };

  const [filters] = useState<Array<keyof NotificationsCount>>([]);
  const [tableFilters, setTableFilters] = useState<string[]>([]);

  const handleRemove = (record: string) => {
    setTableFilters(tableFilters.filter((item) => item !== record));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{t('body')}</Text>
        <View style={styles.chiefComplaintDropdown}>
          <Dropdown
            label={t('dropDownLabel')}
            placeholder={t('dropDownPlaceholder')}
            options={[
              { value: '1', label: 'test1' },
              { value: '2', label: 'test2' },
              { value: '3', label: 'test3' },
            ]}
            value={selectedChief}
            onChange={handleChiefChange}
            disabled={false}
            fullWidth
            customStyle={styles.chiefComplaintDropdown}
          />
        </View>
      </View>

      <View style={styles.diagnosticMatrixWrapper}>
        <View style={styles.filterWrapper}>
          <Menu
            options={filterOptions}
            selected={filters}
            onChange={() => {}}
            optionStyle="checkbox"
            showSelected
            multiple
          >
            <View style={styles.filterContent}>
              <Text style={styles.filterLabelText}>
                {t('filters.label', { count: filters.length })}
              </Text>
              <Text
                style={[
                  styles.filterCountText,
                  filters.length > 0 ? styles.selectedFilterColor : null,
                ]}
              >
                {t('filters.filterCount', { count: filters.length })}
              </Text>
              <ChevronDownIcon color={Colors.palette.icon.primary} />
            </View>
          </Menu>
        </View>

        <View style={styles.diagnosticTableWrapper}>
          <View>
            <DiagnosticTable
              filters={tableFilters}
              onFiltersChange={setTableFilters}
            />
          </View>
          <View>
            <DiagnosticListDetails
              filters={tableFilters}
              onRemove={handleRemove}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default DiagnosticMatrixContainer;
