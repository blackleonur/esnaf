import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Linking,
  Dimensions,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../types';

interface Pricing {
  operationName: string;
  price: number;
  quantity: number;
  id: string; // Ensure the pricing item has an 'id' field for identification
}

interface BusinessProfile {
  supplierName: string;
  supplierPhone: string;
  supplierAdress: string;
  pricingListDto: Pricing[];
}

type MarketScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MarketScreen'
>;

const MarketScreen = ({route}: {route: any}) => {
  const {ownerId} = route.params;
  const navigation = useNavigation<MarketScreenNavigationProp>();

  const [profileData, setProfileData] = useState<BusinessProfile | null>(null);
  const [selectedServices, setSelectedServices] = useState<
    {operationName: string; quantity: number; id: string; price: number}[]
  >([]);

  const {width, height} = Dimensions.get('window');

  useEffect(() => {
    fetchProfileData(ownerId);
  }, [ownerId]);

  const fetchProfileData = async (ownerId: string) => {
    try {
      const response = await fetch(
        `http://10.0.2.2:5150/api/Profile/GetProfileByOwnerIdAsync/${ownerId}`,
      );
      const data = await response.json();
      if (data.isSuccess) {
        setProfileData(data.result);
      }
    } catch (error) {
      console.error('Failed to fetch profile data:', error);
    }
  };

  const handleServiceQuantityChange = (
    operationName: string,
    delta: number,
    id: string,
    price: number, // Price parameter added here
  ) => {
    setSelectedServices(prevSelectedServices => {
      const updatedServices = [...prevSelectedServices];
      const index = updatedServices.findIndex(
        service => service.operationName === operationName,
      );

      if (index !== -1) {
        updatedServices[index].quantity += delta;
        if (updatedServices[index].quantity <= 0) {
          updatedServices.splice(index, 1);
        }
      } else if (delta > 0) {
        updatedServices.push({operationName, quantity: delta, id, price});
      }
      return updatedServices;
    });
  };

  const handleCallPress = (phoneNumber: string) => {
    Linking.openURL(`tel: ${0 + phoneNumber}`).catch(err =>
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

  const handleCreateMeetingPress = () => {
    navigation.navigate('MeetingScreen', {
      ownerId,
      selectedServices: selectedServices.map(service => ({
        operationName: service.operationName,
        quantity: service.quantity,
        id: service.id,
        price: service.price, // Price field added here
      })),
      profileData,
    });
  };

  return (
    <View style={style.container}>
      {profileData && (
        <>
          <View style={style.headerContainer}>
            <Text style={style.headerText}>{profileData.supplierName}</Text>
            <Image
              style={style.image}
              source={{uri: 'https://via.placeholder.com/150'}}
            />
          </View>

          <View style={style.flatListContainer}>
            <FlatList
              data={profileData.pricingListDto}
              keyExtractor={item => item.id}
              renderItem={({item}) => {
                const service = selectedServices.find(
                  service => service.operationName === item.operationName,
                );
                const quantity = service ? service.quantity : 0;

                return (
                  <View style={style.priceItem}>
                    <Text style={style.priceText}>
                      {item.operationName}: {item.price} ₺
                    </Text>
                    <View style={style.counterContainer}>
                      <TouchableOpacity
                        onPress={() =>
                          handleServiceQuantityChange(
                            item.operationName,
                            -1,
                            item.id,
                            item.price,
                          )
                        }>
                        <Icon name="minus" size={20} color="#3b5998" />
                      </TouchableOpacity>
                      <Text style={style.quantityText}>{quantity}</Text>
                      <TouchableOpacity
                        onPress={() =>
                          handleServiceQuantityChange(
                            item.operationName,
                            1,
                            item.id,
                            item.price,
                          )
                        }>
                        <Icon name="plus" size={20} color="#3b5998" />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
            />
          </View>

          <View style={style.buttonContainer}>
            <Button
              title="Randevu Oluştur"
              onPress={handleCreateMeetingPress}
              color="#3b5998"
            />
          </View>

          <View style={style.infoContainer}>
            <View style={style.infoRow}>
              <Text style={style.infoText}>
                Telefon: {profileData.supplierPhone}
              </Text>
              <TouchableOpacity
                onPress={() => handleCallPress(profileData.supplierPhone)}>
                <Icon
                  name="phone"
                  size={24}
                  color="#3b5998"
                  style={style.icon}
                />
              </TouchableOpacity>
            </View>
            <View style={style.infoRow}>
              <Text style={style.infoText}>
                Adres: {profileData.supplierAdress}
              </Text>
              <TouchableOpacity
                onPress={() => handleLocationPress(profileData.supplierAdress)}>
                <Icon
                  name="map-marker"
                  size={24}
                  color="#3b5998"
                  style={style.icon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    fontSize: Dimensions.get('window').width * 0.06,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  image: {
    width: Dimensions.get('window').width * 0.4,
    height: Dimensions.get('window').width * 0.4,
    borderRadius: Dimensions.get('window').width * 0.2,
    marginBottom: 12,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  flatListContainer: {
    maxHeight: Dimensions.get('window').height * 0.3,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 16,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  infoContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  infoText: {
    fontSize: Dimensions.get('window').width * 0.045,
    color: '#333',
  },
  icon: {
    marginLeft: 8,
  },
  priceItem: {
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  priceText: {
    fontSize: Dimensions.get('window').width * 0.045,
    color: '#555',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#333',
  },
});

export default MarketScreen;
