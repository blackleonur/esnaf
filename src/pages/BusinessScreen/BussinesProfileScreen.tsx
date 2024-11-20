import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  Dimensions,
  PixelRatio,
  BackHandler,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'react-native-image-picker';
import {NavigationProp} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {TokenService} from '../../TokenService';
import {useFocusEffect} from '@react-navigation/native';

// Ekran genişliği ve yüksekliği
const {width, height} = Dimensions.get('window');

// Dinamik boyutlar için ölçekleme fonksiyonları
const scale = (size: number) => (width / 375) * size;
const normalizeFont = (size: number) => size * PixelRatio.getFontScale();

const BussinesProfileScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    businessName: '',
    phoneNumber: '',
  });
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

  useEffect(() => {
    const fetchUserData = async () => {
      const decodedToken = await TokenService.decodeToken();
      if (decodedToken) {
        setUserData({
          name: decodedToken.nameid,
          email: decodedToken.email,
          businessName:
            'BusinessName' in decodedToken ? decodedToken.BusinessName : '',
          phoneNumber: decodedToken.PhoneNumber,
        });
      }
    };
    fetchUserData();
  }, []);

  const renderProject = ({item}: {item: any}) => (
    <View style={styles.projectCard}>
      <Image source={{uri: item.imageUri}} style={styles.projectImage} />
      <Text style={styles.projectName}>{item.name}</Text>
      <Text style={styles.projectDescription}>{item.description}</Text>
    </View>
  );

  const handleProfileImageUpdate = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
      },
      response => {
        if (response.didCancel) {
          console.log('Image picker cancelled');
        } else if (response.errorCode) {
          console.error('Image picker error', response.errorCode);
        } else {
          Alert.alert('Başarılı', 'Profil resmi güncellendi.');
        }
      },
    );
  };

  const handlePriceListUpdate = () => {
    navigation.navigate('PriceUpdateScreen');
  };

  const handleAddressUpdate = () => {
    navigation.navigate('AddresUpdateScreen');
  };

  const handlePastProjectsUpdate = () => {
    navigation.navigate('PastProjectsUpdateScreen');
  };

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <Text style={styles.profileTitle}>Profil</Text>
      <TouchableOpacity style={styles.editIcon}>
        <Ionicons name="pencil" size={scale(24)} color="#007BFF" />
      </TouchableOpacity>
      <Image
        source={{
          uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuWqdEM4Rb3ObHTPlVqY9kuMu4XzT6PulPRQ&s',
        }}
        style={styles.profileImage}
      />
      <Text style={styles.profileName}>
        {userData.businessName.toUpperCase()}
      </Text>

      {/* Action Buttons */}
      <View style={styles.actionButtonContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleProfileImageUpdate}>
          <Ionicons name="camera" size={scale(20)} color="#000" />
          <Text style={styles.actionButtonText}>Profil Resmini Güncelle</Text>
          <Text style={styles.updateButton}>Güncelle</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={handlePriceListUpdate}>
          <Ionicons name="cash" size={scale(20)} color="#000" />
          <Text style={styles.actionButtonText}>Fiyat Listesini Güncelle</Text>
          <Text style={styles.updateButton}>Düzenle</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleAddressUpdate}>
          <Ionicons name="location" size={scale(20)} color="#000" />
          <Text style={styles.actionButtonText}>Adres ve Dükkan İsmi</Text>
          <Text style={styles.updateButton}>Düzenle</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={handlePastProjectsUpdate}>
          <Ionicons name="time" size={scale(20)} color="#000" />
          <Text style={styles.actionButtonText}>Geçmiş İşler</Text>
          <Text style={styles.updateButton}>Düzenle</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scale(16),
    backgroundColor: '#fff',
  },
  profileTitle: {
    fontSize: normalizeFont(18),
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: scale(16),
  },
  editIcon: {
    position: 'absolute',
    top: scale(16),
    right: scale(16),
  },
  profileImage: {
    width: '100%',
    height: scale(100),
    borderRadius: scale(8),
    marginTop: scale(16),
  },
  profileName: {
    fontSize: normalizeFont(20),
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: scale(8),
  },
  profileEmail: {
    fontSize: normalizeFont(16),
    textAlign: 'center',
    color: '#666',
  },
  profilePhone: {
    fontSize: normalizeFont(16),
    textAlign: 'center',
    color: '#666',
    marginBottom: scale(8),
  },
  actionButtonContainer: {
    marginVertical: scale(8),
  },
  actionButton: {
    backgroundColor: '#f1f1f1',
    padding: scale(16),
    borderRadius: scale(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: scale(8),
  },
  actionButtonText: {
    fontSize: normalizeFont(16),
    fontWeight: 'bold',
  },
  updateButton: {
    color: '#F36117',
    fontWeight: 'bold',
  },
  projectCard: {
    width: scale(150),
    padding: scale(8),
    borderRadius: scale(8),
    backgroundColor: '#f8f8f8',
    marginRight: scale(16),
    alignItems: 'center',
  },
  projectImage: {
    width: '100%',
    height: scale(100),
    borderRadius: scale(8),
    marginBottom: scale(8),
  },
  projectName: {
    fontWeight: 'bold',
    marginBottom: scale(4),
  },
  projectDescription: {
    fontSize: normalizeFont(12),
    color: '#666',
  },
});

export default BussinesProfileScreen;
