import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Apiurl from '../../Apiurl';

const {width, height} = Dimensions.get('window');

interface Store {
  id: string;
  storeName: string;
}

interface HomeScreenProps {
  navigation: NavigationProp<any, any>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [categories, setCategories] = useState<Store[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Store[]>([]);

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const response = await fetch(`${Apiurl}/api/Store/GetAllStores`);
      const data = await response.json();
      if (data.isSuccess) {
        setCategories(data.result);
        setFilteredCategories(data.result);
      }
    } catch (error) {
      console.error('Failed to fetch stores:', error);
    }
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text) {
      const filtered = categories.filter(category =>
        category.storeName.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredCategories(filtered);
    } else {
      setFilteredCategories(categories);
    }
  };

  const renderItem = ({item}: {item: Store}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('CategoriesScreen', {storeId: item.id})
      }>
      <Image
        source={{uri: 'https://via.placeholder.com/100'}}
        style={styles.image}
      />
      <Text style={styles.cardTitle}>{item.storeName}</Text>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={['#FFFFFF', '#A6A6A6']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Image
            source={require('./../../images/Logo.png')}
            style={styles.logo}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Ne arıyorsunuz?"
            value={searchText}
            onChangeText={handleSearch}
          />
        </View>

        <FlatList
          data={filteredCategories}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
          contentContainerStyle={styles.list}
        />

        <View style={styles.footer}>
          <FooterButton
            navigation={navigation}
            screen="SettingsScreen"
            icon="settings"
            label="Ayarlar"
          />
          <FooterButton
            navigation={navigation}
            screen="CampaignScreen"
            icon="campaign"
            label="Kampanyalar"
          />
          <FooterButton
            navigation={navigation}
            screen="FavsScreen"
            icon="favorite"
            label="Favoriler"
          />
          <FooterButton
            navigation={navigation}
            screen="ProfileScreen"
            icon="person"
            label="Profil"
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
  list: {
    paddingHorizontal: width * 0.02,
  },
  card: {
    flex: 1,
    backgroundColor: '#FFFFF9',
    borderRadius: 10,
    borderColor: '#F36117',
    margin: width * 0.02,
    padding: width * 0.02,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 44},
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: width * 0.24,
    height: width * 0.16,
    borderRadius: 10,
    marginBottom: height * 0.02,
  },
  cardTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: height * 0.03,
  },
  logo: {
    width: width * 0.1, // Genişliği küçük tuttum
    height: width * 0.1,
    marginRight: 10, // Searchbar ile arasında boşluk
  },
  searchInput: {
    flex: 1,
    height: height * 0.06,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: width * 0.04,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: height * 0.02,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  footerButton: {
    alignItems: 'center',
  },
  footerButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
