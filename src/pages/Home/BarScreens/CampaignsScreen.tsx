import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NavigationProp} from '@react-navigation/native';

interface Campaign {
  id: string;
  name: string;
  image: string;
}

const campaigns: Campaign[] = [
  {
    id: '1',
    name: 'Happy Center Kampanyaları',
    image: 'https://picsum.photos/536/354',
  },
  {
    id: '2',
    name: 'A101 Kampanyaları',
    image: 'https://picsum.photos/536/354',
  },
  {
    id: '3',
    name: 'A101 Kampanyaları',
    image: 'https://picsum.photos/536/354',
  },
];

interface CampaignsScreenProp {
  navigation: NavigationProp<any, any>;
}

const CampaignsScreen = (navigation: CampaignsScreenProp) => {
  function goToMarket() {
    navigation.navigation.navigate('MarketScreen');
  }

  const renderItem = ({item}: {item: Campaign}) => (
    <TouchableOpacity style={styles.card} onPress={goToMarket}>
      <Image
        source={{uri: item.image}}
        style={styles.image}
        onError={error => console.log('Image load error:', error)}
        onLoad={() => console.log('Image loaded successfully')}
      />
      <Text style={styles.cardTitle}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Kampanyalar</Text>
      <FlatList
        data={campaigns}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
});

export default CampaignsScreen;
