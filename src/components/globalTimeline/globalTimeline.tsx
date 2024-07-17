import React from 'react';
import { View } from 'react-native';
import { makeStyles } from '../../helpers/hooks/useTheme.ts';
import { ITheme } from '../../assets/themes/mainTheme';
import TimelineHeader from './timelineHeader';
import TimelineFooter from './timelineFooter';
import Timeline from './timeline.tsx';

const useStyles = makeStyles((theme: ITheme) => ({
  root: {
    ...theme.globalStyles.elevation2,
    backgroundColor: theme.palette.surface.primary,
    padding: theme.spacing.spacing4,
    borderRadius: theme.spacing.spacing4,
    height: 240,
    width: 1080,
  },
}));

const GlobalTimeline = () => {
  const styles = useStyles();
  return (
    <View style={styles.root}>
      <TimelineHeader />
      <Timeline />
      <TimelineFooter
        isMaxZoom={true}
        isMinZoom={false}
        isToday={false}
        isEpisodeSelected={true}
        handleZoomIn={() => {}}
        handleZoomOut={() => {}}
        handleTodayPress={() => {}}
        handleSelectPrevious={() => {}}
        handleSelectNext={() => {}}
        handleCheckEpisode={() => {}}
      />
    </View>
  );
};

export default GlobalTimeline;
