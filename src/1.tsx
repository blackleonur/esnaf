import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import {RootStackParamList} from '../../../types';
import {StackNavigationProp} from '@react-navigation/stack';

type Service = {
  pricingId: string;
  operationName: string;
  price: number;
  quantity: number;
};

// Seçilen servis öğesi için bir tip tanımlıyoruz
type SelectedService = {
  pricingId: string;
  operationName: string;
  quantity: number;
  price: number;
};

// MeetingScreen'e gönderilecek parametrelerin tipi
type MeetingScreenParams = {
  selectedServices: SelectedService[];
};

const MarketScreen = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>(
    [],
  );
  const route = useRoute();
  const navigation = useNavigation<MarketScreenNavigationProp>();
  const {ownerId} = route.params as {ownerId: string};

  useEffect(() => {
    // Backend'den servis verilerini getir
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          `http://10.0.2.2:5150/api/Profile/GetProfileByOwnerIdAsync/${ownerId}`,
        );
        if (response.data.isSuccess) {
          setServices(response.data.result);
        }
      } catch (error) {
        console.error('Servis verileri alınırken hata oluştu:', error);
      }
    };
    fetchServices();
  }, [ownerId]);

  // Servisin miktarını güncelle
  const updateQuantity = (pricingId: string, delta: number) => {
    setServices(prevServices =>
      prevServices.map(service =>
        service.pricingId === pricingId
          ? {...service, quantity: Math.max(1, service.quantity + delta)}
          : service,
      ),
    );
  };

  // Servis seçimini işleme
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

  type MarketScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'MarketScreen'
  >;
  // MeetingScreen'e seçilen servisleri yönlendirme
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
      ) as {
        pricingId: string;
        operationName: string;
        quantity: number;
        price: number;
      }[],
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>onur tesisat</Text>
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
      />

      <Button title="RANDEVU OLUŞTUR" onPress={goToMeetingScreen} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  serviceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 1},
    elevation: 2,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButton: {
    fontSize: 20,
    width: 30,
    textAlign: 'center',
    color: '#007BFF',
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  selectButton: {
    color: '#007BFF',
    fontWeight: '600',
  },
  selected: {
    color: '#4CAF50',
    fontWeight: '600',
  },
});

export default MarketScreen;
