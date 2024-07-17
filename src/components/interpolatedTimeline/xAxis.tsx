import * as React from 'react';
import { View, Text } from 'react-native';
import { makeStyles } from '../../helpers/hooks/useTheme.ts';
import { ITheme } from '../../assets/themes/mainTheme';
import { LINE_CHART_WIDTH } from './interpolatedTimeline.tsx';

const useStyles = makeStyles((theme: ITheme) => ({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 35,
    marginTop: -18,
    width: LINE_CHART_WIDTH,
  },
  axisLabelText: {
    ...theme.typography.bodyS,
    color: theme.palette.text.tertiary,
  },
}));

interface IXAxis {
  labels: string[] | undefined;
}

const XAxis = ({ labels }: IXAxis) => {
  const styles = useStyles();

  return (
    <View style={styles.root}>
      {labels &&
        labels.map((item, index) => (
          <View key={`X-${index}`}>
            <Text style={styles.axisLabelText}>{item}</Text>
          </View>
        ))}
    </View>
  );
};

export default XAxis;
