import { Text, TouchableOpacity, View } from 'react-native';
import { ITheme } from '../../assets/themes/mainTheme/index.ts';
import { makeStyles } from '../../helpers/hooks/useTheme.ts';
import Layout from '../../components/layout/layout.tsx';
import IconButton from '../../components/button/iconButton.tsx';
import { navigate } from '../../navigation/RootNavigation.tsx';
import ChevronLeftIcon from '../../assets/icons/chevronLeft.svg';
import { useTranslation } from 'react-i18next';
import { useCallback, useState } from 'react';
import TextInput from '../../components/textInputs/textInput.tsx';
import Button from '../../components/button/button.tsx';
import SaveIcon from '../../assets/icons/save.svg';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'src/navigation.tsx';
import ChevronDownIcon from '../../assets/icons/chevronDown.svg';
import Colors from '../../assets/themes/mainTheme/palette.ts';
import Menu from '../../components/menu/index.ts';

const useStyles = makeStyles((theme: ITheme) => ({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    ...theme.typography.titleM,
    textAlign: 'center',
    marginBottom: theme.spacing.spacing7,
  },
  titleMiddle: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  line: {
    borderBottomWidth: 1,
    borderColor: theme.palette.border.brandSecondary,
    position: 'absolute',
    height: 1,
    width: '105%',
    left: -theme.spacing.spacing7,
    bottom: 0,
  },
  infoText: {
    ...theme.typography.bodyL,
    color: theme.palette.text.primary,
    marginTop: theme.spacing.spacing8,
  },
  descriptionText: {
    ...theme.typography.bodyL,
    color: theme.palette.text.primary,
    marginTop: theme.spacing.spacing4,
  },
  selectContentWrapper: {
    ...theme.globalStyles.elevation,
    borderRadius: theme.spacing.spacing4,
    backgroundColor: theme.palette.surface.primary,
    marginTop: theme.spacing.spacing6,
    minHeight: 150,
    maxWidth: 300,
    padding: theme.spacing.spacing5,
  },
  cardHeadingText: {
    ...theme.typography.titleXS,
  },
  cardValueText: {
    ...theme.typography.bodyM,
  },
  nameWrapper: {
    flexDirection: 'row',
    paddingVertical: theme.spacing.spacing2,
  },
  departmentSelectWrapper: {
    ...theme.globalStyles.elevation,
    borderRadius: theme.spacing.spacing4,
    backgroundColor: theme.palette.surface.primary,
    marginTop: theme.spacing.spacing8,
    minHeight: 150,
  },
  tabWrapper: {
    flexDirection: 'row',
    height: 46,
  },
  tabButton: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: theme.palette.border.grayInputDefault,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTabButton: {
    borderBottomWidth: 1,
    borderBottomColor: theme.palette.text.brandPrimary,
  },
  buttonText: {
    ...theme.typography.titleXXS,
    fontWeight: 700,
    color: theme.palette.text.primary,
  },
  activeButtonText: {
    color: theme.palette.text.brandPrimary,
  },
  dropdownWrapper: {
    paddingTop: theme.spacing.spacing4,
    paddingBottom: theme.spacing.spacing6,
    paddingHorizontal: theme.spacing.spacing6,
  },
  dropdown: {
    marginBottom: theme.spacing.spacing4,
    zIndex: 1,
  },
  menuContent: {
    width: '100%',
    flexDirection: 'row',
    borderRadius: theme.spacing.spacing2,
    borderWidth: 1,
    borderColor: theme.palette.border.grayInputDefault,
    padding: theme.spacing.spacing5,
    justifyContent: 'center',
  },
  dropdownLabel: {
    ...theme.typography.bodySMediumWeight,
    paddingVertical: theme.spacing.spacing4,
    paddingHorizontal: theme.spacing.spacing5,
    fontWeight: 500,
    color: theme.palette.text.primary,
  },
  menuIcon: {
    marginLeft: 'auto',
  },
  placeholderText: {
    ...theme.typography.bodyM,
    color: theme.palette.text.inputPlaceholder,
  },
  textInputCounter: {
    ...theme.typography.bodySMediumWeight,
    marginTop: theme.spacing.spacing4,
    marginLeft: 'auto',
  },
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
  saveIcon: {
    marginRight: theme.spacing.spacing2,
    color: theme.palette.icon.invert,
  },
  disabledIcon: {
    color: theme.palette.icon.disabled,
  },
  saveButtonText: {
    ...theme.typography.titleXS,
    color: theme.palette.text.disabled,
  },
}));

type IEpisodeToRegularDoctorScreen = NativeStackScreenProps<
  RootStackParamList,
  'EpisodeToRegularDoctor'
>;

