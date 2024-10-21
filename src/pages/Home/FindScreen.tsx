import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
  Platform,
} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import MaterialIcons

const {width, height} = Dimensions.get('window');

const categories = [
  {id: '1', name: 'Elektrikçi', image: 'https://bit.ly/47ysqZn'},
  {id: '2', name: 'Marangoz', image: 'https://bit.ly/3zuH6Mw'},
  {id: '3', name: 'Temizlikçi', image: 'https://bit.ly/3TEYTrd'},
  {id: '4', name: 'Halı yıkamacı', image: 'https://bit.ly/4gz9nlE'},
  {id: '5', name: 'Tesisatçı', image: 'https://bit.ly/4esYbG5'},
  {id: '6', name: 'Bayan kuaförü', image: 'https://bit.ly/4exMA83'},
];

interface HomeScreenProps {
  navigation: NavigationProp<any, any>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [filteredCategories, setFilteredCategories] = useState(categories);

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text) {
      const filtered = categories.filter(category =>
        category.name.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredCategories(filtered);
    } else {
      setFilteredCategories(categories);
    }
  };

  const renderItem = ({
    item,
  }: {
    item: {id: string; name: string; image: string};
  }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('CategoriesScreen')}>
      <Image source={{uri: item.image}} style={styles.image} />
      <Text style={styles.cardTitle}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={['#FFFFFF', '#A6A6A6']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={{flex: 1}}>
      <View style={styles.container}>
        {/* Arama Çubuğu ve Görsel */}
        <View style={styles.searchContainer}>
          <Image
            source={require('./../../images/Logo.png')} // Görselin yolu buraya
            style={styles.logo}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Ne arıyorsunuz?"
            value={searchText}
            onChangeText={handleSearch} // Arama işlevi
          />
        </View>

        {/* Kategori Listesi */}
        <FlatList
          data={filteredCategories}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
          contentContainerStyle={styles.list}
        />

        {/* Alt Menü (Footer) */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.footerButton}
            onPress={() => navigation.navigate('SettingsScreen')}>
            <Icon
              name="settings"
              size={24}
              color="#F36117"
              style={{marginBottom: 2}}
            />
            <Text style={styles.footerButtonText}>Ayarlar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.footerButton}
            onPress={() => navigation.navigate('CampaignScreen')}>
            <Icon
              name="campaign"
              size={24}
              color="#F36117"
              style={{marginBottom: 2}}
            />
            <Text style={styles.footerButtonText}>Kampanyalar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.footerButton}
            onPress={() => navigation.navigate('FavsScreen')}>
            <Icon
              name="favorite"
              size={24}
              color="#F36117"
              style={{marginBottom: 2}}
            />
            <Text style={styles.footerButtonText}>Favoriler</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.footerButton}
            onPress={() => navigation.navigate('ProfileScreen')}>
            <Icon
              name="person"
              size={24}
              color="#F36117"
              style={{marginBottom: 2}}
            />
            <Text style={styles.footerButtonText}>Profil</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

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
