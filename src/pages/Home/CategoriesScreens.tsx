import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import {NavigationProp} from '@react-navigation/native';

const categories = [
  {
    id: '1',
    name: 'Akbulut Halı Yıkama',
    image: 'https://bit.ly/47ysqZn',
    kesifucreti: ' m² -> 50 TL',
    koltukyıkamaucreti: '600 tl takım ',
    koltukyıkamaucreti2: '300 tl  tekli koltuk ',
    isNear: true,
    isCheaper: true,
    isFavs: false,
  },
  {
    id: '2',
    name: 'Mevsim Halı Yıkama',
    image: 'https://bit.ly/3zuH6Mw',
    kesifucreti: ' m² -> 50 TL',
    koltukyıkamaucreti: '600 tl takım ',
    koltukyıkamaucreti2: '300 tl  tekli koltuk ',
    kampanya: false,
    isNear: true,
    isCheaper: false,
    isFavs: false,
  },
  {
    id: '3',
    name: 'Yunus Halı Yıkama',
    image: 'https://bit.ly/3TEYTrd',
    kesifucreti: ' m² -> 50 TL',
    koltukyıkamaucreti: '600 tl takım ',
    koltukyıkamaucreti2: '300 tl  tekli koltuk ',
    kampanya: true,
    isNear: false,
    isCheaper: true,
    isFavs: true,
  },
  {
    id: '4',
    name: 'Kapir Halı Yıkama',
    image: 'https://bit.ly/4gz9nlE',
    kesifucreti: ' m² -> 50 TL',
    koltukyıkamaucreti: '600 tl takım ',
    koltukyıkamaucreti2: '300 tl  tekli koltuk ',
    kampanya: true,
    isNear: true,
    isCheaper: true,
    isFavs: true,
  },
  {
    id: '5',
    name: 'Sahan Halı Yıkama',
    image: 'https://bit.ly/4esYbG5',
    kesifucreti: ' m² -> 50 TL',
    koltukyıkamaucreti: '600 tl takım ',
    koltukyıkamaucreti2: '300 tl  tekli koltuk ',
    kampanya: false,
    isNear: false,
    isCheaper: true,
    isFavs: true,
  },
  {
    id: '6',
    name: 'Kepez Halı Yıkama',
    image: 'https://bit.ly/4exMA83',
    kesifucreti: ' m² -> 50 TL',
    koltukyıkamaucreti: '600 tl  ',
    koltukyıkamaucreti2: '300 tl   ',
    kampanya: false,
    isNear: true,
    isCheaper: false,
    isFavs: true,
  },
];

interface CategoriesScreenProps {
  navigation: NavigationProp<any, any>;
}

const CategoriesScreen: React.FC<CategoriesScreenProps> = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [filteredCategories, setFilteredCategories] = useState(categories);
  const filterByNear = () => {
    const filtered = categories.filter(category => category.isNear);
    setFilteredCategories(filtered);
  };

  const filterByCheaper = () => {
    const filtered = categories.filter(category => category.isCheaper);
    setFilteredCategories(filtered);
  };

  const filterByFavs = () => {
    const filtered = categories.filter(category => category.isFavs);
    setFilteredCategories(filtered);
  };

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
    item: {
      id: string;
      name: string;
      image: string;
      kesifucreti: string;
      koltukyıkamaucreti: string;
      koltukyıkamaucreti2: string;
      kampanya?: boolean;
      isNear: boolean;
      isCheaper: boolean;
      isFavs: boolean;
    };
  }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('MarketScreen')} // Navigate to FavsScreen when category is clicked
    >
      <View style={styles.cardContainer}>
        <View style={styles.imageContainer}>
          {/* Kampanya varsa göster */}
          {item.kampanya && (
            <Text style={styles.campaignText}>ŞOK KAMPANYA</Text>
          )}
          <Image source={{uri: item.image}} style={styles.image} />
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.priceText}>m2 ücreti: {item.kesifucreti}</Text>
          <Text style={styles.priceText}>
            Koltuk Takımı Yıkama: {item.koltukyıkamaucreti}
          </Text>
          <Text style={styles.priceText}>
            Tekli Koltuk Yıkama: {item.koltukyıkamaucreti2}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.FilterContainer}>
        {/* Arama Çubuğu ve Filtre Butonları */}

        <TextInput
          style={styles.searchInput}
          placeholder="Ne arıyorsunuz?"
          value={searchText}
          onChangeText={handleSearch} // Arama işlevi
        />
        <TouchableOpacity style={styles.filterButton} onPress={filterByNear}>
          <Text style={styles.filterButtonText}>Daha Yakın</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={filterByCheaper}>
          <Text style={styles.filterButtonText}>Daha Ucuz</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={filterByFavs}>
          <Text style={styles.filterButtonText}>En İyi</Text>
        </TouchableOpacity>
      </View>

      {/* Kategori Listesi */}
      <FlatList
        data={filteredCategories} // Filtrelenmiş listeyi göster
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={1} // 2 sütunlu görünüm
        contentContainerStyle={styles.list}
      />

      {/* Alt Menü (Footer) */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigation.navigate('SettingsScreen')} // Navigate to SettingsScreen
        >
          <Text style={styles.footerButtonText}>Ayarlar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigation.navigate('CampaignScreen')} // Navigate to CampaignScreen
        >
          <Text style={styles.footerButtonText}>Kampanyalar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigation.navigate('FavsScreen')} // Navigate to FavsScreen
        >
          <Text style={styles.footerButtonText}>Favoriler</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigation.navigate('ProfileScreen')} // Navigate to ProfileScreen
        >
          <Text style={styles.footerButtonText}>Profil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  list: {
    paddingHorizontal: 16,
  },
  card: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 8,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 10,
  },
  searchContainer: {
    margin: 20,
    flexDirection: 'row',
  },
  searchInput: {
    width: '30%',
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
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
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  footerButton: {
    alignItems: 'center',
  },
  footerButtonText: {
    fontSize: 12,
    color: '#FF6347', // Öne çıkan renk
  },
  campaignText: {
    color: 'red',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    alignSelf: 'center',
  },
  priceContainer: {
    padding: 17,
    flexDirection: 'column',
  },
  priceText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'justify',
  },
  cardContainer: {
    flexDirection: 'row',
  },
  imageContainer: {
    flexDirection: 'column',
    paddingLeft: 25,
    paddingRight: 5,
  },
  filterButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 20,
    flex: 1,
    padding: 2,
  },
  filterButtonText: {
    color: 'white',
    fontSize: 14,
    alignSelf: 'center',
  },
  FilterContainer: {
    flexDirection: 'row',
  },
});

export default CategoriesScreen;
