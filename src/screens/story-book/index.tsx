import { useTranslation } from 'react-i18next';
import { Button, SafeAreaView, Text, View } from 'react-native';
import Plus from '../../assets/icons/plus.svg';
import { ITheme } from '../../assets/themes/mainTheme';
import { IconButton } from '../../components/button';
import Checkbox from '../../components/checkbox/checkbox';
import Dropdown from '../../components/dropdown/dropdown';
import ErrorDialog from '../../components/errorDialog/errorDialog';
import InlineNotification from '../../components/inlineNotification/inlineNotification';
import RadioButtonGroup from '../../components/radioButtonGroup/radioButtonGroup';
import SearchInput from '../../components/textInputs/searchInput';
import DefaultTextInput from '../../components/textInputs/textInput';
import { useAuth } from '../../contextProviders/authContext';
import { makeStyles } from '../../helpers/hooks/useTheme';
import { handleChangePassword, onLogout } from '../../helpers/login/login';
import { navigate } from '../../navigation/RootNavigation';

const useStyles = makeStyles((theme: ITheme) => ({
  root: {
    backgroundColor: theme.palette.surface.appBackground,
    height: '100%',
  },
  box: {
    ...theme.globalStyles.elevation,
    margin: theme.spacing.spacing10,
  },
  text: {
    ...theme.typography.titleXXL,
    color: theme.palette.text.primary,
    padding: theme.spacing.spacing8,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
}));

export default function Storybook() {
  const { authToken } = useAuth();
  const styles = useStyles();
  const { t } = useTranslation();

  const handleLogout = async () => {
    await onLogout();
    navigate('LanguageSelection', { isAfterLogout: true });
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.box}>
        <Text style={styles.text}>{t('helloWorld')}</Text>
      </View>
      <InlineNotification type="error" onClose={() => {}} message={'Message'} />
      <ErrorDialog
        isOpen={false}
        onClose={() => {}}
        errorTitle={'Title'}
        description={'description'}
        resolveButtonText={'resolveButtonText'}
        secondaryButtonText="secondaryButtonText"
        onSecondaryButtonClick={() => {}}
      />
      <View style={styles.container}>
        <IconButton onPress={() => {}}>
          <Plus />
        </IconButton>
        <Checkbox
          onChange={() => {}}
          checked={true}
          isHistoryValue={false}
          disabled={false}
        />
        <RadioButtonGroup
          options={[
            {
              id: 1,
            },
            {
              id: 2,
            },
          ]}
          selectedOptionId={1}
          onChange={() => {}}
          isHistoryValue={false}
          disabled={false}
        />
        <DefaultTextInput
          onChange={() => {}}
          label={'Label'}
          placeholder={'Placeholder'}
          disabled={false}
          isExtended={true}
          isError
        />
        <SearchInput
          onChange={() => {}}
          disabled={false}
          placeholder={'placeholder'}
        />
        <Dropdown
          label={'Label'}
          options={[]}
          value={''}
          onChange={() => {}}
          disabled={false}
        />
        <View>
          <Button
            onPress={handleLogout}
            title={authToken ? 'Logout' : 'login'}
          />

          {authToken && (
            <Button onPress={handleChangePassword} title="Change Password" />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
