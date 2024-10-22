import React, {useState, useEffect} from 'react';
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
  BackHandler, // BackHandler'ı ekledik
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NavigationProp} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {TokenService} from '../../TokenService'; // TokenService import edildi

interface JobItem {
  id: string;
  operationName: string;
  customerFirstName: string;
  customerLastName: string;
  customerPhone: string;
  customerAddress: string;
}

const {width, height} = Dimensions.get('window');

const BusinessHomeScreen: React.FC = () => {
  const [shopName, setShopName] = useState<string>(''); // Dinamik işyeri adı
  const [jobData, setJobData] = useState<JobItem[]>([]); // Backend'den gelen veriyi tutacak state
  const navigation = useNavigation<NavigationProp<any>>();

  // Geri tuşuna basıldığında uygulamayı kapatmak için BackHandler ekledik
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Çıkış', 'Uygulamadan çıkmak istiyor musunuz?', [
        {
          text: 'Hayır',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'Evet', onPress: () => BackHandler.exitApp()},
      ]);
      return true; // Bu geri tuşu olayını işledik, bir önceki sayfaya gidilmesini engelledik
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove(); // Event listener'ı kaldırıyoruz
  }, []);

  // Token'ı çöz ve işyeri adını al
  useEffect(() => {
    const fetchTokenData = async () => {
      const decodedToken = await TokenService.decodeToken();
      if (decodedToken && decodedToken.nameid) {
        const businessId = decodedToken.nameid; // Token'dan businessId alınması
        setShopName(decodedToken.BusinessName); // İşletme adını state'e kaydet
      }
    };
    fetchTokenData();
  }, []);

  // Backend'den veriyi çek
  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const decodedToken = await TokenService.decodeToken();
        if (decodedToken && decodedToken.nameid) {
          const businessId = decodedToken.nameid; // Token'dan businessId alınması

          const response = await fetch(
            `http://10.0.2.2:5150/api/Service/GetServicesByBusiness/${businessId}`, // Business ID'yi URL'ye ekliyoruz
          );
          const data = await response.json();
          if (data.isSuccess) {
            setJobData(data.result); // Backend'den dönen veriyi state'e kaydet
          }
        }
      } catch (error) {
        console.error('Veri çekme hatası:', error);
        Alert.alert('Hata', 'İş verileri alınırken bir sorun oluştu.');
      }
    };
    fetchJobData();
  }, []);

  const handleCallPress = (phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`).catch(err =>
      Alert.alert('Hata', 'Telefon uygulaması açılamadı.'),
    );
  };

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

  // FlatList item render fonksiyonu
  const renderJobItem = ({item}: {item: JobItem}) => (
    <View style={styles.card}>
      <View style={styles.cardcontainer}>
        <Image
          source={{
            uri: 'https://i.pinimg.com/236x/86/ea/e3/86eae3d8abc2362ad6262916cb950640.jpg', // Sabit resim örneği
          }}
          style={styles.profileImage}
        />
        <Text style={styles.customerName}>
          {item.customerFirstName} {item.customerLastName}
        </Text>
      </View>
      <Text style={styles.jobTitle}>Yapılacak İş: {item.operationName}</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Telefon Numarası: {item.customerPhone}</Text>
        <TouchableOpacity onPress={() => handleCallPress(item.customerPhone)}>
          <Ionicons name="call" size={24} color="#F36117" />
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Adres: {item.customerAddress}</Text>
        <TouchableOpacity
          onPress={() => handleLocationPress(item.customerAddress)}>
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
        <Text style={styles.shopName}>{shopName}</Text>
        {/* İşyerinin adı dinamik olarak gösteriliyor */}
        <Text style={styles.pendingJobsTitle}>Bekleyen İşler</Text>
        <FlatList
          data={jobData} // Backend'den gelen veriyi burada kullanıyoruz
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
    marginBottom: height * 0.02, // %2 margin bottom
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.01, // %1 margin bottom
  },
  label: {
    fontSize: width * 0.04, // Dinamik font boyutu
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  customerName: {
    fontSize: width * 0.05, // Dinamik font boyutu
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: height * 0.02, // %2 padding
    borderTopWidth: 1,
    borderTopColor: '#F36117',
  },
  footerButton: {
    alignItems: 'center',
  },
  footerButtonText: {
    fontSize: width * 0.04, // Dinamik font boyutu
  },
});

export default BusinessHomeScreen;
