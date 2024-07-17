import * as React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useBodySystems } from '../../../constants/bodySystems';
import { data, getDiamondStyle } from './constants';
import { useStyles } from './styles';

interface DiagnosticTableProps {
  filters: string[];
  onFiltersChange: (filter: string[]) => void;
}

const DiagnosticTable = ({
  filters,
  onFiltersChange,
}: DiagnosticTableProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'diagnosticMatrix.diagnosticTable',
  });
  const { t: translateTableActions } = useTranslation('translation', {
    keyPrefix: 'diagnosticMatrix.diagnosticTable',
  });
  const styles = useStyles();
  const bodySystems = useBodySystems();

  const columnData = data({ t: translateTableActions });

  const handleFilterChange = (filter: string) => {
    if (filters.includes(filter)) {
      onFiltersChange(filters.filter((item) => item !== filter));
    } else {
      onFiltersChange([...filters, filter]);
    }
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={[styles.headerCell, styles.firstColumn]}>
        <Text
          style={[styles.headerText, styles.headerTextBottomLeft]}
          numberOfLines={2}
        >
          {t('headers.disease')}
        </Text>
        <View style={styles.diagonal} />
        <Text
          style={[styles.headerText, styles.headerTextTopRight]}
          numberOfLines={2}
        >
          {t('headers.bodySystem')}
        </Text>
      </View>
      {bodySystems.map((record, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.headerCell,
            filters.includes(record.label) && styles.selectedCell,
            index === bodySystems.length - 1 && styles.lastCellHeaderBoarder,
          ]}
          onPress={() => handleFilterChange(record.label)}
        >
          <Text style={styles.headerText}>{record.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderRow = ({ item, index }: { item: any; index: number }) => (
    <View style={styles.row}>
      <TouchableOpacity
        style={[
          styles.cell,
          styles.firstColumn,
          filters.includes(item.etiology) && styles.selectedCell,
          index === columnData.length - 1 && styles.bottomCells,
        ]}
        onPress={() => handleFilterChange(item.etiology)}
      >
        <View style={styles.etiologyWrapper}>
          <View
            style={[
              styles.indexWrapper,
              item.index === 'OTHER' ? styles.indexWrapperOther : {},
            ]}
          >
            <Text style={styles.indexText}>{item.index}</Text>
          </View>
          <Text style={styles.headerText}>{item.etiology}</Text>
        </View>
      </TouchableOpacity>
      {item.bodySystems.map((cell: any, colIndex: number) => {
        const cellId = `${item.etiology}/${bodySystems[colIndex].label}`;

        return (
          <TouchableOpacity
            key={colIndex}
            style={[
              styles.cell,
              filters.includes(cellId) && styles.selectedCell,
              filters.includes(item.etiology) && styles.selectedCell,
              filters.includes(bodySystems[colIndex].label) &&
                styles.selectedCell,
              colIndex === item.bodySystems.length - 1 &&
                styles.lastCellHeaderBoarder,
              index === columnData.length - 1 && styles.bottomCells,
            ]}
            onPress={() => handleFilterChange(cellId)}
          >
            {cell ? (
              <View
                style={[
                  styles.diamondWrapper,
                  getDiamondStyle(Number(cell)).shape,
                ]}
              >
                <Text
                  style={[
                    styles.diamondText,
                    getDiamondStyle(Number(cell)).text,
                  ]}
                >
                  {cell}
                </Text>
              </View>
            ) : null}
          </TouchableOpacity>
        );
      })}
    </View>
  );

  return (
    <FlatList
      ListHeaderComponent={renderHeader}
      data={columnData}
      renderItem={renderRow}
      keyExtractor={(item, index) => index.toString()}
      extraData={{ filters }}
      scrollEnabled={false}
    />
  );
};

export default DiagnosticTable;
