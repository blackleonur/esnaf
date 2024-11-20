import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import WelcomeScreen from './pages/BusinessScreen/WelcomeScreen';
import BusinessEntryScreen from './pages/BusinessScreen/BusinessEntryScreen';
import NonBusinessEntryScreen from './pages/BusinessScreen/NonBusinessEntryScreen';
import CustomerEntryScreen from './pages/CustomerScreen/EntryScreen/CustomerEntryScreen';
import HomeScreen from './pages/HomeScreen';
import RegisterScreen from './pages/RegisterScreen';
import VerificationScreen from './pages/CustomerScreen/RegisterScreens/VerificationScreen';
import FindScreen from './pages/Home/FindScreen';
import ProfileScreen from './pages/Home/BarScreens/ProfileScreen';
import FavsScreen from './pages/Home/BarScreens/FavsScreen';
import SettingsScreen from './pages/Home/BarScreens/SettingsScreen';
import CampaignScreen from './pages/Home/BarScreens/CampaignsScreen';
import CategoriesScreen from './pages/Home/CategoriesScreens';
import MarketScreen from './pages/Home/MarketsScreen/MarketScreen';
import CommentScreen from './pages/Home/MarketsScreen/CommentScreen';
import BEntryScreen from './pages/BusinessScreen/BEntryScreen';
import BRegisterScreen from './pages/BusinessScreen/BRegisterScreen';
import ContiuneRegisterScreen from './pages/BusinessScreen/ContiuneRegisterScreen';
import BVerificationScreen from './pages/BusinessScreen/BVerificationScreen';
import PriceEntryScreen from './pages/BusinessScreen/PriceEntryScreen';
import BusinessHomeScreen from './pages/BusinessScreen/BussinesHomeScreen';
import BussinesProfileScreen from './pages/BusinessScreen/BussinesProfileScreen';
import PastProjectsUpdateScreen from './pages/BusinessScreen/PastProjectsUpdateScreen';
import AddresUpdateScreen from './pages/BusinessScreen/AddresUpdateScreen';
import PriceUpdateScreen from './pages/BusinessScreen/PriceUpdateScreen';
import BussinesSettingsScreen from './pages/BusinessScreen/BussinesSettingsScreen';
import EditCampaignScreen from './pages/BusinessScreen/EditCampaignScreen';
import BussinesCampaignScreen from './pages/BusinessScreen/BussinesCampaignScreen';
import AddCampaignScreen from './pages/BusinessScreen/AddCampaignScreen';
import NonBussineRegisterScreen from './pages/BusinessScreen/NonBussinesRegisterScreen';
import NBVerificationScreen from './pages/BusinessScreen/SignScreens/NBVerificiationScreen';
import ContiuneNonRegisterScreen from './pages/BusinessScreen/ContiuneNonRegisterScreen';
import NonPriceEntryScreen from './pages/BusinessScreen/NonPriceEntryScreen';
import NonBussinesProfileScreen from './pages/BusinessScreen/SignScreens/NonBussinesProfileScreen';
import NonBussinesCampaignScreen from './pages/BusinessScreen/NonBussinesCampaignScreen';
import TryScreen from './pages/TryScreen';
import MeetingScreen from './pages/Home/MarketsScreen/MeetingScreen';
import {RootStackParamList} from './types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import BussinesPendingServiceDetails from './pages/BusinessScreen/BussinesPendingServicesDetails';
import BussinesServiceDetails from './pages/BusinessScreen/BussinesServiceDetails';
import BusinessCompletedDetailsScreen from './pages/BusinessScreen/BusinessCompletedDetailsScreen';
import UserPendingServices from './pages/Home/BarScreens/UserPendingServices';
import UserCompletedServices from './pages/Home/BarScreens/UserCompletedServices';
import UserActivetedServices from './pages/Home/BarScreens/UserActivetedServices';
import UserActivetedServicesArea from './pages/Home/BarScreens/UserActivetedServicesArea';
import UserCompletedServicesArea from './pages/Home/BarScreens/UserCompletedServicesArea';
import UserPendingServicesArea from './pages/Home/BarScreens/UserPendingServicesArea';
import NonBusinessPriceEntryScreen from './pages/BusinessScreen/NonBusinessPriceEntryScreen';
import NonBusinessHomeScreen from './pages/BusinessScreen/NonBusinessHomeScreen';
import BussinesCompletedServicesArea from './pages/BusinessScreen/BussinesCompletedServicesArea';
import BussinesActivitiedServicesArea from './pages/BusinessScreen/BussinesActivitiedServicesArea';
import BussinesPendingServicesArea from './pages/BusinessScreen/BussinesPendingServicesArea';
import BussinesActivitiedServiceDetails from './pages/BusinessScreen/BussinesActivitiedServicesDetails';
import BussinesCompletedServiceDetails from './pages/BusinessScreen/BussinesCompletedServicesDetails';
import BActivitiedServiceDetails from './pages/BusinessScreen/BActivitiedServicesDetailScreen';
import BCompletedServiceDetails from './pages/BusinessScreen/BCompletedServicesDetailScreen';
import BPendingServiceDetails from './pages/BusinessScreen/BPendingServicesDetail';
import BActivitiedServicesArea from './pages/BusinessScreen/BActivitiedServicesArea';
import BCompletedServicesArea from './pages/BusinessScreen/BCompletedServicesArea';
import BPendingServicesArea from './pages/BusinessScreen/BPendingServicesArea';
import UserCommentScreen from './pages/Home/BarScreens/UserCommentScreen';
import BussinesCommentScreen from './pages/BusinessScreen/BussinesCommentScreen';

type CategoriesScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'CategoriesScreen'
>;

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{headerShown: true}}>
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="MarketScreen" component={MarketScreen} />
        <Stack.Screen name="FindScreen" component={FindScreen} />
        <Stack.Screen name="MeetingScreen" component={MeetingScreen} />
        <Stack.Screen
          name="BusinessEntryScreen"
          component={BusinessEntryScreen}
        />
        <Stack.Screen
          name="CustomerEntryScreen"
          component={CustomerEntryScreen}
        />
        <Stack.Screen
          name="NonBusinessEntryScreen"
          component={NonBusinessEntryScreen}
        />
        <Stack.Screen
          name="BussinesActivitiedServiceDetails"
          component={BussinesActivitiedServiceDetails}
        />
        <Stack.Screen
          name="BussinesCompletedServiceDetails"
          component={BussinesCompletedServiceDetails}
        />

        <Stack.Screen
          name="BussinesServiceDetails"
          component={BussinesServiceDetails}
        />
        <Stack.Screen
          name="BusinessCompletedDetailsScreen"
          component={BusinessCompletedDetailsScreen}
        />
        <Stack.Screen
          name="BussinesPendingServiceDetails"
          component={BussinesPendingServiceDetails}
        />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen
          name="VerificationScreen"
          component={VerificationScreen}
        />
        <Stack.Screen name="FavsScreen" component={FavsScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen
          name="UserPendingServicesArea"
          component={UserPendingServicesArea}
          initialParams={{serviceId: ''}}
        />
        <Stack.Screen
          name="UserCompletedServicesArea"
          component={UserCompletedServicesArea}
          initialParams={{serviceId: ''}}
        />
        <Stack.Screen
          name="UserActivetedServicesArea"
          component={UserActivetedServicesArea}
          initialParams={{serviceId: ''}}
        />
        <Stack.Screen
          name="UserActivetedServices"
          component={UserActivetedServices}
        />
        <Stack.Screen
          name="UserCompletedServices"
          component={UserCompletedServices}
          initialParams={{serviceId: ''}}
        />
        <Stack.Screen
          name="UserPendingServices"
          component={UserPendingServices}
        />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="CampaignScreen" component={CampaignScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen
          name="CategoriesScreen"
          component={CategoriesScreen}
          options={{title: 'Categories'}}
          initialParams={{storeId: 'default-store-id'}}
        />
        <Stack.Screen name="BEntryScreen" component={BEntryScreen} />
        <Stack.Screen name="BRegisterScreen" component={BRegisterScreen} />
        <Stack.Screen
          name="ContiuneRegisterScreen"
          component={ContiuneRegisterScreen}
        />
        <Stack.Screen
          name="BVerificiationScreen"
          component={BVerificationScreen}
        />
        <Stack.Screen name="PriceEntryScreen" component={PriceEntryScreen} />
        <Stack.Screen
          name="BussinesHomeScreen"
          component={BusinessHomeScreen}
        />
        <Stack.Screen
          name="BussinesProfileScreen"
          component={BussinesProfileScreen}
        />
        <Stack.Screen
          name="AddresUpdateScreen"
          component={AddresUpdateScreen}
        />
        <Stack.Screen
          name="PastProjectsUpdateScreen"
          component={PastProjectsUpdateScreen}
        />
        <Stack.Screen name="PriceUpdateScreen" component={PriceUpdateScreen} />
        <Stack.Screen
          name="BussinesSettingsScreen"
          component={BussinesSettingsScreen}
        />
        <Stack.Screen
          name="EditCampaignScreen"
          component={EditCampaignScreen}
        />
        <Stack.Screen name="AddCampaignScreen" component={AddCampaignScreen} />
        <Stack.Screen
          name="BussinesCampaignScreen"
          component={BussinesCampaignScreen}
        />
        <Stack.Screen
          name="NonBussinesRegisterScreen"
          component={NonBussineRegisterScreen}
        />
        <Stack.Screen
          name="NonBusinessPriceEntryScreen"
          component={NonBusinessPriceEntryScreen}
        />

        <Stack.Screen
          name="NBVerificiationScreen"
          component={NBVerificationScreen}
        />
        <Stack.Screen
          name="ContiuneNonRegisterScreen"
          component={ContiuneNonRegisterScreen}
        />
        <Stack.Screen
          name="NonPriceEntryScreen"
          component={NonPriceEntryScreen}
        />
        <Stack.Screen
          name="NonBusinessHomeScreen"
          component={NonBusinessHomeScreen}
        />
        <Stack.Screen
          name="NonBussinesProfileScreen"
          component={NonBussinesProfileScreen}
        />
        <Stack.Screen
          name="NonBussinesCampaignScreen"
          component={NonBussinesCampaignScreen}
        />
        <Stack.Screen
          name="BussinesPendingServicesArea"
          component={BussinesPendingServicesArea}
        />
        <Stack.Screen
          name="BussinesActivitiedServicesArea"
          component={BussinesActivitiedServicesArea}
        />
        <Stack.Screen
          name="BussinesCompletedServicesArea"
          component={BussinesCompletedServicesArea}
        />
        <Stack.Screen
          name="BCompletedServicesArea"
          component={BCompletedServicesArea}
        />
        <Stack.Screen
          name="BPendingServicesArea"
          component={BPendingServicesArea}
        />
        <Stack.Screen
          name="BActivitiedServicesArea"
          component={BActivitiedServicesArea}
        />

        <Stack.Screen
          name="BCompletedServiceDetails"
          component={BCompletedServiceDetails}
        />
        <Stack.Screen
          name="BPendingServiceDetails"
          component={BPendingServiceDetails}
        />
        <Stack.Screen
          name="BActivitiedServiceDetails"
          component={BActivitiedServiceDetails}
        />
        <Stack.Screen
          name="UserCommentScreen"
          component={UserCommentScreen}
          initialParams={{serviceId: '', businessId: ''}}
        />
        <Stack.Screen name="CommentScreen" component={CommentScreen} />
        <Stack.Screen
          name="BussinesCommentScreen"
          component={BussinesCommentScreen}
        />

        <Stack.Screen name="Try" component={TryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
