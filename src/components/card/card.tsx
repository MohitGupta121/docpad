import { Text, View, ViewProps } from 'react-native';
import { ITheme } from '../../assets/themes/mainTheme';
import { makeStyles } from '../../helpers/hooks/useTheme';

const useStyles = makeStyles((theme: ITheme) => ({
  root: {
    ...theme.globalStyles.elevation2,
    backgroundColor: theme.palette.surface.primary,
    borderRadius: theme.spacing.spacing4,
    padding: theme.spacing.spacing5,
    marginBottom: theme.spacing.spacing4,
  },
  title: {
    ...theme.typography.bodyS,
    textTransform: 'uppercase',
    marginBottom: theme.spacing.spacing4,
  },
}));

interface ICard extends ViewProps {
  children?: React.ReactNode;
  title?: string;
}

const Card = ({ children, title, ...rest }: ICard) => {
  const styles = useStyles();

  return (
    <View {...rest} style={styles.root}>
      {!!title && <Text style={styles.title}>{title}</Text>}
      {children}
    </View>
  );
};

export default Card;
