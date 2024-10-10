import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'react-native-image-picker';
import {NavigationProp} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';

const BussinesProfileScreen: React.FC = () => {
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
        <Ionicons name="pencil" size={24} color="#007BFF" />
      </TouchableOpacity>
      <Image
        source={{
          uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuWqdEM4Rb3ObHTPlVqY9kuMu4XzT6PulPRQ&s',
        }}
        style={styles.profileImage}
      />
      <Text style={styles.profileName}>Ahmet Yılmaz</Text>

      {/* Action Buttons */}
      <View style={styles.actionButtonContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleProfileImageUpdate}>
          <Ionicons name="camera" size={20} color="#000" />
          <Text style={styles.actionButtonText}>Profil Resmini Güncelle</Text>
          <Text style={styles.updateButton}>Güncelle</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={handlePriceListUpdate}>
          <Ionicons name="cash" size={20} color="#000" />
          <Text style={styles.actionButtonText}>Fiyat Listesini Güncelle</Text>
          <Text style={styles.updateButton}>Düzenle</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleAddressUpdate}>
          <Ionicons name="location" size={20} color="#000" />
          <Text style={styles.actionButtonText}>Adres ve Dükkan İsmi</Text>
          <Text style={styles.updateButton}>Düzenle</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={handlePastProjectsUpdate}>
          <Ionicons name="time" size={20} color="#000" />
          <Text style={styles.actionButtonText}>Geçmiş İşler</Text>
          <Text style={styles.updateButton}>Düzenle</Text>
        </TouchableOpacity>
      </View>

      {/* Projects List */}
      <FlatList
        data={projects}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderProject}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.projectsContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  profileTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 16,
  },
  editIcon: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  profileImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 16,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  actionButtonContainer: {
    marginVertical: 8,
  },
  actionButton: {
    backgroundColor: '#f1f1f1',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  updateButton: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
  projectsContainer: {
    marginTop: 16,
  },
  projectCard: {
    width: 150,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f8f8f8',
    marginRight: 16,
    alignItems: 'center',
  },
  projectImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  projectName: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  projectDescription: {
    fontSize: 12,
    color: '#666',
  },
});

export default BussinesProfileScreen;
