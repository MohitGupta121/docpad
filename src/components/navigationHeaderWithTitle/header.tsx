import IconButton from '../button/iconButton';
import ChevronLeftIcon from '../../assets/icons/chevronLeft.svg';
import { Text, View } from 'react-native';
import { makeStyles } from '../../helpers/hooks/useTheme';
import { ITheme } from '../../assets/themes/mainTheme';

const useStyles = makeStyles((theme: ITheme) => ({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    ...theme.typography.titleM,
    textAlign: 'center',
    marginBottom: theme.spacing.spacing7,
  },
  placeholder: {
    width: theme.spacing.spacing7,
  },
  line: {
    borderBottomWidth: 1,
    borderColor: theme.palette.border.brandSecondary,
    position: 'absolute',
    height: 1,
    width: '105%',
    left: -theme.spacing.spacing7,
    bottom: 0,
  },
}));

type NavigationHeaderProps = {
  title: string;
  onBackNavigation: () => void;
};

const Header = ({ title, onBackNavigation }: NavigationHeaderProps) => {
  const styles = useStyles();
  return (
    <View style={styles.header}>
      <IconButton onPress={onBackNavigation}>
        <ChevronLeftIcon />
      </IconButton>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.placeholder} />
      <View style={styles.line} />
    </View>
  );
};

export default Header;
