import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import {TokenService} from '../../../TokenService';

// Dynamic measurements based on screen size
const {width, height} = Dimensions.get('window');

// Interface definitions
interface PersonalInfo {
  phone: string;
  email: string;
  address: string;
}

interface PastWorkItem {
  id: string;
  name: string;
  imageUrl: string;
}

const ProfileScreen: React.FC = () => {
  // Personal information state
  const [personalData, setPersonalData] = useState<PersonalInfo>({
    phone: '',
    email: '',
    address: 'Not specified', // Default for address
  });

  const [profilePhoto, setProfilePhoto] = useState<string>(
    'https://randomuser.me/api/portraits/men/4.jpg',
  );

  // Static data for past works
  const pastWorks: PastWorkItem[] = [
    {
      id: '1',
      name: 'Project 1',
      imageUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
  ];

  // Fetch user data from token
  useEffect(() => {
    const fetchUserData = async () => {
      const decodedToken = await TokenService.decodeToken();
      if (
        decodedToken &&
        'FirstName' in decodedToken && // Check if it's a user
        'LastName' in decodedToken
      ) {
        setPersonalData({
          phone: decodedToken.PhoneNumber || '',
          email: decodedToken.email || '',
          address: `${decodedToken.FirstName} ${decodedToken.LastName}`, // Set user address as Full Name
        });
      } else {
        Alert.alert('Unable to fetch user details from token.');
      }
    };
    fetchUserData();
  }, []);

  // Handle profile photo change
  const handleProfilePhotoChange = () => {
    launchImageLibrary({mediaType: 'photo', quality: 1}, response => {
      if (response.didCancel) {
        Alert.alert('Action cancelled.');
      } else if (response.errorMessage) {
        Alert.alert('An error occurred:', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setProfilePhoto(response.assets[0].uri || '');
      }
    });
  };

  const renderPastWorkItem = ({item}: {item: PastWorkItem}) => (
    <View style={styles.pastWork}>
      <Image source={{uri: item.imageUrl}} style={styles.imageSmall} />
      <Text style={styles.pastWorkText}>{item.name}</Text>
      <LinearGradient
        colors={['#F36117', '#0a040a']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={{borderRadius: 25}}>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Profile Photo */}
      <TouchableOpacity
        onPress={handleProfilePhotoChange}
        style={styles.profilePhotoContainer}>
        <Image source={{uri: profilePhoto}} style={styles.profilePhoto} />
      </TouchableOpacity>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <View style={styles.inputRow}>
          <Text>Phone:</Text>
          <TextInput
            style={styles.input}
            value={personalData.phone}
            editable={false} // Make this non-editable
          />
        </View>
        <View style={styles.inputRow}>
          <Text>Email:</Text>
          <TextInput
            style={styles.input}
            value={personalData.email}
            editable={false} // Make this non-editable
          />
        </View>
        <View style={styles.inputRow}>
          <Text>Address:</Text>
          <TextInput
            style={styles.input}
            value={personalData.address}
            editable={false} // Make this non-editable
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Past Works</Text>
        <FlatList
          data={pastWorks}
          renderItem={renderPastWorkItem}
          keyExtractor={item => item.id}
        />
      </View>

      <View style={styles.section}>
        <LinearGradient
          colors={['#F36117', '#0a040a']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={{borderRadius: 25}}>
          <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.05,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: width * 0.04,
  },
  profilePhotoContainer: {
    alignItems: 'center',
    marginBottom: width * 0.04,
  },
  profilePhoto: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: width * 0.125,
  },
  section: {
    marginVertical: width * 0.02,
    maxHeight: height * 0.3,
  },
  sectionTitle: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    marginBottom: width * 0.02,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: width * 0.03,
  },
  input: {
    marginLeft: width * 0.03,
    borderBottomWidth: 1,
    flex: 1,
    paddingBottom: width * 0.02,
  },
  pastWork: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: width * 0.03,
    backgroundColor: '#fff',
    marginBottom: width * 0.02,
    borderRadius: width * 0.02,
  },
  imageSmall: {
    width: width * 0.08,
    height: width * 0.08,
    borderRadius: width * 0.04,
  },
  pastWorkText: {
    flex: 1,
    marginLeft: width * 0.03,
  },
  editButton: {
    padding: width * 0.02,
    borderRadius: width * 0.02,
  },
  editButtonText: {
    color: '#fff',
  },
  logoutButton: {
    padding: width * 0.03,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: width * 0.045,
  },
});

export default ProfileScreen;
