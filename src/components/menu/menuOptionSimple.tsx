import { Text, View } from 'react-native';
import { MenuOption } from 'react-native-popup-menu';

import CheckIcon from '../../assets/icons/check.svg';
import { ITheme } from '../../assets/themes/mainTheme';
import { makeStyles } from '../../helpers/hooks/useTheme';
import Colors from '../../assets/themes/mainTheme/palette';

const useStyles = makeStyles((theme: ITheme) => ({
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.spacing4,
    paddingVertical: theme.spacing.spacing3,
    borderBottomWidth: 1,
    borderBottomColor: theme.palette.border.grayInputDefault,
    minHeight: 35,
  },
  selectedOptionContainer: {
    backgroundColor: theme.palette.border.grayInputDefault,
  },
  optionText: {
    fontSize: 12,
  },
}));

interface MenuOptionProps {
  value?: any;
  text?: string;
  disabled?: boolean;
  disableTouchable?: boolean;
  selected?: boolean;

  onSelect?(): any;
}

const MenuOptionSimple = ({ selected, text, ...rest }: MenuOptionProps) => {
  const styles = useStyles();

  return (
    <View style={{}}>
      <MenuOption
        {...rest}
        style={[
          styles.optionContainer,
          selected ? styles.selectedOptionContainer : null,
        ]}
      >
        <Text style={styles.optionText}>{text}</Text>
        {!!selected && <CheckIcon color={Colors.palette.icon.positive} />}
      </MenuOption>
    </View>
  );
};

export default MenuOptionSimple;
