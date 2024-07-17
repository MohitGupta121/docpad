import * as React from 'react';
import { Text, View } from 'react-native';
import { makeStyles } from '../../helpers/hooks/useTheme';
import { ITheme } from '../../assets/themes/mainTheme';
import { useBodySystems } from '../../constants/bodySystems';

const useStyles = makeStyles((theme: ITheme) => ({
  root: {
    marginLeft: 22,
    paddingVertical: theme.spacing.spacing4,
    paddingHorizontal: theme.spacing.spacing8,
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
    justifyContent: 'center',
    gap: theme.spacing.spacing4,
  },
  entry: {
    flexDirection: 'row',
  },
  colorView: {
    width: theme.spacing.spacing6,
    height: theme.spacing.spacing4,
    borderRadius: theme.spacing.spacing2,
    marginRight: theme.spacing.spacing2,
    alignSelf: 'center',
  },
  disabledColor: {
    backgroundColor: theme.palette.surface.disabled,
  },
  text: {
    ...theme.typography.bodyS,
    color: theme.palette.text.tertiary,
  },
  disabledText: {
    color: theme.palette.text.disabled,
  },
  fadedColor: {
    opacity: 0.3,
  },
}));

interface ILegend {
  data: string[];
  roundtreeFilter: string;
}

const Legend = ({ data, roundtreeFilter }: ILegend) => {
  const styles = useStyles();
  const bodySystems = useBodySystems();

  return (
    <View style={styles.root}>
      <View style={styles.legend}>
        {bodySystems.map((system) => {
          return (
            <View key={system.key} style={styles.entry}>
              <View
                style={[
                  styles.colorView,
                  !data.includes(system.key) && styles.disabledColor,
                  data.includes(system.key) &&
                    (roundtreeFilter.length === 0 ||
                      (roundtreeFilter.length !== 0 &&
                        roundtreeFilter === system.key)) && {
                      backgroundColor: system.chartLineColor,
                    },
                  data.includes(system.key) &&
                    roundtreeFilter.length !== 0 &&
                    roundtreeFilter !== system.key && [
                      styles.fadedColor,
                      {
                        backgroundColor: system.chartLineColor,
                      },
                    ],
                ]}
              />
              <Text
                style={[
                  styles.text,
                  (!data.includes(system.key) ||
                    (roundtreeFilter.length !== 0 &&
                      roundtreeFilter !== system.key)) &&
                    styles.disabledText,
                ]}
              >
                {system.label}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default Legend;
