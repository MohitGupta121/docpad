import { ITheme } from 'src/assets/themes/mainTheme';
import { makeStyles } from 'src/helpers/hooks/useTheme.ts';
import WrenchIcon from '../assets/icons/attributes.svg';
import SyncIssuesIcon from '../assets/icons/syncIssues.svg';
import NoAccessIcon from '../assets/icons/noAccess.svg';
import NotFoundIcon from '../assets/icons/404.svg';
import NoConnectionIcon from '../assets/icons/noConnection.svg';
import BrokenPartsIcon from '../assets/icons/brokenParts.svg';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: ITheme) => ({
  icon: {
    color: theme.palette.neutral['1000'],
  },
}));

export type ErrorType =
  | 'maintenance'
  | 'construction'
  | 'noRights'
  | 'pageDoesntExist'
  | 'cantBeReached'
  | 'unableToShow';

export const useErrorPageOptions = () => {
  const { t } = useTranslation();
  const styles = useStyles();
  return {
    maintenance: {
      header: t('errorPages.maintenance.header'),
      detail: t('errorPages.maintenance.detail'),
      info: t('errorPages.maintenance.info'),
      icon: <WrenchIcon width={100} height={100} style={styles.icon} />,
    },
    construction: {
      header: t('errorPages.construction.header'),
      detail: t('errorPages.construction.detail'),
      info: t('errorPages.construction.info'),
      icon: <SyncIssuesIcon width={100} height={100} style={styles.icon} />,
    },
    noRights: {
      header: t('errorPages.noRights.header'),
      detail: t('errorPages.noRights.detail'),
      info: t('errorPages.noRights.info'),
      icon: <NoAccessIcon width={100} height={100} style={styles.icon} />,
    },
    pageDoesntExist: {
      header: t('errorPages.pageDoesntExist.header'),
      detail: t('errorPages.pageDoesntExist.detail'),
      info: t('errorPages.pageDoesntExist.info'),
      icon: <NotFoundIcon width={100} height={100} style={styles.icon} />,
    },
    cantBeReached: {
      header: t('errorPages.cantBeReached.header'),
      detail: t('errorPages.cantBeReached.detail'),
      info: t('errorPages.cantBeReached.info'),
      icon: <NoConnectionIcon width={100} height={100} style={styles.icon} />,
    },
    unableToShow: {
      header: t('errorPages.unableToShow.header'),
      detail: t('errorPages.unableToShow.detail'),
      info: t('errorPages.unableToShow.info'),
      icon: <BrokenPartsIcon width={100} height={100} style={styles.icon} />,
    },
  };
};
