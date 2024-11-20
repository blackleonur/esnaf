import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  BackHandler,
} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';
import { height, width } from 'src/utils/scaling';

interface Campaign {
  id: string;
  title: string;
  discount: string;
  imageUri: string;
}

const BussinesCampaignScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const {width, height} = Dimensions.get('window');
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.goBack();
        return true;
      };
  
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
  
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [navigation]),
  );
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: '1',
      title: 'Sıhhi Tesisat İndirimi',
      discount: '%20 indirim',
      imageUri: 'https://example.com/image1.jpg', // kampanyaya uygun resimler eklenebilir
    },
    {
      id: '2',
      title: 'Bakım Hizmeti İndirimi',
      discount: '%30 indirim',
      imageUri: 'https://example.com/image2.jpg',
    },
  ]);

  const goAddCampaign = () => {
    navigation.navigate('AddCampaignScreen');
  };
  const goEditCampaign = () => {
    navigation.navigate('EditCampaignScreen');
  };

  const renderItem = ({item}: {item: Campaign}) => (
    <View style={styles.campaignCard}>
      <Image source={{uri: item.imageUri}} style={styles.campaignImage} />
      <View style={styles.campaignInfo}>
        <Text style={styles.campaignTitle}>{item.title}</Text>
        <Text style={styles.campaignDiscount}>{item.discount}</Text>
        <TouchableOpacity style={styles.editButton} onPress={goEditCampaign}>
          <Text style={styles.editButtonText}>Düzenle</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kampanyalar</Text>

      <FlatList
        data={campaigns}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        style={styles.list}
      />

      <TouchableOpacity style={styles.addButton} onPress={goAddCampaign}>
        <Text style={styles.addButtonText}>+ Yeni Kampanya Ekle</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.04, // Dinamik padding
    backgroundColor: '#fff',
  },
  title: {
    fontSize: width * 0.05, // Dinamik font boyutu
    fontWeight: 'bold',
    marginBottom: height * 0.02,
  },
  list: {
    flexGrow: 0,
  },
  campaignCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: width * 0.04,
    marginVertical: height * 0.01,
    borderRadius: width * 0.02,
    backgroundColor: '#f1f1f1',
  },
  campaignImage: {
    width: width * 0.15, // Dinamik genişlik ve yükseklik
    height: width * 0.15,
    borderRadius: width * 0.02,
    marginRight: width * 0.04,
  },
  campaignInfo: {
    flex: 1,
  },
  campaignTitle: {
    fontSize: width * 0.045, // Dinamik font boyutu
    fontWeight: 'bold',
  },
  campaignDiscount: {
    fontSize: width * 0.04,
    color: '#666',
  },
  editButton: {
    backgroundColor: '#007BFF',
    padding: width * 0.03,
    borderRadius: width * 0.02,
    marginTop: height * 0.01,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#28a745',
    padding: width * 0.04,
    borderRadius: width * 0.03,
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: width * 0.045, // Dinamik font boyutu
  },
});

export default BussinesCampaignScreen;
