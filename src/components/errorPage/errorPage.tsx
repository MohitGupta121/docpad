import React from 'react';
import { makeStyles } from '../../helpers/hooks/useTheme';
import { Text, View } from 'react-native';
import { ITheme } from 'src/assets/themes/mainTheme';
import {
  ErrorType,
  useErrorPageOptions,
} from '../../constants/errorPageOptions';
import { useTranslation } from 'react-i18next';
import ChevronIcon from '../../assets/icons/chevronRight.svg';
import ArrowIcon from '../../assets/icons/arrowCounterClockwise.svg';
import { Button } from '../button';

const useStyles = makeStyles((theme: ITheme) => ({
  root: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  header: {
    ...theme.typography.titleXXL,
    color: theme.palette.text.primary,
    marginTop: theme.spacing.spacing10,
    marginBottom: theme.spacing.spacing8,
  },
  detail: {
    ...theme.typography.bodyL,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing.spacing4,
  },
  info: {
    ...theme.typography.bodyL,
    color: theme.palette.text.primary,
  },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: theme.spacing.spacing11,
  },
  primaryButton: {
    marginRight: theme.spacing.spacing6,
  },
  primaryButtonLabel: {
    ...theme.typography.titleXS,
    color: theme.palette.text.invert,
  },
  buttonIcon: {
    marginLeft: theme.spacing.spacing2,
    color: theme.palette.icon.invert,
  },
  secondaryButtonLabel: {
    ...theme.typography.titleXS,
    color: theme.palette.text.brandPrimary,
  },
  secondaryButtonIcon: {
    marginLeft: theme.spacing.spacing2,
    color: theme.palette.icon.brandPrimary,
  },
}));

export interface IErrorPage {
  onPrimaryButtonPress?: () => void;
  onReport?: () => void;
  primaryButtonText?: string;
  type: ErrorType;
}

const ErrorPage = ({
  onPrimaryButtonPress,
  onReport,
  primaryButtonText,
  type,
}: IErrorPage) => {
  const styles = useStyles();
  const { t } = useTranslation();
  const errorOptions = useErrorPageOptions();

  const getPrimaryButtonLabel = () => {
    if (type === 'construction' || type === 'cantBeReached') {
      return t('buttons.tryAgain');
    } else if (type === 'pageDoesntExist' || type === 'unableToShow') {
      return t('buttons.goHomepage');
    } else {
      return primaryButtonText;
    }
  };

  const getPrimaryButtonIcon = () => {
    if (type === 'construction' || type === 'cantBeReached') {
      return <ArrowIcon style={styles.buttonIcon} />;
    } else {
      return <ChevronIcon style={styles.buttonIcon} />;
    }
  };

  return (
    <View style={styles.root}>
      {errorOptions[type].icon}
      <Text style={styles.header}>{errorOptions[type].header}</Text>
      <Text style={styles.detail}>{errorOptions[type].detail}</Text>
      <Text style={styles.info}>{errorOptions[type].info}</Text>
      <View style={styles.buttonWrapper}>
        {type !== 'noRights' && !!onPrimaryButtonPress && (
          <View style={styles.primaryButton}>
            <Button onPress={onPrimaryButtonPress}>
              <Text style={styles.primaryButtonLabel}>
                {getPrimaryButtonLabel()}
              </Text>
              {getPrimaryButtonIcon()}
            </Button>
          </View>
        )}
        {type !== 'maintenance' && !!onReport && (
          <View>
            <Button backgroundStyle="secondary" onPress={onReport}>
              <Text style={styles.secondaryButtonLabel}>
                {t('buttons.reportError')}
              </Text>
              <ChevronIcon style={styles.secondaryButtonIcon} />
            </Button>
          </View>
        )}
      </View>
    </View>
  );
};

export default ErrorPage;
