import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'react-native-image-picker';
import {NavigationProp} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window'); // Ekran genişliği ve yüksekliğini alın

const NonBussinesProfileScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const projects = [
    {
      id: '1',
      name: 'Proje 1',
      description: 'Modern ofis tasarımı',
      imageUri:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3ke4oBJu7WoxLxqkTYbfz4km8u7qpSKRpdA&s',
    },
    {
      id: '2',
      name: 'Proje 2',
      description: 'Klasik ev dekorasyonu',
      imageUri: 'https://www.yapikatalogu.com/Files/Products/31423/31423.jpg',
    },
  ];

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
        <Ionicons name="pencil" size={normalize(24)} color="#007BFF" />
      </TouchableOpacity>
      <Image
        source={{
          uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuWqdEM4Rb3ObHTPlVqY9kuMu4XzT6PulPRQ&s',
        }}
        style={styles.profileImage}
      />
      <Text style={styles.profileName}>Ekim BİÇER "BAKICI"</Text>

      {/* Action Buttons */}
      <View style={styles.actionButtonContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleProfileImageUpdate}>
          <Ionicons name="camera" size={normalize(20)} color="#000" />
          <Text style={styles.actionButtonText}>Profil Resmini Güncelle</Text>
          <Text style={styles.updateButton}>Güncelle</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={handlePriceListUpdate}>
          <Ionicons name="cash" size={normalize(20)} color="#000" />
          <Text style={styles.actionButtonText}>Fiyat Listesini Güncelle</Text>
          <Text style={styles.updateButton}>Düzenle</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={handlePastProjectsUpdate}>
          <Ionicons name="time" size={normalize(20)} color="#000" />
          <Text style={styles.actionButtonText}>Geçmiş İşler</Text>
          <Text style={styles.updateButton}>Düzenle</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Dinamik boyutlandırma için normalize fonksiyonu
const normalize = (size: number) => {
  const scale = width / 375; // 375, temel ekran genişliği (iPhone X gibi) olarak alınmıştır
  return Math.round(size * scale);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.04, // Dinamik padding
    backgroundColor: '#fff',
  },
  profileTitle: {
    fontSize: normalize(18),
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: height * 0.02, // Dinamik margin
  },
  editIcon: {
    position: 'absolute',
    top: height * 0.02, // Dinamik top margin
    right: width * 0.04, // Dinamik right margin
  },
  profileImage: {
    width: width * 0.5, // Ekran genişliğinin yarısı kadar
    height: width * 0.5, // Kare olması için aynı genişlik
    borderRadius: (width * 0.5) / 2, // Tam yuvarlak hale getirir
    marginTop: height * 0.02,
    alignSelf: 'center',
  },
  profileName: {
    fontSize: normalize(20),
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: height * 0.02, // Dinamik dikey boşluk
  },
  actionButtonContainer: {
    marginVertical: height * 0.02, // Dinamik dikey boşluk
  },
  actionButton: {
    backgroundColor: '#f1f1f1',
    padding: height * 0.02, // Dinamik padding
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: height * 0.01, // Dinamik margin
  },
  actionButtonText: {
    fontSize: normalize(16),
    fontWeight: 'bold',
  },
  updateButton: {
    color: '#F36117',
    fontWeight: 'bold',
  },
  projectsContainer: {
    marginTop: height * 0.02, // Dinamik üst boşluk
  },
  projectCard: {
    width: width * 0.4, // Ekranın %40'ı genişliğinde
    padding: height * 0.02, // Dinamik padding
    borderRadius: 8,
    backgroundColor: '#f8f8f8',
    marginRight: width * 0.04, // Dinamik sağ boşluk
    alignItems: 'center',
  },
  projectImage: {
    width: '100%',
    height: height * 0.15, // Dinamik yükseklik
    borderRadius: 8,
    marginBottom: height * 0.01, // Dinamik margin
  },
  projectName: {
    fontWeight: 'bold',
    marginBottom: height * 0.01, // Dinamik margin
  },
  projectDescription: {
    fontSize: normalize(12),
    color: '#666',
  },
});

export default NonBussinesProfileScreen;
