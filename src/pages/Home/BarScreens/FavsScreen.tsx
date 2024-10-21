import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const {width} = Dimensions.get('window');

// Dummy data for favorited shops
const initialFavShops = [
  {
    id: '1',
    title: 'Kapir Halı Yıkama',
    description: 'Kumcular mahallesi öztürk ticaret',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlbK80wKIzqMHsmKsFmI_z54Ro4JDM2tOvHxnBj-c9SAZ_AMNLVeVTAAUI3wZBoH2du3Y&usqp=CAU',
    campaign: 'ŞOK KAMPANYA',
  },
  {
    id: '2',
    title: 'Mekan TESİSAT',
    description: 'Küçükbölcek mahallesi cennet mobilya karşısı ',
    imageUrl:
      'https://www.revoyazilim.com/yonetim/upload/blogdetay/46aeebc689991e5768c2147143ccf2.jpg',
  },
  {
    id: '3',
    title: 'Onur Elektrik',
    description: 'Erenköy mahallesi 4819 sokak ',
    imageUrl:
      'https://www.revoyazilim.com/yonetim/upload/blogdetay/46aeebc689991e5768c2147143ccf2.jpg',
  },
];

type Shop = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  campaign?: string; // optional property
};

// Component for rendering each favorited shop
const FavShopItem: React.FC<{
  shop: Shop;
  onUnfavorite: (id: string) => void;
}> = ({shop, onUnfavorite}) => (
  <View style={styles.shopCard}>
    {shop.campaign && (
      <View style={styles.campaignBanner}>
        <Text style={styles.campaignText}>{shop.campaign}</Text>
      </View>
    )}
    <View style={styles.shopContent}>
      <Image source={{uri: shop.imageUrl}} style={styles.shopImage} />
      <View style={styles.shopDetails}>
        <Text style={styles.shopTitle}>{shop.title}</Text>
        <Text style={styles.shopDescription}>{shop.description}</Text>
      </View>
      <TouchableOpacity
        onPress={() =>
          Alert.alert(
            'Onay',
            'Bu dükkanı favorilerden kaldırmak istediğinize emin misiniz?',
            [
              {
                text: 'Vazgeç',
                onPress: () => console.log('İşlem iptal edildi'),
                style: 'cancel',
              },
              {
                text: 'Evet',
                onPress: () => onUnfavorite(shop.id),
              },
            ],
            {cancelable: true},
          )
        }>
        <Icon name="favorite" size={28} color="#FF4141" />
      </TouchableOpacity>
    </View>
  </View>
);

const FavsScreen = () => {
  const [favShops, setFavShops] = useState<Shop[]>(initialFavShops);

  // Function to remove shop from favorites
  const handleUnfavorite = (id: string) => {
    setFavShops(favShops.filter(shop => shop.id !== id));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={favShops}
        renderItem={({item}) => (
          <FavShopItem shop={item} onUnfavorite={handleUnfavorite} />
        )}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F5F5F5',
  },
  shopCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 15,
    padding: 10,
    flexDirection: 'column',
    elevation: 2,
  },
  campaignBanner: {
    backgroundColor: '#FF4141',
    alignSelf: 'flex-start',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginBottom: 5,
  },
  campaignText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  shopContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shopImage: {
    width: width * 0.18, // Dynamically adjust size based on screen width
    height: width * 0.18, // Keep it square
    borderRadius: 8,
    marginRight: 10,
  },
  shopDetails: {
    flex: 1,
  },
  shopTitle: {
    fontSize: width * 0.045, // Responsive font size
    fontWeight: 'bold',
    marginBottom: 5,
  },
  shopDescription: {
    fontSize: width * 0.038, // Responsive font size
    color: '#333333',
  },
});

export default FavsScreen;
