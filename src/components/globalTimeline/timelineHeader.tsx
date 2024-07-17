import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { makeStyles, useTheme } from '../../helpers/hooks/useTheme.ts';
import { ITheme } from '../../assets/themes/mainTheme';
import Menu from '../menu/menu';
import ChevronDownIcon from '../../assets/icons/chevronDown.svg';
import InfoIcon from '../../assets/icons/info.svg';
import ShadesIcon from '../../assets/icons/shades.svg';
import TapIcon from '../../assets/icons/tap.svg';
import Colors from '../../assets/themes/mainTheme/palette';
import { useTranslation } from 'react-i18next';
import Checkbox from '../checkbox/checkbox';
import Modal from 'react-native-modal';

const useStyles = makeStyles((theme: ITheme) => ({
  flexRow: {
    flexDirection: 'row',
  },
  filterBox: {
    borderRadius: theme.spacing.spacing2,
    borderWidth: 1,
    borderColor: theme.palette.border.grayInputDefault,
    padding: theme.spacing.spacing4,
    paddingRight: theme.spacing.spacing2,
    marginRight: theme.spacing.spacing6,
    alignSelf: 'flex-start',
  },
  filterContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.spacing2,
  },
  selectedFilterColor: {
    color: theme.palette.text.brandPrimary,
  },
  filterText: {
    ...theme.typography.bodyM,
  },
  colorsWrapper: {
    width: theme.spacing.spacing14,
  },
  colorFlex: {
    flex: 1,
  },
  firstColor: {
    borderTopLeftRadius: theme.spacing.spacing4,
    borderBottomLeftRadius: theme.spacing.spacing4,
    borderWidth: 1,
    borderRightWidth: 0,
    borderColor: theme.palette.border.grayInputDefault,
  },
  lastColor: {
    borderTopRightRadius: theme.spacing.spacing4,
    borderBottomRightRadius: theme.spacing.spacing4,
  },
  episodeInfoTextWrapper: {
    marginLeft: theme.spacing.spacing4,
    marginRight: theme.spacing.spacing5,
  },
  episodeInfoText: {
    ...theme.typography.bodyM,
  },
  selectLastOneTextWrapper: {
    marginLeft: -theme.spacing.spacing3,
    marginRight: theme.spacing.spacing9,
  },
  infoButtonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: theme.spacing.spacing1,
    width: 36,
    height: 36,
  },
  infoButtonFocused: {
    borderRadius: 18,
    backgroundColor: theme.palette.button.quaternaryPressed,
  },
  infoModal: {
    ...theme.globalStyles.elevation,
    position: 'absolute',
    right: -28,
    top: 148,
    backgroundColor: theme.palette.surface.primary,
    borderWidth: 1,
    borderRadius: theme.spacing.spacing4,
    borderColor: theme.palette.border.grayInputDefault,
    padding: theme.spacing.spacing5,
    gap: theme.spacing.spacing4,
    flexDirection: 'column',
  },
  timelineHintWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing.spacing4,
  },
  tipNumber: {
    backgroundColor: theme.palette.timelineTips.secondary,
    height: theme.spacing.spacing9,
    width: theme.spacing.spacing9,
    borderRadius: theme.spacing.spacing9 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tipNumberText: {
    ...theme.typography.titleXXS,
    color: theme.palette.timelineTips.primary,
  },
  tipText: {
    ...theme.typography.bodyM,
    width: 235,
  },
  tipMarginBottom: {
    marginBottom: theme.spacing.spacing4,
  },
}));

