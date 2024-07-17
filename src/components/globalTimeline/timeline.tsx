import React from 'react';
import { View } from 'react-native';
import { makeStyles } from '../../helpers/hooks/useTheme.ts';
import { ITheme } from '../../assets/themes/mainTheme';

const useStyles = makeStyles((theme: ITheme) => ({
  root: {
    height: 144,
    borderWidth: 1,
    borderColor: theme.palette.border.grayInputDefault,
    borderRadius: theme.spacing.spacing2,
    marginTop: theme.spacing.spacing2,
    marginBottom: theme.spacing.spacing2,
  },
}));

const Timeline = () => {
  const styles = useStyles();
  return <View style={styles.root} />;
};

export default Timeline;
