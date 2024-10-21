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
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NavigationProp} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

interface JobItem {
  id: string;
  job: string;
  customerName: string;
  phoneNumber: string;
  address: string;
  uri: string;
}

const {width, height} = Dimensions.get('window');

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
          <Ionicons name="call" size={24} color="#F36117" />
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Adres: {item.address}</Text>
        <TouchableOpacity onPress={() => handleLocationPress(item.address)}>
          <Ionicons name="location" size={24} color="#F36117" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={['#FFFFFF', '#A6A6A6']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.shopName}>Mekan Tesisat</Text>

        <Text style={styles.pendingJobsTitle}>Bekleyen İşler</Text>
        <FlatList
          data={jobData}
          renderItem={renderJobItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.jobList}
        />
        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerButton} onPress={goProfile}>
            <Ionicons name="person" size={24} color="#F36117" />
            <Text style={styles.footerButtonText}>Profil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton} onPress={goSettings}>
            <Ionicons name="settings" size={24} color="#F36117" />
            <Text style={styles.footerButtonText}>Ayarlar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton} onPress={goCampaigns}>
            <Ionicons name="megaphone" size={24} color="#F36117" />
            <Text style={styles.footerButtonText}>Kampanya Düzenle</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.04, // %4 padding
  },
  shopName: {
    fontSize: width * 0.06, // Dinamik font boyutu
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: height * 0.02, // %2 margin
  },
  workplaceImage: {
    width: width * 0.9, // Ekranın %90'ı genişlik
    height: height * 0.25, // Ekranın %25'i yükseklik
    resizeMode: 'contain',
    borderRadius: 8,
    alignSelf: 'center',
  },
  pendingJobsTitle: {
    fontSize: width * 0.05, // Dinamik font boyutu
    fontWeight: 'bold',
    marginBottom: height * 0.02, // %2 margin
  },
  jobList: {
    paddingBottom: height * 0.02, // %2 padding
  },
  card: {
    backgroundColor: '#FFFFF9',
    padding: width * 0.05, // %5 padding
    borderRadius: 8,
    marginBottom: height * 0.02, // %2 margin bottom
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
    fontSize: width * 0.045, // Dinamik font boyutu
    fontWeight: 'bold',
    marginBottom: height * 0.01, // %1 margin
  },
  customerName: {
    fontSize: width * 0.04, // Dinamik font boyutu
    marginBottom: height * 0.01, // %1 margin
    alignSelf: 'center',
    marginLeft: width * 0.1, // Ekrana göre sol boşluk
    fontWeight: 'bold',
  },
  label: {
    fontSize: width * 0.04, // Dinamik font boyutu
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.01, // %1 margin
  },
  profileImage: {
    width: width * 0.15, // %15 genişlik
    height: width * 0.15, // %15 yükseklik
    borderRadius: (width * 0.15) / 2, // Tam yuvarlak
    marginBottom: height * 0.01, // %1 margin
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: height * 0.02, // %2 dikey padding
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  footerButton: {
    alignItems: 'center',
  },
  footerButtonText: {
    marginTop: height * 0.005, // %0.5 margin
    fontSize: width * 0.035, // Dinamik font boyutu
    fontWeight: 'bold',
  },
});

export default BusinessHomeScreen;
