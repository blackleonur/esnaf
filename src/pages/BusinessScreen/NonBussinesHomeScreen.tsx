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
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NavigationProp} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window'); // Dinamik ekran boyutlarını al

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
    job: 'Bina temizliği',
    customerName: 'Onur KARAASLAN',
    phoneNumber: '5442020217',
    address: 'Kepez, Erenköy 4819sk.',
    uri: 'https://i.pinimg.com/236x/86/ea/e3/86eae3d8abc2362ad6262916cb950640.jpg',
  },
  {
    id: '2',
    job: 'Merdiven Temizliği',
    customerName: 'Engin KARAASLAN',
    phoneNumber: '5457789677',
    address: 'örtülüpınar mh hasanlı sk no : 10 ',
    uri: 'https://i.pinimg.com/236x/86/ea/e3/86eae3d8abc2362ad6262916cb950640.jpg',
  },
];

const NonBusinessHomeScreen: React.FC = () => {
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
    navigation.navigate('NonBussinesProfileScreen');
  };
  const goSettings = () => {
    navigation.navigate('BussinesSettingsScreen');
  };
  const goCampaigns = () => {
    navigation.navigate('NonBussinesCampaignScreen');
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
          <Ionicons name="call" size={normalize(24)} color="#F36117" />
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Adres: {item.address}</Text>
        <TouchableOpacity onPress={() => handleLocationPress(item.address)}>
          <Ionicons name="location" size={normalize(24)} color="#F36117" />
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
        <Text style={styles.shopName}>Ekim BİÇER "TEMİZLİKÇİ"</Text>

        <Text style={styles.pendingJobsTitle}>Bekleyen İşler</Text>
        <FlatList
          data={jobData}
          renderItem={renderJobItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.jobList}
        />
        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerButton} onPress={goProfile}>
            <Ionicons name="person" size={normalize(24)} color="#F36117" />
            <Text style={styles.footerButtonText}>Profil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton} onPress={goSettings}>
            <Ionicons name="settings" size={normalize(24)} color="#F36117" />
            <Text style={styles.footerButtonText}>Ayarlar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton} onPress={goCampaigns}>
            <Ionicons name="megaphone" size={normalize(24)} color="#F36117" />
            <Text style={styles.footerButtonText}>Kampanya Düzenle</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

// Normalize font size based on screen size
const normalize = (size: number) => {
  const scale = width / 375; // Assuming 375 is the base screen width (iPhone X)
  return Math.round(size * scale);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.04, // Dinamik padding
  },
  shopName: {
    fontSize: normalize(24),
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: height * 0.02, // Dinamik margin
  },
  businessImage: {
    width: width * 0.8,
    height: height * 0.25,
    resizeMode: 'cover',
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: height * 0.02,
  },
  pendingJobsTitle: {
    fontSize: normalize(20),
    fontWeight: 'bold',
    marginBottom: height * 0.02,
  },
  jobList: {
    paddingBottom: height * 0.02,
  },
  card: {
    backgroundColor: '#fff',
    padding: height * 0.02,
    borderRadius: 8,
    marginBottom: height * 0.02,
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
    fontSize: normalize(18),
    fontWeight: 'bold',
    marginBottom: height * 0.01,
  },
  customerName: {
    fontSize: normalize(16),
    marginBottom: height * 0.01,
    alignSelf: 'center',
    marginLeft: width * 0.3, // Dinamik margin
    fontWeight: 'bold',
  },
  label: {
    fontSize: normalize(16),
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.01,
  },
  profileImage: {
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: (width * 0.15) / 2,
    marginBottom: height * 0.01,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: height * 0.02,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  footerButton: {
    alignItems: 'center',
  },
  footerButtonText: {
    marginTop: height * 0.01,
    fontSize: normalize(14),
    fontWeight: 'bold',
  },
});

export default NonBusinessHomeScreen;
