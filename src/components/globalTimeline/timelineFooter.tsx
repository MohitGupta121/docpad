import React from 'react';
import { Text, View } from 'react-native';
import { makeStyles } from '../../helpers/hooks/useTheme.ts';
import { Button } from '../button';
import ZoomInIcon from '../../assets/icons/zoomIn.svg';
import ZoomOutIcon from '../../assets/icons/zoomOut.svg';
import ChevronLeftIcon from '../../assets/icons/chevronLeft.svg';
import ChevronRightIcon from '../../assets/icons/chevronRight.svg';
import { ITheme } from '../../assets/themes/mainTheme';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: ITheme) => ({
  flexRow: {
    flexDirection: 'row',
  },
  primaryColor: {
    color: theme.palette.icon.brandPrimary,
  },
  disabledColor: {
    color: theme.palette.icon.disabled,
  },
  zoomButton: {
    borderRadius: theme.spacing.spacing2,
    padding: theme.spacing.spacing4,
    marginRight: theme.spacing.spacing4,
    minWidth: 36,
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    ...theme.typography.titleXS,
  },
  checkEpisodeButton: {
    marginLeft: 'auto',
  },
}));

export interface ITimelineFooter {
  isMaxZoom: boolean;
  isMinZoom: boolean;
  isToday: boolean;
  isEpisodeSelected: boolean;
  handleZoomIn: () => void;
  handleZoomOut: () => void;
  handleTodayPress: () => void;
  handleSelectNext: () => void;
  handleSelectPrevious: () => void;
  handleCheckEpisode: () => void;
}

const TimelineFooter = ({
  isMaxZoom,
  isMinZoom,
  isToday,
  isEpisodeSelected,
  handleZoomIn,
  handleZoomOut,
  handleTodayPress,
  handleSelectNext,
  handleSelectPrevious,
  handleCheckEpisode,
}: ITimelineFooter) => {
  const styles = useStyles();
  const { t } = useTranslation();

  return (
    <View style={styles.flexRow}>
      <Button
        style={styles.zoomButton}
        backgroundStyle={'secondary'}
        onPress={handleZoomIn}
        disabled={isMaxZoom}
      >
        <ZoomInIcon
          style={[styles.primaryColor, isMaxZoom && styles.disabledColor]}
        />
      </Button>
      <Button
        style={styles.zoomButton}
        backgroundStyle={'secondary'}
        onPress={handleZoomOut}
        disabled={isMinZoom}
      >
        <ZoomOutIcon
          style={[styles.primaryColor, isMinZoom && styles.disabledColor]}
        />
      </Button>
      <Button
        style={styles.zoomButton}
        backgroundStyle={'secondary'}
        onPress={handleTodayPress}
        disabled={isToday}
      >
        <Text
          style={[
            styles.buttonText,
            styles.primaryColor,
            isToday && styles.disabledColor,
          ]}
        >
          {t('globalTimeline.today')}
        </Text>
      </Button>
      <Button
        style={styles.zoomButton}
        backgroundStyle={'tertiary'}
        onPress={handleSelectPrevious}
        disabled={!isEpisodeSelected}
      >
        <ChevronLeftIcon
          style={[
            styles.primaryColor,
            !isEpisodeSelected && styles.disabledColor,
          ]}
        />
        <Text
          style={[
            styles.buttonText,
            styles.primaryColor,
            !isEpisodeSelected && styles.disabledColor,
          ]}
        >
          {t('globalTimeline.checkPreviousEpisode')}
        </Text>
      </Button>
      <Button
        style={styles.zoomButton}
        backgroundStyle={'tertiary'}
        onPress={handleSelectNext}
        disabled={!isEpisodeSelected}
      >
        <Text
          style={[
            styles.buttonText,
            styles.primaryColor,
            !isEpisodeSelected && styles.disabledColor,
          ]}
        >
          {t('globalTimeline.checkNextEpisode')}
        </Text>
        <ChevronRightIcon
          style={[
            styles.primaryColor,
            !isEpisodeSelected && styles.disabledColor,
          ]}
        />
      </Button>
      <Button
        style={[styles.zoomButton, styles.checkEpisodeButton]}
        backgroundStyle={'secondary'}
        onPress={handleCheckEpisode}
        disabled={!isEpisodeSelected}
      >
        <Text
          style={[
            styles.buttonText,
            styles.primaryColor,
            !isEpisodeSelected && styles.disabledColor,
          ]}
        >
          {t('globalTimeline.checkSelectedEpisode')}
        </Text>
        <ChevronRightIcon
          style={[
            styles.primaryColor,
            !isEpisodeSelected && styles.disabledColor,
          ]}
        />
      </Button>
    </View>
  );
};

export default TimelineFooter;
