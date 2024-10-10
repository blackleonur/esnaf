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
      onPress={() => navigation.navigate('CategoriesScreen')} // Navigate to FavsScreen when category is clicked
    >
      <Image source={{uri: item.image}} style={styles.image} />
      <Text style={styles.cardTitle}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Arama Çubuğu */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Ne arıyorsunuz?"
          value={searchText}
          onChangeText={handleSearch} // Arama işlevi
        />
      </View>

      {/* Kategori Listesi */}
      <FlatList
        data={filteredCategories} // Filtrelenmiş listeyi göster
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2} // 2 sütunlu görünüm
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
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  searchContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  searchInput: {
    width: '90%',
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
});

export default HomeScreen;