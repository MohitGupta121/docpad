import React from 'react';
import { makeStyles, useTheme } from '../../helpers/hooks/useTheme';
import { TouchableOpacity, View, Text } from 'react-native';
import { ITheme } from 'src/assets/themes/mainTheme';
import CloseIcon from '../../assets/icons/close.svg';
import WarningIcon from '../../assets/icons/warning.svg';
import CheckIcon from '../../assets/icons/check.svg';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: ITheme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    padding: theme.spacing.spacing4,
    borderRadius: theme.spacing.spacing4,
    alignItems: 'center',
  },
  iconWrapper: {
    height: theme.spacing.spacing8,
    width: theme.spacing.spacing8,
    borderRadius: theme.spacing.spacing5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconColor: {
    color: theme.palette.icon.invert,
  },
  text: {
    ...theme.typography.titleM,
    marginLeft: theme.spacing.spacing4,
  },
  warningText: {
    color: theme.palette.text.attentionInlineNotification,
  },
  errorText: {
    color: theme.palette.text.negative,
  },
  callToActionWrapper: {
    marginLeft: 'auto',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  callToActionIcon: {
    color: theme.palette.icon.primary,
  },
  callToActionText: {
    ...theme.typography.bodyXS,
    marginLeft: theme.spacing.spacing2,
    color: theme.palette.text.primary,
  },
}));

export interface IInlineNotification {
  onClose: () => void;
  type: 'error' | 'warning';
  message: string;
  onAction?: () => void;
}

const InlineNotification = ({
  onClose,
  type,
  message,
  onAction,
}: IInlineNotification) => {
  const styles = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <View
      style={[
        styles.root,
        {
          backgroundColor:
            type === 'error'
              ? theme.palette.surface.negativeLightBackground
              : theme.palette.surface.attentionInlineNotificationBackground,
        },
      ]}
    >
      <TouchableOpacity
        onPress={onClose}
        style={[
          styles.iconWrapper,
          {
            backgroundColor:
              type === 'error'
                ? theme.palette.surface.negative
                : theme.palette.icon.attentionInlineNotification,
          },
        ]}
      >
        {type === 'error' ? (
          <CloseIcon
            width={theme.spacing.spacing6}
            height={theme.spacing.spacing6}
            style={styles.iconColor}
          />
        ) : (
          <WarningIcon
            width={theme.spacing.spacing6}
            height={theme.spacing.spacing6}
            style={styles.iconColor}
          />
        )}
      </TouchableOpacity>
      <Text
        style={[
          styles.text,
          type === 'error' ? styles.errorText : styles.warningText,
        ]}
      >
        {message}
      </Text>
      {onAction && (
        <TouchableOpacity onPress={onAction} style={styles.callToActionWrapper}>
          <CheckIcon style={styles.callToActionIcon} />
          <Text style={styles.callToActionText}>{t('buttons.ok')}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default InlineNotification;