export default function EpisodeToRegularDoctor({
  route,
}: IEpisodeToRegularDoctorScreen) {
  const styles = useStyles();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('myDepartments');
  const [dropdownData, setDropdownData] = useState('');
  const [textInputData, setTextInputData] = useState<string | undefined>('');

  const handleTabChange = useCallback((isSame: boolean) => {
    setTextInputData('');
    setDropdownData('');
    setActiveTab(isSame ? 'myDepartments' : 'allDepartments');
  }, []);

  const isFormDataValid = useCallback(() => {
    if (activeTab === 'myDepartments') {
      return !!dropdownData;
    } else {
      return !!dropdownData && !!textInputData;
    }
  }, [activeTab, dropdownData, textInputData]);

  return (
    <>
      <Layout withoutSidebar>
        <View style={styles.header}>
          {!route.params.isAfterLogin && (
            <IconButton
              onPress={() => navigate('CurrentPatientList', undefined)}
            >
              <ChevronLeftIcon />
            </IconButton>
          )}
          <Text
            style={[
              styles.title,
              route.params.isAfterLogin && styles.titleMiddle,
            ]}
          >
            {t('episodeNotNeedSupervision.title')}
          </Text>
          <View style={styles.placeholder} />
          <View style={styles.line} />
        </View>

        <Text style={styles.infoText}>
          {t('episodeNotNeedSupervision.infoText')}
        </Text>

        <View style={styles.selectContentWrapper}>
          <View style={styles.nameWrapper}>
            <Text style={styles.cardHeadingText}>Name, Gender: </Text>
            <Text style={styles.cardValueText}>
              {'Leutheusser-Schnarrenberger,\n Sabine (W)'}
            </Text>
          </View>
          <View style={styles.nameWrapper}>
            <Text style={styles.cardHeadingText}>Age: </Text>
            <Text style={styles.cardValueText}>Age</Text>
          </View>
          <View style={styles.nameWrapper}>
            <Text style={styles.cardHeadingText}>Trigger For Visit: </Text>
            <Text style={styles.cardValueText}>Trigger For Visit</Text>
          </View>
          <View style={styles.nameWrapper}>
            <Text style={styles.cardHeadingText}>{'1\u00B0 - '}</Text>
            <Text style={styles.cardValueText} />
          </View>
          <View style={styles.nameWrapper}>
            <Text style={styles.cardHeadingText}>{'2\u00B0 - '}</Text>
            <Text style={styles.cardValueText} />
          </View>
        </View>
        <Text style={styles.descriptionText}>
          {t('episodeNotNeedSupervision.description')}
        </Text>
        <View style={styles.departmentSelectWrapper}>
          <View style={styles.tabWrapper}>
            <TouchableOpacity
              onPress={() => handleTabChange(true)}
              disabled={activeTab === 'myDepartments'}
              style={[
                styles.tabButton,
                activeTab === 'myDepartments' && styles.activeTabButton,
              ]}
            >
              <Text
                style={[
                  styles.buttonText,
                  activeTab === 'myDepartments' && styles.activeButtonText,
                ]}
              >
                {t('departmentChange.myDepartments')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleTabChange(false)}
              disabled={activeTab === 'allDepartments'}
              style={[
                styles.tabButton,
                activeTab === 'allDepartments' && styles.activeTabButton,
              ]}
            >
              <Text
                style={[
                  styles.buttonText,
                  activeTab === 'allDepartments' && styles.activeButtonText,
                ]}
              >
                {t('departmentChange.allDepartments')}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dropdownWrapper}>
            {activeTab === 'myDepartments' ? (
              <Menu
                options={[
                  { label: 'a', value: 'a' },
                  { label: 'b', value: 'b' },
                  { label: 'c', value: 'c' },
                ]}
                selected={[dropdownData]}
                onChange={(v) => setDropdownData(v[0])}
                allowSearch={true}
                optionsCustomWidth={{ width: 1108, marginTop: 80 }}
                searchProps={{
                  placeholder: t('departmentChange.search'),
                  isSearchFullWidth: true,
                }}
              >
                <View>
                  <Text style={styles.dropdownLabel}>
                    {t('departmentChange.department')}
                  </Text>
                  <View style={styles.menuContent}>
                    <Text
                      style={
                        dropdownData
                          ? styles.selectedText
                          : styles.placeholderText
                      }
                    >
                      {dropdownData
                        ? dropdownData
                        : t('general.selectPlaceholder')}
                    </Text>
                    <ChevronDownIcon
                      style={styles.menuIcon}
                      color={Colors.palette.icon.primary}
                    />
                  </View>
                </View>
              </Menu>
            ) : (
              <>
                <View style={styles.dropdown}>
                  <Menu
                    options={[
                      { label: 'a', value: 'a' },
                      { label: 'b', value: 'b' },
                      { label: 'c', value: 'c' },
                    ]}
                    selected={[dropdownData]}
                    onChange={(v) => setDropdownData(v[0])}
                    allowSearch={true}
                    optionsCustomWidth={{ width: 1108, marginTop: 80 }}
                    searchProps={{
                      placeholder: t('departmentChange.search'),
                      isSearchFullWidth: true,
                    }}
                  >
                    <View>
                      <Text style={styles.dropdownLabel}>
                        {t('departmentChange.department')}
                      </Text>
                      <View style={styles.menuContent}>
                        <Text
                          style={
                            dropdownData
                              ? styles.selectedText
                              : styles.placeholderText
                          }
                        >
                          {dropdownData
                            ? dropdownData
                            : t('general.selectPlaceholder')}
                        </Text>
                        <ChevronDownIcon
                          style={styles.menuIcon}
                          color={Colors.palette.icon.primary}
                        />
                      </View>
                    </View>
                  </Menu>
                </View>
                <TextInput
                  onChange={(value) => setTextInputData(value)}
                  label={t('departmentChange.switchExplanation')}
                  placeholder={t('general.addExplanation')}
                  fullWidth
                  isExtended
                  maxLength={200}
                />
                <Text
                  style={styles.textInputCounter}
                >{`${textInputData?.length}/200`}</Text>
              </>
            )}
          </View>
        </View>
      </Layout>
      <View style={styles.buttonContainer}>
        {!route.params.isAfterLogin && (
          <Button
            backgroundStyle="tertiary"
            onPress={() => navigate('CurrentPatientList', undefined)}
          >
            {t('buttons.cancel')}
          </Button>
        )}
        <Button
          backgroundStyle="primary"
          onPress={() => {}}
          disabled={!isFormDataValid()}
        >
          <SaveIcon
            style={[styles.saveIcon, !isFormDataValid() && styles.disabledIcon]}
          />
          <Text style={styles.saveButtonText}>{t('buttons.save')}</Text>
        </Button>
      </View>
    </>
  );
}
