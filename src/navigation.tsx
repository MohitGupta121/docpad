import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef } from './navigation/RootNavigation';

import AddPatientScreen from './screens/addPatient/addPatientScreen';
import LoadingPatientsScreen from './screens/addPatient/loadingScreen';
import PatientSearchResults from './screens/addPatient/patientSearchResults';
import EpisodeNotNeedSupervision from './screens/assigningEpisode/episodeNotNeedSupervision';
import EpisodeToRegularDoctor from './screens/assigningEpisode/episodeToRegularDoctor';
import CurrentPatientList from './screens/currentPatientList/currentPatientList';
import DepartmentSelectScreen from './screens/departmentSelect/departmentSelect';
import DiagnosticMatrix from './screens/diagnosticMatrix/diagnosticMatrix';
import DoctorDashboard from './screens/doctorDashboard/doctorDashboard';
import ForgotPassword from './screens/forgotPassword';
import CheckYourInbox from './screens/forgotPassword/checkYourInbox';
import LanguageSelection from './screens/languageSelection';
import LoginScreen from './screens/login';
import DetailsOverview from './screens/patientDashboard/detailsOverview';
import DetailsScreen from './screens/patientDashboard/detailsScreen';
import PatientDashboard from './screens/patientDashboard/patientDashboard';
import SettingScreen from './screens/setting/settingScreen';
import SplashScreen from './screens/splashScreen';
import Storybook from './screens/story-book';
import WelcomeScreen from './screens/welcomeScreen';

export type RootStackParamList = {
  Login: undefined;
  SplashScreen: undefined;
  DoctorDashboard: undefined;
  StoryBook: undefined;
  LanguageSelection: { isAfterLogout: boolean };
  Welcome: undefined;
  ForgotPassword: undefined;
  CheckYourInbox: undefined;
  AddPatient: undefined;
  LoadingPatients: undefined;
  DepartmentSelect: { isAfterLogin: boolean };
  PatientSearchResults: { errorMsg?: string; healthInsuranceNumber?: string };
  PatientDashboard: { patientId: string };
  DetailsOverview: { title: string };
  DetailsScreen: { title: string };
  SettingScreen: undefined;
  CurrentPatientList: undefined;
  EpisodeNotNeedSupervision: { isAfterLogin: boolean };
  EpisodeToRegularDoctor: { isAfterLogin: boolean };
  DiagnosticMatrix: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="LanguageSelection"
          component={LanguageSelection}
          initialParams={{ isAfterLogout: false }}
        />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="CheckYourInbox" component={CheckYourInbox} />
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="DoctorDashboard" component={DoctorDashboard} />
        <Stack.Screen name="AddPatient" component={AddPatientScreen} />
        <Stack.Screen
          name="LoadingPatients"
          component={LoadingPatientsScreen}
        />
        <Stack.Screen
          name="PatientSearchResults"
          component={PatientSearchResults}
          initialParams={{ errorMsg: '' }}
        />
        <Stack.Screen
          name="PatientDashboard"
          component={PatientDashboard}
          initialParams={{ patientId: '' }}
        />
        <Stack.Screen
          name="DetailsOverview"
          component={DetailsOverview}
          initialParams={{ title: '' }}
        />
        <Stack.Screen
          name="DetailsScreen"
          component={DetailsScreen}
          initialParams={{ title: '' }}
        />

        <Stack.Screen
          name="DepartmentSelect"
          initialParams={{ isAfterLogin: false }}
          component={DepartmentSelectScreen}
        />
        <Stack.Screen name="SettingScreen" component={SettingScreen} />
        <Stack.Screen
          name="CurrentPatientList"
          component={CurrentPatientList}
        />
        <Stack.Screen
          name="EpisodeNotNeedSupervision"
          initialParams={{ isAfterLogin: false }}
          component={EpisodeNotNeedSupervision}
        />
        <Stack.Screen
          name="EpisodeToRegularDoctor"
          initialParams={{ isAfterLogin: false }}
          component={EpisodeToRegularDoctor}
        />
        <Stack.Screen name="DiagnosticMatrix" component={DiagnosticMatrix} />
        <Stack.Screen name="StoryBook" component={Storybook} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
