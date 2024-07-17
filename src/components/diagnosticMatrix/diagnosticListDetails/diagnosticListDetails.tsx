import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import Chip from '../../chip';
import { Diagnosis, diagnoses } from './constants';
import RotateIcon from '../../../assets/icons/rotate.svg';
import Roundtree from '../../../assets/images/miniRoundTree.png';
import { useStyles } from './styles';

interface DiagnosticListDetailsProps {
  filters: string[];
  onRemove: (record: string) => void;
}

const DiagnosticListDetails = ({
  filters,
  onRemove,
}: DiagnosticListDetailsProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'diagnosticMatrix.diagnosticTable.sidebars',
  });
  const styles = useStyles();
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<Diagnosis | null>(
    null,
  );

  const renderDiagnosisItem = ({ item }: { item: Diagnosis }) => {
    const isSelected = selectedDiagnosis?.id === item.id;
    const handlePress = () => {
      if (isSelected) {
        setSelectedDiagnosis(null);
      } else {
        setSelectedDiagnosis(item);
      }
    };
    return (
      <TouchableOpacity
        onPress={handlePress}
        style={[
          styles.diagnosisItem,
          isSelected && styles.selectedDiagnosisItem,
        ]}
      >
        <View
          style={[styles.diagnosisBullet, { backgroundColor: item.color }]}
        />
        <Text
          style={styles.diagnosisName}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Diagnosis list */}
      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>
          {t('diagnosisLists.title', { count: diagnoses.length })}
        </Text>
        <FlatList
          data={diagnoses}
          renderItem={renderDiagnosisItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={true}
          ListHeaderComponent={
            <>
              {!!filters.length && (
                <View style={styles.filterWrapper}>
                  <Text style={styles.filterTitle}>
                    {t('diagnosisLists.filter')}
                  </Text>
                  {filters.map((record) => {
                    return (
                      <Chip
                        textStyle={styles.filterText}
                        chipStyle={styles.filterTag}
                        onRemove={() => onRemove(record)}
                        numberOfLines={1}
                        key={record}
                      >
                        {record}
                      </Chip>
                    );
                  })}
                </View>
              )}
            </>
          }
        />
      </View>

      {/* Diagnosis details */}
      <View
        style={[
          styles.detailsContainer,
          selectedDiagnosis && styles.selectedDetailsContainer,
        ]}
      >
        <Text style={styles.detailsTitle}>{t('details.title')}</Text>
        <View>
          {selectedDiagnosis ? (
            <ScrollView style={styles.detailScrollView}>
              <View style={styles.selectedDetailsWrapper}>
                <View style={styles.detailsDiagnosisText}>
                  <View
                    style={[
                      styles.diagnosisBullet,
                      { backgroundColor: selectedDiagnosis.color },
                    ]}
                  />
                  <Text style={styles.diagnosisName}>
                    {selectedDiagnosis.name}
                  </Text>
                </View>
                <View style={styles.rotateDeviceWrapper}>
                  <RotateIcon style={styles.rotateIcon} />
                  <Text style={styles.rotateText}>
                    {t('details.rotateDevice')}
                  </Text>
                </View>
                <View style={styles.roundtreeContainer}>
                  <Image source={Roundtree} />
                </View>
                <View style={styles.prevalenceWrapper}>
                  <Text style={styles.detailTreeTitle}>
                    {t('details.prevalence')}
                  </Text>
                  <View style={styles.bulletListWrapper}>
                    <Text style={styles.bulletTextIcon}>{'\u2022'}</Text>
                    <Text style={styles.detailTreeDescription}>
                      {t('details.lorem')}
                    </Text>
                  </View>
                  <View style={styles.bulletListWrapper}>
                    <Text style={styles.bulletTextIcon}>{'\u2022'}</Text>
                    <Text style={styles.detailTreeDescription}>
                      {t('details.lorem')}
                    </Text>
                  </View>
                  <View style={styles.bulletListWrapper}>
                    <Text style={styles.bulletTextIcon}>{'\u2022'}</Text>
                    <Text style={styles.detailTreeDescription}>
                      {t('details.lorem')}
                    </Text>
                  </View>
                </View>
                <View style={styles.moreDetailsWrapper}>
                  <Text style={styles.detailTreeTitle}>
                    {t('details.moreDetails')}
                  </Text>
                  <Text style={styles.detailTreeDescription}>
                    {t('details.lorem2')}
                  </Text>
                </View>
              </View>
            </ScrollView>
          ) : (
            <View style={styles.detailsWrapper}>
              <Text style={styles.detailsPlaceholder}>
                {t('details.selectDiagnosis')}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default DiagnosticListDetails;
