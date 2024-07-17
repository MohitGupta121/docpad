import { Text, View } from 'react-native';
import _ from 'lodash';

import { ITheme } from '../../assets/themes/mainTheme';
import { makeStyles } from '../../helpers/hooks/useTheme';
import Button from '../button/button';
import Chip from '../chip';
import { MenuOption } from './menu';

const useStyles = makeStyles((theme: ITheme) => ({
  selectedOptionsContainer: {
    paddingHorizontal: theme.spacing.spacing4,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.spacing4,
  },
  filterText: {
    ...theme.typography.titleXXS,
    color: theme.palette.text.tertiary,
    paddingVertical: theme.spacing.spacing4,
  },
}));

const SelectedOptions = ({
  options,
  selected,
  onRemove,
  onClear,
}: {
  options: MenuOption[];
  selected: string[];
  onRemove?: (option: string) => void;
  onClear?: () => void;
}) => {
  const styles = useStyles();

  return (
    <View style={styles.selectedOptionsContainer}>
      {!!selected.length && (
        <Text style={styles.filterText}>APPLIED FILTERS</Text>
      )}
      <View style={styles.chipsContainer}>
        {selected.map((option, index) => (
          <Chip
            key={index}
            onRemove={onRemove ? () => onRemove(option) : undefined}
          >
            {_.find(options, { value: option })?.label || option}
          </Chip>
        ))}
      </View>

      {!!onClear && selected.length > 1 && (
        <Button backgroundStyle="tertiary" onPress={onClear}>
          Clear all
        </Button>
      )}
    </View>
  );
};

export default SelectedOptions;