const TimelineHeader = () => {
  const styles = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();
  const [filters, setFilters] = useState<string[]>([]);
  const [selectedLatestEpisode, setSelectedLatestEpisode] =
    useState<string>('');
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const renderColorIndicator = (
    type: 'timelineOutPatient' | 'timelineEmergency' | 'timelineInPatient',
  ) => {
    return (
      <View style={styles.flexRow}>
        <View style={[styles.colorsWrapper, styles.flexRow]}>
          <View
            style={[
              styles.colorFlex,
              { backgroundColor: theme.palette[`${type}`].noEpisodes },
              styles.firstColor,
            ]}
          />
          <View
            style={[
              styles.colorFlex,
              { backgroundColor: theme.palette[`${type}`]['1-3Episodes'] },
            ]}
          />
          <View
            style={[
              styles.colorFlex,
              { backgroundColor: theme.palette[`${type}`]['4-6Episodes'] },
            ]}
          />
          <View
            style={[
              styles.colorFlex,
              { backgroundColor: theme.palette[`${type}`]['7-9Episodes'] },
            ]}
          />
          <View
            style={[
              styles.colorFlex,
              { backgroundColor: theme.palette[`${type}`]['10-12Episodes'] },
            ]}
          />
          <View
            style={[
              styles.colorFlex,
              { backgroundColor: theme.palette[`${type}`]['13-15Episodes'] },
            ]}
          />
          <View
            style={[
              styles.colorFlex,
              { backgroundColor: theme.palette[`${type}`]['16-18Episodes'] },
            ]}
          />
          <View
            style={[
              styles.colorFlex,
              { backgroundColor: theme.palette[`${type}`]['19-21Episodes'] },
            ]}
          />
          <View
            style={[
              styles.colorFlex,
              { backgroundColor: theme.palette[`${type}`]['22-24Episodes'] },
              styles.lastColor,
            ]}
          />
        </View>
        <View style={styles.episodeInfoTextWrapper}>
          <Text style={styles.episodeInfoText}>
            {type === 'timelineInPatient'
              ? t('globalTimeline.in-patient')
              : type === 'timelineOutPatient'
              ? t('globalTimeline.out-patient')
              : t('globalTimeline.emergency')}
          </Text>
          <Text style={styles.episodeInfoText}>
            {t('globalTimeline.episode')}
          </Text>
        </View>
        <Checkbox
          checked={selectedLatestEpisode === type}
          onChange={() => setSelectedLatestEpisode(type)}
        />
        <View style={styles.selectLastOneTextWrapper}>
          <Text style={styles.episodeInfoText}>
            {t('globalTimeline.selectLatestOne')}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.flexRow}>
      <View style={styles.filterBox}>
        <Menu
          options={[]}
          selected={[]}
          onChange={(v) => setFilters(v)}
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
              style={[
                styles.filterText,
                filters.length > 0 ? styles.selectedFilterColor : null,
              ]}
            >
              {filters.length === 0
                ? t('filters.filterCountZero', { count: filters.length })
                : t('filters.filterCount', { count: filters.length })}
            </Text>
            <ChevronDownIcon color={Colors.palette.icon.primary} />
          </View>
        </Menu>
      </View>

      <View style={styles.flexRow}>
        {renderColorIndicator('timelineOutPatient')}
        {renderColorIndicator('timelineEmergency')}
        {renderColorIndicator('timelineInPatient')}
      </View>
      <TouchableOpacity
        onPress={() => setIsInfoOpen(!isInfoOpen)}
        style={[
          styles.infoButtonWrapper,
          isInfoOpen && styles.infoButtonFocused,
        ]}
      >
        <InfoIcon />
      </TouchableOpacity>

      <Modal
        isVisible={isInfoOpen}
        style={styles.infoModal}
        backdropOpacity={0}
        onBackdropPress={() => setIsInfoOpen(false)}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
      >
        <View
          style={[
            styles.flexRow,
            styles.timelineHintWrapper,
            styles.tipMarginBottom,
          ]}
        >
          <View style={styles.tipNumber}>
            <Text style={styles.tipNumberText}>1</Text>
          </View>
          <TapIcon />
          <Text style={styles.tipText}>{t('globalTimeline.clickTip')}</Text>
        </View>

        <View style={[styles.flexRow, styles.timelineHintWrapper]}>
          <View style={styles.tipNumber}>
            <Text style={styles.tipNumberText}>2</Text>
          </View>
          <ShadesIcon />
          <Text style={styles.tipText}>{t('globalTimeline.shadesTip')}</Text>
        </View>
      </Modal>
    </View>
  );
};

export default TimelineHeader;
