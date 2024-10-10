import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';

interface Campaign {
  id: string;
  title: string;
  discount: string;
  imageUri: string;
}

const BussinesCampaignScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();
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
    // Diğer kampanyalar buraya eklenebilir
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
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  list: {
    flexGrow: 0,
  },
  campaignCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f1f1f1',
  },
  campaignImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  campaignInfo: {
    flex: 1,
  },
  campaignTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  campaignDiscount: {
    fontSize: 14,
    color: '#666',
  },
  editButton: {
    backgroundColor: '#007BFF',
    padding: 8,
    borderRadius: 4,
    marginTop: 8,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#28a745',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default BussinesCampaignScreen;
