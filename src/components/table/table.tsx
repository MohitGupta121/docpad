import { useMemo, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Table as RNTable, Row } from 'react-native-reanimated-table';

import { ITheme } from '../../assets/themes/mainTheme';
import SortableIcon from '../../assets/icons/sortable.svg';
import { makeStyles } from '../../helpers/hooks/useTheme';

export interface IColumn<T extends object> {
  title: string;
  dataIndex: keyof T;
  key: string;
  sorter?: boolean;
  render?: ({
    value,
    raw,
    index,
  }: {
    value?: any;
    raw: T;
    index?: number;
  }) => JSX.Element;
}

type TableProps<T extends object> = {
  columns: Array<IColumn<T>>;
  data: Array<T>;
  headerColumnsWidthArr?: number[];
  recordColumnsWidthArr?: number[];
};

const useStyles = makeStyles((theme: ITheme) => ({
  header: {
    flexDirection: 'row',
    height: 44,
    backgroundColor: theme.palette.surface.appBackground,
    borderTopLeftRadius: theme.spacing.spacing4,
    borderTopRightRadius: theme.spacing.spacing4,
    borderBottomWidth: 1,
    borderBottomColor: theme.palette.border.brandPrimary,
    paddingHorizontal: theme.spacing.spacing5,
    marginHorizontal: theme.spacing.spacing4,
  },
  headerCell: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    ...theme.typography.titleXS,
    color: theme.palette.text.primary,
  },
  contentRow: {
    borderBottomWidth: 1,
    borderBottomColor: theme.palette.border.grayInputDefault,
    height: 49,
    paddingHorizontal: theme.spacing.spacing5,
    marginHorizontal: theme.spacing.spacing4,
  },
  contentText: {
    ...theme.typography.bodyM,
    color: theme.palette.text.primary,
    paddingVertical: theme.spacing.spacing4,
  },
}));

// TODO: Replace any with a generic data type
function Table<T extends object>({
  columns,
  data,
  headerColumnsWidthArr,
  recordColumnsWidthArr,
}: TableProps<T>) {
  const styles = useStyles();

  const [sortState, setSortState] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);

  const sortedData = useMemo(() => {
    if (!sortState) {
      return data;
    }

    const sorted = [...data].sort((a, b) => {
      const key = sortState.key as keyof T;
      if (a[key] < b[key]) {
        return sortState.direction === 'asc' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return sortState.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return sorted;
  }, [data, sortState]);

  const handleSort = (key: string) => {
    setSortState((state) => {
      if (state && state.key === key) {
        return { key, direction: state.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  const headerColumns = useMemo(() => {
    return columns.map((column) => {
      return (
        <View key={column.key} style={styles.headerCell}>
          <Text
            style={styles.headerText}
            onPress={() => column.sorter && handleSort(column.key)}
          >
            {column.title}
          </Text>
          {column.sorter && <SortableIcon width="16" height="18" />}
        </View>
      );
    });
  }, [columns, styles.headerCell, styles.headerText]);

  const tableData = useMemo(() => {
    return sortedData.map((record, index) => {
      return columns.map((column) =>
        column.render
          ? column.render({
              value: record[column.dataIndex],
              raw: record,
              index: index,
            })
          : record[column.dataIndex],
      );
    });
  }, [columns, sortedData]);

  return (
    <ScrollView>
      <RNTable>
        <Row
          data={headerColumns}
          style={styles.header}
          widthArr={headerColumnsWidthArr}
        />
        {tableData.map((record: any, index: number) => {
          return (
            <Row
              key={`row-${index}`}
              data={record}
              textStyle={styles.contentText}
              style={styles.contentRow}
              widthArr={recordColumnsWidthArr}
            />
          );
        })}
      </RNTable>
    </ScrollView>
  );
}

export default Table;
