import { Text, View } from 'react-native';
import { ITheme } from '../../assets/themes/mainTheme';
import { makeStyles } from '../../helpers/hooks/useTheme';

const useStyles = makeStyles((theme: ITheme) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    padding: theme.spacing.spacing5,
    backgroundColor: theme.palette.surface.negativeLightBackground,
    borderRadius: theme.spacing.spacing4,
    maxWidth: 844,
  },
  text: {
    ...theme.typography.bodyL,
    color: theme.palette.text.negative,
    textAlign: 'center',
  },
}));

type IErrorBlock = {
  errorMsg: string;
};

const ErrorMsg = ({ errorMsg }: IErrorBlock) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <View style={styles.error}>
        <Text style={styles.text}>{errorMsg}</Text>
      </View>
    </View>
  );
};

export default ErrorMsg;
