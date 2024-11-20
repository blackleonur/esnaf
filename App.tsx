import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import WelcomeScreen from './src/pages/BusinessScreen/WelcomeScreen';
import BusinessEntryScreen from './src/pages/BusinessScreen/BusinessEntryScreen';
import NonBusinessEntryScreen from './src/pages/BusinessScreen/NonBusinessEntryScreen';
import CustomerEntryScreen from './src/pages/CustomerScreen/EntryScreen/CustomerEntryScreen';
import HomeScreen from './src/pages/HomeScreen';
import RegisterScreen from './src/pages/RegisterScreen';
import VerificationScreen from './src/pages/CustomerScreen/RegisterScreens/VerificationScreen';
import FindScreen from './src/pages/Home/FindScreen';
import ProfileScreen from './src/pages/Home/BarScreens/ProfileScreen';
import FavsScreen from './src/pages/Home/BarScreens/FavsScreen';
import SettingsScreen from './src/pages/Home/BarScreens/SettingsScreen';
import CampaignScreen from './src/pages/Home/BarScreens/CampaignsScreen';
import CategoriesScreen from './src/pages/Home/CategoriesScreens';
import MarketScreen from './src/pages/Home/MarketsScreen/MarketScreen';
import CommentScreen from './src/pages/Home/MarketsScreen/CommentScreen';
import BEntryScreen from './src/pages/BusinessScreen/BEntryScreen';
import BRegisterScreen from './src/pages/BusinessScreen/BRegisterScreen';
import ContiuneRegisterScreen from './src/pages/BusinessScreen/ContiuneRegisterScreen';
import BVerificationScreen from './src/pages/BusinessScreen/BVerificationScreen';
import PriceEntryScreen from './src/pages/BusinessScreen/PriceEntryScreen';
import BusinessHomeScreen from './src/pages/BusinessScreen/BussinesHomeScreen';
import BussinesProfileScreen from './src/pages/BusinessScreen/BussinesProfileScreen';
import PastProjectsUpdateScreen from './src/pages/BusinessScreen/PastProjectsUpdateScreen';
import AddresUpdateScreen from './src/pages/BusinessScreen/AddresUpdateScreen';
import PriceUpdateScreen from './src/pages/BusinessScreen/PriceUpdateScreen';
import BussinesSettingsScreen from './src/pages/BusinessScreen/BussinesSettingsScreen';
import EditCampaignScreen from './src/pages/BusinessScreen/EditCampaignScreen';
import BussinesCampaignScreen from './src/pages/BusinessScreen/BussinesCampaignScreen';
import AddCampaignScreen from './src/pages/BusinessScreen/AddCampaignScreen';
import NonBussineRegisterScreen from './src/pages/BusinessScreen/NonBussinesRegisterScreen';
import NBVerificationScreen from './src/pages/BusinessScreen/SignScreens/NBVerificiationScreen';
import ContiuneNonRegisterScreen from './src/pages/BusinessScreen/ContiuneNonRegisterScreen';
import NonPriceEntryScreen from './src/pages/BusinessScreen/NonPriceEntryScreen';
import NonBussinesProfileScreen from './src/pages/BusinessScreen/SignScreens/NonBussinesProfileScreen';
import NonBussinesCampaignScreen from './src/pages/BusinessScreen/NonBussinesCampaignScreen';
import TryScreen from './src/pages/TryScreen';
import MeetingScreen from './src/pages/Home/MarketsScreen/MeetingScreen';
import {RootStackParamList} from './src/Types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import BussinesPendingServiceDetails from './src/pages/BusinessScreen/BussinesPendingServicesDetails';
import BussinesServiceDetails from './src/pages/BusinessScreen/BussinesServiceDetails';
import BusinessCompletedDetailsScreen from './src/pages/BusinessScreen/BusinessCompletedDetailsScreen';
import UserPendingServices from './src/pages/Home/BarScreens/UserPendingServices';
import UserCompletedServices from './src/pages/Home/BarScreens/UserCompletedServices';
import UserActivetedServices from './src/pages/Home/BarScreens/UserActivetedServices';
import UserActivetedServicesArea from './src/pages/Home/BarScreens/UserActivetedServicesArea';
import UserCompletedServicesArea from './src/pages/Home/BarScreens/UserCompletedServicesArea';
import UserPendingServicesArea from './src/pages/Home/BarScreens/UserPendingServicesArea';
import NonBusinessPriceEntryScreen from './src/pages/BusinessScreen/NonBusinessPriceEntryScreen';
import NonBusinessHomeScreen from './src/pages/BusinessScreen/NonBusinessHomeScreen';
import BussinesCompletedServicesArea from './src/pages/BusinessScreen/BussinesCompletedServicesArea';
import BussinesActivitiedServicesArea from './src/pages/BusinessScreen/BussinesActivitiedServicesArea';
import BussinesPendingServicesArea from './src/pages/BusinessScreen/BussinesPendingServicesArea';
import BussinesActivitiedServiceDetails from './src/pages/BusinessScreen/BussinesActivitiedServicesDetails';
import BussinesCompletedServiceDetails from './src/pages/BusinessScreen/BussinesCompletedServicesDetails';
import BActivitiedServiceDetails from './src/pages/BusinessScreen/BActivitiedServicesDetailScreen';
import BCompletedServiceDetails from './src/pages/BusinessScreen/BCompletedServicesDetailScreen';
import BPendingServiceDetails from './src/pages/BusinessScreen/BPendingServicesDetail';
import BActivitiedServicesArea from './src/pages/BusinessScreen/BActivitiedServicesArea';
import BCompletedServicesArea from './src/pages/BusinessScreen/BCompletedServicesArea';
import BPendingServicesArea from './src/pages/BusinessScreen/BPendingServicesArea';
import UserCommentScreen from './src/pages/Home/BarScreens/UserCommentScreen';
import BussinesCommentScreen from './src/pages/BusinessScreen/BussinesCommentScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{ headerShown: true, headerBackTitleVisible: false, headerTintColor: 'black', headerShadowVisible: false  }}>
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
