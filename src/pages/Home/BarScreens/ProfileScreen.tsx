import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

// Interface tanımlamaları
interface PersonalInfo {
  phone: string;
  email: string;
  address: string;
}

interface FavoriteItem {
  id: string;
  name: string;
  imageUrl: string;
}

interface PastWorkItem {
  id: string;
  name: string;
  imageUrl: string;
}

const ProfileScreen: React.FC = () => {
  // Kişisel Bilgiler için state
  const [personalData, setPersonalData] = useState<PersonalInfo>({
    phone: '+90 532 123 45 67',
    email: 'ahmet.yilmaz@example.com',
    address: 'İstanbul, Türkiye',
  });

  const [profilePhoto, setProfilePhoto] = useState<string>(
    'https://randomuser.me/api/portraits/men/4.jpg',
  );
  // Favoriler ve Geçmiş İşler statik veri
  const favorites: FavoriteItem[] = [
    {
      id: '1',
      name: 'adnan tesisat',
      imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      id: '2',
      name: 'kamil halı yıkama',
      imageUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
    {
      id: '3',
      name: 'özge bayan kuaförü',
      imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      id: '4',
      name: 'Marangoz sabri',
      imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      id: '5',
      name: 'Özden elektrik',
      imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      id: '6',
      name: 'Özlem Taşpınar "BAKICI"',
      imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
  ];

  const pastWorks: PastWorkItem[] = [
    {
      id: '1',
      name: 'Proje 1',
      imageUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
  ];

  // Kişisel Bilgiler düzenleme
  const handleEdit = (key: keyof PersonalInfo, value: string) => {
    setPersonalData(prevData => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleProfilePhotoChange = () => {
    launchImageLibrary({mediaType: 'photo', quality: 1}, response => {
      if (response.didCancel) {
        Alert.alert('İşlem iptal edildi.');
      } else if (response.errorMessage) {
        Alert.alert('Bir hata oluştu:', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setProfilePhoto(response.assets[0].uri || '');
      }
    });
  };
  const renderFavoriteItem = ({item}: {item: FavoriteItem}) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{uri: item.imageUrl}} style={styles.image} />
      <Text style={styles.cardText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderPastWorkItem = ({item}: {item: PastWorkItem}) => (
    <View style={styles.pastWork}>
      <Image source={{uri: item.imageUrl}} style={styles.imageSmall} />
      <Text style={styles.pastWorkText}>{item.name}</Text>
      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Düzenle</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Profil Fotoğrafı */}
      <TouchableOpacity
        onPress={handleProfilePhotoChange}
        style={styles.profilePhotoContainer}>
        <Image source={{uri: profilePhoto}} style={styles.profilePhoto} />
      </TouchableOpacity>
      <Text style={styles.title}>Profil</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Kişisel Bilgiler</Text>
        <View style={styles.inputRow}>
          <Text>Telefon:</Text>
          <TextInput
            style={styles.input}
            value={personalData.phone}
            onChangeText={text => handleEdit('phone', text)}
          />
        </View>
        <View style={styles.inputRow}>
          <Text>E-posta:</Text>
          <TextInput
            style={styles.input}
            value={personalData.email}
            onChangeText={text => handleEdit('email', text)}
          />
        </View>
        <View style={styles.inputRow}>
          <Text>Adres:</Text>
          <TextInput
            style={styles.input}
            value={personalData.address}
            onChangeText={text => handleEdit('address', text)}
          />
        </View>
      </View>

      <View style={styles.sectionForFav}>
        <Text style={styles.sectionTitle}>Favoriler</Text>
        <FlatList
          data={favorites}
          renderItem={renderFavoriteItem}
          keyExtractor={item => item.id}
          numColumns={1}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Geçmiş İşler</Text>
        <FlatList
          data={pastWorks}
          renderItem={renderPastWorkItem}
          keyExtractor={item => item.id}
        />
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Çıkış Yap</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, backgroundColor: '#f7f7f7'},
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  profilePhotoContainer: {alignItems: 'center', marginBottom: 16},
  profilePhoto: {width: 100, height: 100, borderRadius: 50},
  section: {marginVertical: 8, maxHeight: 200},
  sectionForFav: {marginVertical: 8, maxHeight: 150},
  sectionTitle: {fontSize: 18, fontWeight: 'bold', marginBottom: 8},
  inputRow: {flexDirection: 'row', alignItems: 'center', marginBottom: 12},
  input: {marginLeft: 10, borderBottomWidth: 1, flex: 1, paddingBottom: 4},
  card: {
    backgroundColor: '#fff',
    padding: 10,
    marginRight: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardText: {marginLeft: 10},
  image: {width: 40, height: 40, borderRadius: 20},
  pastWork: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 8,
  },
  imageSmall: {width: 30, height: 30, borderRadius: 15},
  pastWorkText: {flex: 1, marginLeft: 10},
  editButton: {backgroundColor: '#007BFF', padding: 5, borderRadius: 5},
  editButtonText: {color: '#fff'},
  logoutButton: {
    backgroundColor: '#FF3B30',
    padding: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  logoutText: {color: '#fff', fontSize: 16},
});

export default ProfileScreen;
