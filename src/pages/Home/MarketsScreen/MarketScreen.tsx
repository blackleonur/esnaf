import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Image,
  Dimensions,
  PixelRatio,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import {RootStackParamList} from '../../../types';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import Apiurl from '../../../Apiurl';

// Ekran boyutlarını almak için Dimensions kullanıyoruz
const {width, height} = Dimensions.get('window');

// Dinamik boyutlar için oranları hesaplayalım
const scale = width / 375;

const normalize = (size: number) => {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

type Service = {
  pricingId: string;
  operationName: string;
  price: number;
  quantity: number;
};

type SelectedService = {
  pricingId: string;
  operationName: string;
  quantity: number;
  price: number;
};

type MeetingScreenParams = {
  selectedServices: SelectedService[];
};

const MarketScreen = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>(
    [],
  );
  const [supplierInfo, setSupplierInfo] = useState<{
    name: string;
    phone: string;
    address: string;
    photoUrl?: string;
    averageRating?: number;
  }>({name: '', phone: '', address: '', photoUrl: '', averageRating: 0});

  const route = useRoute();
  const navigation = useNavigation<MarketScreenNavigationProp>();
  const {ownerId} = route.params as {ownerId: string};

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          `${Apiurl}/api/Profile/GetProfileByOwnerIdAsync/${ownerId}`,
        );
        if (response.data.isSuccess) {
          setServices(response.data.result.pricingListDto);
          setSupplierInfo({
            name: response.data.result.supplierName,
            phone: response.data.result.supplierPhone,
            address: response.data.result.supplierAdress,
            photoUrl:
              response.data.result.supplierPhotoUrl ||
              'https://via.placeholder.com/150',
            averageRating: response.data.result.averageRating,
          });
        }
      } catch (error) {
        console.error('Servis verileri alınırken hata oluştu:', error);
      }
    };
    fetchServices();
  }, [ownerId]);

  const updateQuantity = (pricingId: string, delta: number) => {
    setServices(prevServices =>
      prevServices.map(service =>
        service.pricingId === pricingId
          ? {...service, quantity: Math.max(1, service.quantity + delta)}
          : service,
      ),
    );

    setSelectedServices(prevSelectedServices =>
      prevSelectedServices.map(service =>
        service.pricingId === pricingId
          ? {...service, quantity: Math.max(1, service.quantity + delta)}
          : service,
      ),
    );
  };

  const handleSelectService = (service: Service) => {
    setSelectedServices(prevSelectedServices => {
      const exists = prevSelectedServices.find(
        s => s.pricingId === service.pricingId,
      );
      if (exists) {
        return prevSelectedServices.filter(
          s => s.pricingId !== service.pricingId,
        );
      } else {
        return [...prevSelectedServices, {...service}];
      }
    });
  };

  const handlePhonePress = () => {
    Linking.openURL(`tel:${0 + supplierInfo.phone}`);
  };

  const handleAddressPress = () => {
    const query = encodeURIComponent(supplierInfo.address);
    Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${query}`);
  };

  type MarketScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'MarketScreen'
  >;

  const goToMeetingScreen = () => {
    navigation.navigate('MeetingScreen', {
      ownerId,
      selectedServices: selectedServices.map(
        ({pricingId, operationName, quantity, price}) => ({
          pricingId,
          operationName,
          quantity,
          price,
        }),
      ),
    });
  };
  const goToCommentScreen = () => {
    navigation.navigate('CommentScreen', {
      ownerId,
    });
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
      <TouchableOpacity onPress={goToCommentScreen}>
        <View style={styles.starsContainer}>
          {[...Array(fullStars)].map((_, index) => (
            <Icon
              key={`full-${index}`}
              name="star"
              size={normalize(20)}
              color="#FFD700"
            />
          ))}
          {halfStar === 1 && (
            <Icon name="star-half-full" size={normalize(20)} color="#FFD700" />
          )}
          {[...Array(emptyStars)].map((_, index) => (
            <Icon
              key={`empty-${index}`}
              name="star-o"
              size={normalize(20)}
              color="#FFD700"
            />
          ))}
          <Text style={styles.averageRatingText}>{rating.toFixed(1)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{supplierInfo.name}</Text>
      {supplierInfo.photoUrl ? (
        <Image
          source={{uri: supplierInfo.photoUrl}}
          style={styles.supplierImage}
        />
      ) : null}
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingLabel}>Yorum ve Puan</Text>
        {renderStars(supplierInfo.averageRating || 0)}
      </View>

      <FlatList
        data={services}
        keyExtractor={(item, index) => item.pricingId + index.toString()}
        renderItem={({item}) => (
          <View style={styles.serviceContainer}>
            <Text style={styles.serviceName}>
              {item.operationName}: {item.price} ₺
            </Text>
            <View style={styles.controls}>
              <TouchableOpacity
                onPress={() => updateQuantity(item.pricingId, -1)}>
                <Text style={styles.controlButton}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantity}>{item.quantity}</Text>
              <TouchableOpacity
                onPress={() => updateQuantity(item.pricingId, 1)}>
                <Text style={styles.controlButton}>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => handleSelectService(item)}>
              <Text
                style={
                  selectedServices.some(s => s.pricingId === item.pricingId)
                    ? styles.selected
                    : styles.selectButton
                }>
                {selectedServices.some(s => s.pricingId === item.pricingId)
                  ? 'Seçildi'
                  : 'Seç'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        style={styles.flatList}
      />

      <TouchableOpacity onPress={goToMeetingScreen} style={styles.button}>
        <Text style={styles.buttonText}>RANDEVU OLUŞTUR</Text>
      </TouchableOpacity>
      <View style={styles.infoCard}>
        <Text style={styles.infoText}> Telefon : 0{supplierInfo.phone}</Text>
        <TouchableOpacity onPress={handlePhonePress}>
          <Icon
            name="phone"
            size={normalize(24)}
            color="#3b5998"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoText}>Adres:{supplierInfo.address}</Text>
        <TouchableOpacity onPress={handleAddressPress}>
          <Icon
            name="map-marker"
            size={normalize(24)}
            color="#3b5998"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: normalize(16),
    backgroundColor: '#f5f5f5',
  },
  supplierImage: {
    width: '60%',
    height: normalize(200),
    resizeMode: 'cover',
    borderRadius: normalize(175),
    marginBottom: normalize(5),
    marginTop: normalize(5),
    alignSelf: 'center',
  },
  header: {
    fontSize: normalize(24),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: normalize(10),
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: normalize(15),
    marginVertical: normalize(5),
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 1},
    elevation: 2,
  },
  icon: {
    marginHorizontal: normalize(10),
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(10),
  },
  ratingLabel: {
    fontSize: normalize(16),
    fontWeight: 'bold',
    marginRight: normalize(10),
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  averageRatingText: {
    fontSize: normalize(16),
    fontWeight: 'bold',
    color: '#333',
    marginLeft: normalize(10),
  },

  infoText: {
    flex: 1,
    fontSize: normalize(16),
  },
  serviceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: normalize(10),
    marginVertical: normalize(5),
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 1},
    elevation: 2,
    marginBottom: normalize(10),
  },
  serviceName: {
    fontSize: normalize(16),
    fontWeight: '600',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButton: {
    fontSize: normalize(20),
    width: normalize(30),
    textAlign: 'center',
    color: '#3b5998',
  },
  quantity: {
    fontSize: normalize(16),
    marginHorizontal: normalize(10),
  },
  selectButton: {
    color: '#3b5998',
    fontWeight: '600',
  },
  selected: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#3b5998',
    alignSelf: 'center',
    padding: normalize(10),
    marginVertical: normalize(15),
    borderRadius: 8,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 1},
    elevation: 2,
  },
  buttonText: {
    fontSize: normalize(16),
    color: '#fff',
  },
  flatList: {
    maxHeight: normalize(190),
  },
});

export default MarketScreen;
