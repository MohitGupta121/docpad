import React from 'react';
import { makeStyles } from '../../helpers/hooks/useTheme';
import { View, Text } from 'react-native';
import Modal from 'react-native-modal';
import { ITheme } from 'src/assets/themes/mainTheme';
import CloseIcon from '../../assets/icons/close.svg';
import { Button } from '../button';

const useStyles = makeStyles((theme: ITheme) => ({
  root: {
    ...theme.globalStyles.elevation,
    width: 816,
    maxHeight: 217,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    padding: theme.spacing.spacing10,
    justifyContent: 'none',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  iconWrapper: {
    backgroundColor: theme.palette.surface.negative,
    height: theme.spacing.spacing10,
    width: theme.spacing.spacing10,
    borderRadius: theme.spacing.spacing7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: theme.palette.icon.invert,
  },
  detailWrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: theme.spacing.spacing6,
  },
  errorTitle: {
    ...theme.typography.titleL,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing.spacing8,
  },
  description: {
    ...theme.typography.bodyL,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing.spacing8,
  },
  buttonsWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  primaryButton: {
    marginRight: theme.spacing.spacing8,
  },
}));

export interface IErrorDialog {
  isOpen: boolean;
  onClose: () => void;
  errorTitle: string;
  description: string;
  resolveButtonText: string;
  secondaryButtonText?: string;
  onSecondaryButtonClick?: () => void;
}

const ErrorDialog = ({
  isOpen,
  onClose,
  errorTitle,
  description,
  resolveButtonText,
  secondaryButtonText,
  onSecondaryButtonClick,
}: IErrorDialog) => {
  const styles = useStyles();

  return (
    <Modal isVisible={isOpen} style={styles.root}>
      <View style={styles.wrapper}>
        <View style={styles.iconWrapper}>
          <CloseIcon width={32} height={32} style={styles.icon} />
        </View>
        <View style={styles.detailWrapper}>
          <Text style={styles.errorTitle}>{errorTitle}</Text>
          <Text style={styles.description}>{description}</Text>
          <View style={styles.buttonsWrapper}>
            <Button style={styles.primaryButton} onPress={onClose}>
              {resolveButtonText}
            </Button>
            {!!secondaryButtonText && !!onSecondaryButtonClick && (
              <Button
                backgroundStyle="tertiary"
                onPress={onSecondaryButtonClick}
              >
                {secondaryButtonText}
              </Button>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ErrorDialog;
