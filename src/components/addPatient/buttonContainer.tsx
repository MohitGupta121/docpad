import { View } from 'react-native';
import { makeStyles } from '../../helpers/hooks/useTheme.ts';
import { ITheme } from '../../assets/themes/mainTheme';
import Button from '../button/button';

const useStyles = makeStyles((theme: ITheme) => ({
  buttonContainer: {
    marginTop: 'auto',
    backgroundColor: theme.palette.surface.primary,
    paddingHorizontal: theme.spacing.spacing7,
    paddingTop: theme.spacing.spacing6,
    paddingBottom: theme.spacing.spacing9,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: theme.spacing.spacing9,
  },
}));

type NavigationHeaderProps = {
  cancelButtonLabel: string;
  onCancel: () => void;
  confirmButtonLabel: string;
  onConfirm: () => void;
  confirmDisabled: boolean;
};

const ButtonContainer = ({
  cancelButtonLabel,
  onCancel,
  confirmButtonLabel,
  onConfirm,
  confirmDisabled,
}: NavigationHeaderProps) => {
  const styles = useStyles();
  return (
    <View style={styles.buttonContainer}>
      <Button backgroundStyle="tertiary" onPress={onCancel}>
        {cancelButtonLabel}
      </Button>
      <Button
        backgroundStyle="primary"
        onPress={onConfirm}
        disabled={confirmDisabled}
      >
        {confirmButtonLabel}
      </Button>
    </View>
  );
};

export default ButtonContainer;
