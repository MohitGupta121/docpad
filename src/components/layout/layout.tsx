import { ReactNode } from 'react';
import { SafeAreaView, View } from 'react-native';

import { ITheme } from './../../assets/themes/mainTheme';
import { makeStyles } from './../../helpers/hooks/useTheme';

import Sidebar from '../sidebar';

const useStyles = makeStyles((theme: ITheme) => ({
  root: {
    backgroundColor: theme.palette.surface.appBackground,
    height: '100%',
    flexDirection: 'row',
  },
  main: {
    height: '95%',
    width: '95%',
    position: 'absolute',
    right: 0,
    padding: theme.spacing.spacing7,
    backgroundColor: theme.palette.surface.appBackground,
    gap: theme.spacing.spacing6,
    marginTop: theme.spacing.spacing4,
  },
  fullWidth: {
    width: '100%',
  },
  noPadding: {
    padding: 0,
    paddingTop: theme.spacing.spacing7,
    gap: 0,
  },
  whiteBackground: {
    backgroundColor: theme.palette.surface.primary,
  },
}));

const Layout = ({
  withoutSidebar,
  children,
  isWithoutPadding,
  isBackgroundWhite,
}: {
  withoutSidebar?: boolean;
  children: ReactNode;
  isWithoutPadding?: boolean;
  isBackgroundWhite?: boolean;
}) => {
  const styles = useStyles();

  return (
    <>
      {!withoutSidebar && <Sidebar />}
      <SafeAreaView
        style={[styles.root, isBackgroundWhite && styles.whiteBackground]}
      >
        <View
          style={[
            styles.main,
            withoutSidebar && styles.fullWidth,
            isWithoutPadding && styles.noPadding,
            isBackgroundWhite && styles.whiteBackground,
          ]}
        >
          {children}
        </View>
      </SafeAreaView>
    </>
  );
};

export default Layout;
