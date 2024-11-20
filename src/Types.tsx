export type RootStackParamList = {
  WelcomeScreen: undefined;
  MarketScreen: {ownerId: string};
  FindScreen: undefined;
  BusinessEntryScreen: undefined;
  CustomerEntryScreen: undefined;
  NonBusinessEntryScreen: undefined;
  RegisterScreen: undefined;
  VerificationScreen: undefined;
  FavsScreen: undefined;
  ProfileScreen: undefined;
  SettingsScreen: undefined;
  CampaignScreen: undefined;
  HomeScreen: undefined;
  CategoriesScreen: {storeId: string};
  CommentScreen: {ownerId: string};
  BEntryScreen: undefined;
  BRegisterScreen: undefined;
  ContiuneRegisterScreen: undefined;
  BVerificiationScreen: undefined;
  PriceEntryScreen: undefined;
  BussinesHomeScreen: undefined;
  BussinesProfileScreen: undefined;
  AddresUpdateScreen: undefined;
  PastProjectsUpdateScreen: undefined;
  PriceUpdateScreen: undefined;
  BussinesSettingsScreen: undefined;
  EditCampaignScreen: undefined;
  AddCampaignScreen: undefined;
  BussinesCampaignScreen: undefined;
  NonBussinesRegisterScreen: undefined;
  NBVerificiationScreen: undefined;
  ContiuneNonRegisterScreen: undefined;
  NonPriceEntryScreen: undefined;
  NonBusinessHomeScreen: undefined;
  NonBussinesProfileScreen: undefined;
  NonBussinesCampaignScreen: undefined;
  BussinesServiceDetails: {serviceId: string};
  BussinesPendingDetailscreen: undefined;
  MeetingScreen: {
    ownerId: string;
    selectedServices: SelectedService[];
  };
  Try: undefined;
  NBEntryScreen: undefined;
  NBRegisterScreen: undefined;
  BusinessCompletedDetailsScreen: undefined;
  UserCompletedServices: {
    serviceId: string;
    bussinessId: string;
  };
  UserActivetedServices: {
    serviceId: string;
  };

  UserPendingServices: {
    serviceId: string;
  };
  UserPendingServicesArea: {
    serviceId: string;
  };
  UserActivetedServicesArea: {
    serviceId: string;
  };
  UserCompletedServicesArea: {
    serviceId: string;
    businessId: string;
  };
  NonBusinessPriceEntryScreen: {storeId: string};
  BussinesCompletedServicesArea: {
    serviceId: string;
  };
  BussinesPendingServicesArea: {
    serviceId: string;
  };
  BussinesActivitiedServicesArea: {
    serviceId: string;
  };
  BussinesPendingServiceDetails: {
    serviceId: string;
  };
  BussinesCompletedServiceDetails: {
    serviceId: string;
  };
  BussinesActivitiedServiceDetails: {
    serviceId: string;
  };
  BPendingServicesArea: {
    serviceId: string;
  };
  BCompletedServicesArea: {
    serviceId: string;
  };
  BActivitiedServicesArea: {
    serviceId: string;
  };
  BPendingServiceDetails: {
    serviceId: string;
  };
  BCompletedServiceDetails: {
    serviceId: string;
  };
  BActivitiedServiceDetails: {
    serviceId: string;
  };
  UserCommentScreen: {
    serviceId: string;
    businessId: string;
  };
  BussinesCommentScreen: undefined;
};

export type SelectedService = {
  pricingId: string;
  operationName: string;
  quantity: number;
  price: number;
};

// types.ts
