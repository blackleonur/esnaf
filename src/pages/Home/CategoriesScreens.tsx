import React, {useState} from 'react';
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
import {NavigationProp} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // FontAwesome ikonlar
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');

const categories = [
  {
    id: '1',
    name: 'Akbulut Halı Yıkama',
    image: 'https://bit.ly/47ysqZn',
    kesifucreti: 'm² -> 50 TL',
    koltukyıkamaucreti: '600 TL takım',
    koltukyıkamaucreti2: '300 TL tekli koltuk',
    isNear: true,
    isCheaper: true,
    isFavs: false,
    kampanya: true,
  },
  {
    id: '2',
    name: 'Mevsim Halı Yıkama',
    image: 'https://bit.ly/3zuH6Mw',
    kesifucreti: 'm² -> 50 TL',
    koltukyıkamaucreti: '600 TL takım',
    koltukyıkamaucreti2: '300 TL tekli koltuk',
    kampanya: false,
    isNear: true,
    isCheaper: false,
    isFavs: false,
  },
  {
    id: '3',
    name: 'Yunus Halı Yıkama',
    image: 'https://bit.ly/3TEYTrd',
    kesifucreti: 'm² -> 50 TL',
    koltukyıkamaucreti: '600 TL takım',
    koltukyıkamaucreti2: '300 TL tekli koltuk',
    kampanya: true,
    isNear: false,
    isCheaper: true,
    isFavs: true,
  },
  {
    id: '4',
    name: 'Kapir Halı Yıkama',
    image: 'https://bit.ly/4gz9nlE',
    kesifucreti: 'm² -> 50 TL',
    koltukyıkamaucreti: '600 TL takım',
    koltukyıkamaucreti2: '300 TL tekli koltuk',
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
  const [filterModalVisible, setFilterModalVisible] = useState(false);

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

  const filterByNear = () => {
    const filtered = categories.filter(category => category.isNear);
    setFilteredCategories(filtered);
    setFilterModalVisible(false);
  };

  const filterByCheaper = () => {
    const filtered = categories.filter(category => category.isCheaper);
    setFilteredCategories(filtered);
    setFilterModalVisible(false);
  };

  const filterByFavs = () => {
    const filtered = categories.filter(category => category.isFavs);
    setFilteredCategories(filtered);
    setFilterModalVisible(false);
  };

  const filterByCampaign = () => {
    const filtered = categories.filter(category => category.kampanya);
    setFilteredCategories(filtered);
    setFilterModalVisible(false);
  };

  const clearFilters = () => {
    setFilteredCategories(categories);
    setFilterModalVisible(false);
  };

  const renderItem = (item: {
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
  }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('MarketScreen')}>
      <View style={styles.cardContainer}>
        <View style={styles.imageContainer}>
          <Image source={{uri: item.image}} style={styles.image} />
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.priceText}>m² ücreti: {item.kesifucreti}</Text>
          <Text style={styles.priceText}>
            Koltuk Takımı Yıkama: {item.koltukyıkamaucreti}
          </Text>
          <Text style={styles.priceText}>
            Tekli Koltuk Yıkama: {item.koltukyıkamaucreti2}
          </Text>
        </View>
        {/* ŞOK KAMPANYA */}
        {item.kampanya && (
          <View style={styles.kampanyaBadgeContainer}>
            <Text style={styles.kampanyaBadgeText}>ŞOK KAMPANYA</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={['#FFFFFF', '#A6A6A6']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.gradientContainer}>
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
          renderItem={({item}) => renderItem(item)}
          keyExtractor={item => item.id}
          numColumns={1}
          contentContainerStyle={styles.list}
        />

        <Modal
          transparent={true}
          visible={filterModalVisible}
          animationType="slide"
          onRequestClose={() => setFilterModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={filterByNear}>
                <Text style={styles.modalButtonText}>Daha Yakın</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={filterByCheaper}>
                <Text style={styles.modalButtonText}>Daha Ucuz</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={filterByFavs}>
                <Text style={styles.modalButtonText}>En İyi</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={filterByCampaign}>
                <Text style={styles.modalButtonText}>Kampanyalı Dükkanlar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={clearFilters}>
                <Text style={styles.modalButtonText}>Filtreleri Kaldır</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Tab Screen Butonları */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.footerButton}
            onPress={() => navigation.navigate('SettingsScreen')}>
            <Icon name="cog" size={width * 0.05} color="#F36117" />
            <Text style={styles.footerButtonText}>Ayarlar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.footerButton}
            onPress={() => navigation.navigate('FavsScreen')}>
            <Icon name="heart" size={width * 0.05} color="#F36117" />
            <Text style={styles.footerButtonText}>Favoriler</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.footerButton}
            onPress={() => navigation.navigate('ProfileScreen')}>
            <Icon name="user" size={width * 0.05} color="#F36117" />
            <Text style={styles.footerButtonText}>Profil</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.footerButton}
            onPress={() => navigation.navigate('CampaignScreen')}>
            <Icon name="tag" size={width * 0.05} color="#F36117" />
            <Text style={styles.footerButtonText}>Kampanyalar</Text>
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
  gradientContainer: {
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
  imageContainer: {
    flex: 1,
    marginRight: width * 0.02,
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
  kampanyaBadgeContainer: {
    position: 'absolute',
    top: height * 0.01, // Kartın dışına biraz taşıyoruz
    right: -width * 0.154,

    paddingVertical: height * 0.007,
    paddingHorizontal: width * 0.1, // Dinamik boyutlandırma
    transform: [{rotate: '45deg'}],
    borderRadius: width * 0.01,
  },
  kampanyaBadgeText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: width * 0.025,
    textAlign: 'center',
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
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: width * 0.05,
    padding: height * 0.03,
    width: '80%',
    alignItems: 'center',
  },
  modalButton: {
    backgroundColor: '#F36117',
    padding: height * 0.015,
    borderRadius: width * 0.03,
    marginVertical: height * 0.01,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: width * 0.03,
  },
});

export default CategoriesScreen;
