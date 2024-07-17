import React, { useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, View, Text } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { createResponder } from 'react-native-gesture-responder';
import Legend from './legend.tsx';
import { ITheme } from '../../assets/themes/mainTheme';
import { makeStyles, useTheme } from '../../helpers/hooks/useTheme.ts';
import DraggingTool from '../../assets/icons/draggingToolEnabled.svg';
import DraggingToolDisabled from '../../assets/icons/draggingToolDisabled.svg';
import {
  getGradientEndColor,
  getGradientStartColor,
} from '../../helpers/interpolatedTimeline.ts';
import XAxis from './xAxis.tsx';
import { useBodySystems } from '../../constants/bodySystems';

export const LINE_CHART_WIDTH = 350;
const CHART_CONTAINER_WIDTH = 400;
const CHART_POS_ORIGIN = -373;
const SLIDER_START_POS = -20;

const useStyles = makeStyles((theme: ITheme) => ({
  root: {
    width: CHART_CONTAINER_WIDTH,
    marginTop: 14,
  },
  row: { flexDirection: 'row' },
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  axisLabelText: {
    ...theme.typography.bodyS,
    color: theme.palette.text.tertiary,
  },
  yAxisDescriptionContainer: {
    position: 'absolute',
    left: -58,
    top: 140,
    transform: [{ rotate: '-90deg' }],
    width: 120,
  },
  yAxisDescription: {
    ...theme.typography.bodySMediumWeight,
    color: theme.palette.text.tertiary,
  },
  xAxisDescription: {
    ...theme.typography.bodySMediumWeight,
    color: theme.palette.text.tertiary,
    textAlign: 'center',
    marginTop: theme.spacing.spacing2,
  },
  hintContainer: {
    position: 'absolute',
    top: 0,
    left: 16,
    right: 0,
    bottom: 0,
    width: CHART_CONTAINER_WIDTH,
    height: 270,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hint: {
    width: 249,
    padding: theme.spacing.spacing5,
    borderRadius: theme.spacing.spacing4,
    backgroundColor: 'rgba(238, 236, 242, 0.60)',
  },
  hintText: {
    ...theme.typography.bodyM,
    color: theme.palette.text.tertiary,
  },
  dataPoint: {
    width: theme.spacing.spacing4,
    height: theme.spacing.spacing4,
    borderRadius: theme.spacing.spacing2,
    left: 1,
    bottom: 2,
    borderWidth: 1,
    borderColor: theme.palette.border.white,
    shadowColor: 'rgba(126, 17, 89, 0.50)',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  slider: {
    top: -10,
  },
}));

type DataPointItem = { color: string; value: string };

type DataPointValue = { value: number; index: number };

type Accumulator = {
  min: number;
  max: number;
};

interface IInterpolatedTimeline {
  roundtreeFilter: string;
  selectedEpisode: number | undefined;
}

// TODO: integrate real data
const data = {
  EYE: [
    { value: 4, index: 0 },
    { value: 1, index: 1 },
    { value: 3, index: 2 },
  ],
  MUS: [
    { value: 0, index: 0 },
    { value: 3, index: 1 },
    { value: 0, index: 2 },
  ],
  MET: [
    { value: 0, index: 0 },
    { value: 2, index: 1 },
    { value: 1, index: 2 },
  ],
  PSY: [
    { value: 3, index: 0 },
    { value: 2, index: 1 },
    { value: 3, index: 2 },
  ],
  NEU: [
    { value: 1, index: 0 },
    { value: 4, index: 1 },
    { value: 4, index: 2 },
  ],
  ENT: [
    { value: 3, index: 0 },
    { value: 0, index: 1 },
    { value: 1, index: 2 },
  ],
  PUL: [
    { value: 2, index: 0 },
    { value: 0, index: 1 },
    { value: 2, index: 2 },
  ],
  CV: [
    { value: 3, index: 0 },
    { value: 3, index: 1 },
    { value: 3, index: 2 },
  ],
};

const InterpolatedTimeline = ({
  roundtreeFilter,
  selectedEpisode,
}: IInterpolatedTimeline) => {
  const styles = useStyles();
  const theme = useTheme();
  const bodySystems = useBodySystems();
  const { t } = useTranslation('translation', {
    keyPrefix: 'patientDashboard.interpolatedTimeline',
  });
  const x = useRef(new Animated.Value(SLIDER_START_POS)).current;
  const sliderStyle = { left: x };

  const getMinMaxData = (dataPointValues: DataPointValue[]) => {
    return dataPointValues.reduce(
      (acc: Accumulator, curr: DataPointValue) => {
        acc.min = Math.min(acc.min, curr.value);
        acc.max = Math.max(acc.max, curr.value);
        return acc;
      },
      { min: Infinity, max: -Infinity },
    );
  };

  const filteredData = useMemo(() => {
    // Create an empty object to store the filtered data
    let result = {};

    if (selectedEpisode) {
      // Check if the filter key exists in the data object
      if (Object.prototype.hasOwnProperty.call(data, roundtreeFilter)) {
        // Add the filtered key-value pair to the filteredData object
        result[roundtreeFilter] = data[roundtreeFilter];
      } else if (roundtreeFilter.length === 0) {
        result = data;
      }
    }

    return result;
  }, [selectedEpisode, roundtreeFilter]);

  const dataSet = useMemo(() => {
    if (Object.keys(filteredData).length > 0) {
      return Object.keys(filteredData).map((item) => {
        const color = bodySystems.find(
          (system) => system.key === item,
        )?.chartLineColor;

        const { min, max } = getMinMaxData(data[item]);

        return {
          data: data[item].map((_, index) => {
            return {
              value: data[item].find((dataItem) => dataItem.index === index)
                ?.value,
              color: color,
            };
          }),
          color: color,
          startFillColor: getGradientStartColor(theme, min, max),
          endFillColor: getGradientEndColor(theme, min, max),
        };
      });
    }
  }, [filteredData, bodySystems, theme]);

  const genericEmptyDataSet = useMemo(() => {
    if (Object.keys(data).length > 0) {
      return Object.keys(data).map((item) => {
        return {
          data: data[item].map(() => {
            return {
              value: 0,
            };
          }),
          color: 'transparent',
          startOpacity: 0,
          endOpacity: 0,
        };
      });
    }
  }, []);

  const xAxisLabels = useMemo(() => {
    if (data) {
      return Object.keys(data).length > 0
        ? Array.from({ length: data[Object.keys(data)[0]].length }, (_, i) =>
            (i + 1).toString(),
          )
        : undefined;
    }
  }, []);

  const panResponder = createResponder({
    onStartShouldSetResponder: () => true,
    onStartShouldSetResponderCapture: () => true,
    onMoveShouldSetResponder: () => true,
    onMoveShouldSetResponderCapture: () => true,
    onResponderMove: (event: any, gestureState: any) => {
      if (dataSet?.length > 0) {
        pan(gestureState);
      }
      // TODO: uncomment when functionality is implemented
      //const newX = getNewXPos();
      //updateRTValues(newX);
    },
    onPanResponderTerminationRequest: () => true,
  });

  const pan = (gestureState: any) => {
    const maxX = SLIDER_START_POS;
    const minX = CHART_POS_ORIGIN;
    const xDiff = gestureState.moveX - gestureState.previousMoveX;

    const xJsAnimated = JSON.stringify(x);
    const xFinalResult = Number(xJsAnimated);

    let newX = xFinalResult + xDiff;

    if (newX < minX) {
      newX = minX;
    } else if (newX > maxX) {
      newX = maxX;
    }

    x.setValue(newX);
  };

  const renderDataPoints = (dataItem: DataPointItem, index: number) => {
    // To not display data point for first and last item
    if (
      dataSet &&
      xAxisLabels &&
      index !== 0 &&
      index !== xAxisLabels.length - 1
    ) {
      return (
        <View
          style={[
            styles.dataPoint,
            {
              backgroundColor: dataItem.color,
            },
          ]}
        />
      );
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.yAxisDescriptionContainer}>
        <Text style={styles.yAxisDescription}>{t('yAxisDescription')}</Text>
      </View>

      <View style={styles.row}>
        <View>
          <LineChart
            key={JSON.stringify(dataSet)} // to make the data correctly re-render on filter
            dataSet={dataSet || genericEmptyDataSet}
            areaChart
            curved
            disableScroll
            adjustToWidth
            showVerticalLines
            curveType={1}
            rulesType="solid"
            width={LINE_CHART_WIDTH}
            xAxisLength={360}
            height={250}
            verticalLinesHeight={260}
            stepValue={1}
            maxValue={5}
            xAxisColor={theme.palette.border.grayInputDefault}
            yAxisColor={theme.palette.border.grayInputDefault}
            initialSpacing={0}
            endSpacing={10}
            startOpacity={0.5}
            endOpacity={0}
            curvature={0.1}
            yAxisTextStyle={styles.axisLabelText}
            verticalLinesColor={theme.palette.border.grayInputDefault}
            customDataPoint={(dataPoint: DataPointItem, index: number) =>
              renderDataPoints(dataPoint, index)
            }
          />

          <XAxis labels={xAxisLabels} />
        </View>

        <Animated.View style={[styles.slider, sliderStyle]} {...panResponder}>
          {dataSet && dataSet.length > 0 ? (
            <DraggingTool height={280} width={45} />
          ) : (
            <DraggingToolDisabled height={280} width={45} />
          )}
        </Animated.View>
      </View>

      {!selectedEpisode && (
        <View style={styles.hintContainer}>
          <View style={styles.hint}>
            <Text style={styles.hintText}>{t('selectEpisodeHint')}</Text>
          </View>
        </View>
      )}

      <Text style={styles.xAxisDescription}>{t('xAxisDescription')}</Text>
      {!!selectedEpisode && (
        <Legend data={Object.keys(data)} roundtreeFilter={roundtreeFilter} />
      )}
    </View>
  );
};

export default InterpolatedTimeline;
