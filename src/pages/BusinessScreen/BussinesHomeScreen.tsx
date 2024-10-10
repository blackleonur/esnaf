import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NavigationProp} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';

interface JobItem {
  id: string;
  job: string;
  customerName: string;
  phoneNumber: string;
  address: string;
  uri: string;
}

const jobData: JobItem[] = [
  {
    id: '1',
    job: 'Petek değişimi',
    customerName: 'Onur KARAASLAN',
    phoneNumber: '5442020217',
    address: 'Kepez, Erenköy 4819sk.',
    uri: 'https://i.pinimg.com/236x/86/ea/e3/86eae3d8abc2362ad6262916cb950640.jpg',
  },

  {
    id: '2',
    job: 'Kombi Değişimi',
    customerName: 'Engin KARAASLAN',
    phoneNumber: '5457789677',
    address: 'örtülüpınar mh hasanlı sk no : 10 ',
    uri: 'https://i.pinimg.com/236x/86/ea/e3/86eae3d8abc2362ad6262916cb950640.jpg',
  },
];

const BusinessHomeScreen: React.FC = () => {
  const handleCallPress = (phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`).catch(err =>
      Alert.alert('Hata', 'Telefon uygulaması açılamadı.'),
    );
  };
  const navigation = useNavigation<NavigationProp<any>>();

  const handleLocationPress = (address: string) => {
    const query = encodeURIComponent(address);
    const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
    Linking.openURL(url).catch(err =>
      Alert.alert('Hata', 'Harita uygulaması açılamadı.'),
    );
  };
  const goProfile = () => {
    navigation.navigate('BussinesProfileScreen');
  };
  const goSettings = () => {
    navigation.navigate('BussinesSettingsScreen');
  };
  const goCampaigns = () => {
    navigation.navigate('BussinesCampaignScreen');
  };
  const renderJobItem = ({item}: {item: JobItem}) => (
    <View style={styles.card}>
      <View style={styles.cardcontainer}>
        <Image source={{uri: item.uri}} style={styles.profileImage} />
        <Text style={styles.customerName}> {item.customerName}</Text>
      </View>
      <Text style={styles.jobTitle}>Yapılacak İş: {item.job}</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Telefon Numarası: {item.phoneNumber}</Text>
        <TouchableOpacity onPress={() => handleCallPress(item.phoneNumber)}>
          <Ionicons name="call" size={24} color="#007BFF" />
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Adres: {item.address}</Text>
        <TouchableOpacity onPress={() => handleLocationPress(item.address)}>
          <Ionicons name="location" size={24} color="#007BFF" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.shopName}>Mekan Tesisat</Text>

      <Image
        source={{uri: 'https://picsum.photos/id/237/200/300'}}
        style={styles.workplaceImage}
      />

      <Text style={styles.pendingJobsTitle}>Bekleyen İşler</Text>
      <FlatList
        data={jobData}
        renderItem={renderJobItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.jobList}
      />
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={goProfile}>
          <Ionicons name="person" size={24} color="#007BFF" />
          <Text style={styles.footerButtonText}>Profil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={goSettings}>
          <Ionicons name="settings" size={24} color="#007BFF" />
          <Text style={styles.footerButtonText}>Ayarlar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={goCampaigns}>
          <Ionicons name="megaphone" size={24} color="#007BFF" />
          <Text style={styles.footerButtonText}>Kampanya Düzenle</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  shopName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  workplaceImagesContainer: {
    paddingBottom: 16,
    marginLeft: 16, // To create the left padding for the first item
  },
  workplaceImage: {
    width: 400,
    height: 200,
    resizeMode: 'repeat',
    borderRadius: 8,
    alignSelf: 'center',
  },
  pendingJobsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  jobList: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardcontainer: {
    backgroundColor: '#f8f8f8',
    flexDirection: 'row',
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  customerName: {
    fontSize: 16,
    marginBottom: 8,
    alignSelf: 'center',
    marginLeft: 90,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  footerButton: {
    alignItems: 'center',
  },
  footerButtonText: {
    marginTop: 4,
    fontSize: 14,
    color: '#007BFF',
  },
});

export default BusinessHomeScreen;
