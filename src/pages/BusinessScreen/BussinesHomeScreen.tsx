import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
  BackHandler,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NavigationProp} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import {TokenService} from '../../TokenService';

const {width, height} = Dimensions.get('window');

const BusinessHomeScreen: React.FC = () => {
  const [shopName, setShopName] = useState<string>('');
  const navigation = useNavigation<NavigationProp<any>>();
  const placeholderImageUrl = 'https://via.placeholder.com/150';

  const goPendingServices = () => navigation.navigate('BPendingServicesArea');
  const goCompletedServices = () =>
    navigation.navigate('BCompletedServicesArea');
  const goActivatedServices = () =>
    navigation.navigate('BActivitiedServicesArea');
  const goCommentServices = () => navigation.navigate('BussinesCommentScreen');

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Çıkış', 'Uygulamadan çıkmak istiyor musunuz?', [
        {text: 'Hayır', onPress: () => null, style: 'cancel'},
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
      if (decodedToken && 'BusinessName' in decodedToken) {
        setShopName(decodedToken.BusinessName);
      }
    };
    fetchTokenData();
  }, []);

  return (
    <LinearGradient colors={['#FFFFFF', '#A6A6A6']} style={{flex: 1}}>
      <View style={styles.header}>
        <Text style={styles.shopName}>{shopName.toUpperCase()}</Text>
        {/* Görsel Alanı */}
        <Image style={styles.shopImage} source={{uri: placeholderImageUrl}} />
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.cardButton} onPress={goPendingServices}>
          <Ionicons name="time-outline" size={30} color="#F36117" />
          <Text style={styles.cardText}>Bekleyen Randevular</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cardButton}
          onPress={goActivatedServices}>
          <Ionicons name="play-outline" size={30} color="#3A85FF" />
          <Text style={styles.cardText}>Aktif İşler</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cardButton}
          onPress={goCompletedServices}>
          <Ionicons name="checkmark-done-outline" size={30} color="#4CAF50" />
          <Text style={styles.cardText}>Tamamlanmış İşler</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardButton} onPress={goCommentServices}>
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={30}
            color="#FF9800"
          />
          <Text style={styles.cardText}>Yorumlar</Text>
        </TouchableOpacity>
      </View>

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
  header: {
    alignItems: 'center',
    paddingVertical: height * 0.05,
  },
  shopName: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: height * 0.02,
  },
  shopImage: {
    width: width * 0.8,
    height: width * 0.4,
    borderRadius: width * 0.1,
    backgroundColor: '#e5e5e5',
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginVertical: height * 0.02,
  },
  cardButton: {
    width: width * 0.4,
    height: height * 0.18,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: height * 0.02,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  cardText: {
    marginTop: 10,
    fontSize: width * 0.04,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
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

export default BusinessHomeScreen;
