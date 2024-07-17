import { View } from 'react-native';
import { MenuOption } from 'react-native-popup-menu';

import Checkbox from '../checkbox/checkbox';
import { ITheme } from '../../assets/themes/mainTheme';
import { makeStyles } from '../../helpers/hooks/useTheme';

const useStyles = makeStyles((theme: ITheme) => ({
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.spacing3,
    paddingVertical: theme.spacing.spacing3,
    borderBottomWidth: 1,
    borderBottomColor: theme.palette.border.grayInputDefault,
  },
  menuText: {
    marginLeft: -theme.spacing.spacing3,
  },
}));

interface MenuOptionProps {
  value?: any;
  text?: string;
  disabled?: boolean;
  disableTouchable?: boolean;
  selected?: boolean;

  onSelect(): any;
}

const MenuOptionCheckbox = ({
  selected,
  onSelect,
  ...rest
}: MenuOptionProps) => {
  const styles = useStyles();

  return (
    <View style={styles.optionContainer}>
      <Checkbox checked={selected} onChange={() => onSelect()} />
      <MenuOption {...rest} style={styles.menuText} />
    </View>
  );
};

export default MenuOptionCheckbox;
