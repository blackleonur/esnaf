import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  Dimensions,
} from 'react-native';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import Apiurl from '../../Apiurl';

const {width, height} = Dimensions.get('window');

// İşletme verilerini tanımlayan tür
interface Business {
  id: string;
  businessName: string;
  businessAddress: string;
  businessPhone: string;
  businessEmail: string;
}

interface IndividualSeller {
  id: string;
  sellerFirstName: string;
  sellerLastName: string;
  sellerPhone: string;
}

// Navigasyon için Parametre Listesi
type RootStackParamList = {
  CategoriesScreen: {storeId: string};
  MarketScreen: undefined;
  SettingsScreen: undefined;
  FavsScreen: undefined;
  ProfileScreen: undefined;
  CampaignScreen: undefined;
};

// CategoriesScreen bileşeni için props türü
interface CategoriesScreenProps {
  navigation: NavigationProp<RootStackParamList, 'CategoriesScreen'>;
  route: RouteProp<RootStackParamList, 'CategoriesScreen'>;
}

const CategoriesScreen: React.FC<CategoriesScreenProps> = ({
  navigation,
  route,
}) => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [individualSellers, setIndividualSellers] = useState<
    IndividualSeller[]
  >([]);
  const [searchText, setSearchText] = useState('');
  const [filteredCategories, setFilteredCategories] = useState<
    (Business | IndividualSeller)[]
  >([]);
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  // İşletmeleri fetch eder
  useEffect(() => {
    fetchBusinesses(route.params.storeId);
  }, [route.params.storeId]);

  const fetchBusinesses = async (storeId: string) => {
    try {
      const response = await fetch(
        `${Apiurl}/api/Store/GetAllBusinessAndIndividualSeller/${storeId}`,
      );
      const data = await response.json();
      if (data.isSuccess) {
        setBusinesses(data.result.businesses || []);
        setIndividualSellers(data.result.individualSellers || []);
        setFilteredCategories([
          ...data.result.businesses,
          ...data.result.individualSellers,
        ]);
      }
    } catch (error) {
      console.error('Failed to fetch businesses:', error);
    }
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text) {
      const filtered = [...businesses, ...individualSellers].filter(item => {
        if ('businessName' in item) {
          return item.businessName.toLowerCase().includes(text.toLowerCase());
        } else {
          return item.sellerFirstName
            .toLowerCase()
            .includes(text.toLowerCase());
        }
      });
      setFilteredCategories(filtered);
    } else {
      setFilteredCategories([...businesses, ...individualSellers]);
    }
  };

  const renderItem = ({item}: {item: Business | IndividualSeller}) => {
    if ('businessName' in item) {
      // İşletme (Business) türündeki öğeyi göster
      return (
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate('MarketScreen', {ownerId: item.id} as any)
          }>
          <View style={styles.cardContainer}>
            <Image
              source={{uri: 'https://via.placeholder.com/100'}}
              style={styles.image}
            />
            <View style={styles.priceContainer}>
              <Text style={styles.cardTitle}>{item.businessName}</Text>
              <Text style={styles.priceText}>
                Adres: {item.businessAddress}
              </Text>
              <Text style={styles.priceText}>
                Telefon: {item.businessPhone}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    } else {
      // Bireysel Satıcı (IndividualSeller) türündeki öğeyi göster
      return (
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate('MarketScreen', {ownerId: item.id} as any)
          }>
          <View style={styles.cardContainer}>
            <Image
              source={{uri: 'https://via.placeholder.com/100'}}
              style={styles.image}
            />
            <View style={styles.priceContainer}>
              <Text style={styles.cardTitle}>
                {item.sellerFirstName} {item.sellerLastName}
              </Text>
              <Text style={styles.priceText}>Telefon: {item.sellerPhone}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  };

  return (
    <LinearGradient
      colors={['#FFFFFF', '#A6A6A6']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.FilterContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Ne arıyorsunuz?"
            value={searchText}
            onChangeText={handleSearch}
          />
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setFilterModalVisible(true)}>
            <Text style={styles.filterButtonText}>Filtrele</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={filteredCategories}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={1}
          contentContainerStyle={styles.list}
        />

        <Modal
          transparent={true}
          visible={filterModalVisible}
          animationType="slide"
          onRequestClose={() => setFilterModalVisible(false)}>
          <View style={styles.modalContainer}>{/* Filter options... */}</View>
        </Modal>

        {/* Footer */}
        <View style={styles.footer}>
          <FooterButton
            navigation={navigation}
            screen="SettingsScreen"
            icon="cog"
            label="Ayarlar"
          />
          <FooterButton
            navigation={navigation}
            screen="FavsScreen"
            icon="heart"
            label="Favoriler"
          />
          <FooterButton
            navigation={navigation}
            screen="ProfileScreen"
            icon="user"
            label="Profil"
          />
          <FooterButton
            navigation={navigation}
            screen="CampaignScreen"
            icon="tag"
            label="Kampanyalar"
          />
        </View>
      </View>
    </LinearGradient>
  );
};

const FooterButton = ({navigation, screen, icon, label}: any) => (
  <TouchableOpacity
    style={styles.footerButton}
    onPress={() => navigation.navigate(screen)}>
    <Icon name={icon} size={24} color="#F36117" style={{marginBottom: 2}} />
    <Text style={styles.footerButtonText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  FilterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.03,
    marginVertical: height * 0.015,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: width * 0.03,
    paddingHorizontal: width * 0.03,
    marginRight: width * 0.02,
    fontSize: width * 0.04,
    paddingBottom: width * 0.012,
    paddingTop: width * 0.012,
    height: height * 0.06,
  },
  filterButton: {
    backgroundColor: '#F36117',
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.02,
    borderRadius: width * 0.7,
    height: height * 0.06,
  },
  filterButtonText: {
    color: '#fff',
    fontSize: width * 0.03,
    fontWeight: 'bold',
  },
  list: {
    paddingBottom: height * 0.15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: width * 0.03,
    marginBottom: height * 0.02,
    marginHorizontal: width * 0.03,
    padding: width * 0.03,
    elevation: 2,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: width * 0.03,
  },
  priceContainer: {
    flex: 2,
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
  priceText: {
    fontSize: width * 0.03,
    color: '#333',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    padding: height * 0.015,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  footerButton: {
    alignItems: 'center',
  },
  footerButtonText: {
    fontSize: width * 0.03,
    color: '#F36117',
    marginTop: height * 0.005,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});

export default CategoriesScreen;
