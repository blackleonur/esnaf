import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Dimensions,
  BackHandler,
  ScrollView,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NavigationProp} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import {TokenService} from '../../TokenService';

interface JobItem {
  serviceId: string;
  userFirstName: string;
  userLastName: string;
  requestDate: string;
  totalPrice: number;
  status: string;
}

const {width, height} = Dimensions.get('window');

const NonBusinessHomeScreen: React.FC = () => {
  const [shopName, setShopName] = useState<string>('');

  const navigation = useNavigation<NavigationProp<any>>();
  const goPendingServices = () => {
    navigation.navigate('BussinesPendingServicesArea');
  };
  const goCompletedServices = () => {
    navigation.navigate('BussinesCompletedServicesArea');
  };
  const goActivatedServices = () => {
    navigation.navigate('BussinesActivitiedServicesArea');
  };

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
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const fetchTokenData = async () => {
      const decodedToken = await TokenService.decodeToken();
      if (decodedToken && decodedToken.nameid) {
        if ('BusinessName' in decodedToken) {
          setShopName(decodedToken.BusinessName);
        } else {
          console.log('User token does not have BusinessName property');
        }
      }
    };
    fetchTokenData();
  }, []);

  return (
    <LinearGradient
      colors={['#FFFFFF', '#A6A6A6']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={{flex: 1, paddingBottom: height * 0.1}} // Alt boşluk eklendi
    >
      <TouchableOpacity onPress={goPendingServices}>
        <Text>Bekleyen Randevular</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goActivatedServices}>
        <Text>Bekleyen İşler</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goCompletedServices}>
        <Text>Tamamlanmış İşler</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigation.navigate('BussinesProfileScreen')}>
          <Ionicons name="person" size={24} color="#F36117" />
          <Text style={styles.footerButtonText}>Profil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigation.navigate('BussinesSettingsScreen')}>
          <Ionicons name="settings" size={24} color="#F36117" />
          <Text style={styles.footerButtonText}>Ayarlar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigation.navigate('BussinesCampaignScreen')}>
          <Ionicons name="megaphone" size={24} color="#F36117" />
          <Text style={styles.footerButtonText}>Kampanya Düzenle</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.04,
    marginBottom: height * 0.3,
  },
  shopName: {
    fontSize: width * 0.065,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: height * 0.03,
  },
  sectionTitle: {
    fontSize: width * 0.055,
    fontWeight: '600',
    color: '#555',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.02,
    backgroundColor: '#FFF4E0',
    borderRadius: 8,
    textAlign: 'center',
    marginVertical: height * 0.01,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
  },
  jobList: {
    paddingBottom: height * 0.02,
  },
  card: {
    position: 'relative',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: width * 0.05,
    borderRadius: 10,
    marginBottom: height * 0.015,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    marginTop: height * 0.025,
  },
  logo: {
    position: 'absolute',
    top: -20,
    alignSelf: 'center',
    width: 40,
    height: 40,
    borderRadius: 25,
    marginLeft: width * 0.45,
  },
  textContainer: {
    flex: 1,
    marginTop: 15,
  },
  jobTitle: {
    fontSize: width * 0.06,
    fontWeight: '600',
    color: '#333',
    margin: 5,
  },
  label: {
    fontSize: width * 0.04,
    color: 'black',
    margin: 5,
    fontWeight: '600',
  },
  footer: {
    position: 'absolute', // Ekranda sabitlemek için
    bottom: 0, // En alta yerleştir
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#e5e5e5',
  },
  footerButton: {
    alignItems: 'center',
  },
  footerButtonText: {
    fontSize: 12,
    color: '#F36117',
    marginTop: 4,
  },
});

export default NonBusinessHomeScreen;
