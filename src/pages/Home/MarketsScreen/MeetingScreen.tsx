import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../../types';
import {TokenService} from '../../../TokenService';
import Apiurl from '../../../Apiurl';

type MeetingScreenRouteProp = RouteProp<RootStackParamList, 'MeetingScreen'>;

interface Service {
  operationName: string;
  quantity: number;
  price: number;
  pricingId: string; // Doğrudan pricingId olarak kullanıyoruz
}

const MeetingScreen = () => {
  const route = useRoute<MeetingScreenRouteProp>();
  const {ownerId, selectedServices: initialSelectedServices} = route.params;
  const [selectedServices, setSelectedServices] = useState<Service[]>(
    initialSelectedServices,
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [description, setDescription] = useState('');
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const decodedToken = await TokenService.decodeToken();
      if (decodedToken) {
        setUserInfo(decodedToken);
      } else {
        Alert.alert(
          'Hata',
          'Kullanıcı bilgileri alınamadı. Lütfen tekrar giriş yapınız.',
        );
      }
    };
    fetchUserInfo();
  }, []);

  const calculateTotalPrice = () => {
    return selectedServices.reduce(
      (total, service) => total + service.price * service.quantity,
      0,
    );
  };

  const increaseQuantity = (index: number) => {
    const updatedServices = [...selectedServices];
    updatedServices[index].quantity += 1;
    setSelectedServices(updatedServices);
  };

  const decreaseQuantity = (index: number) => {
    const updatedServices = [...selectedServices];
    if (updatedServices[index].quantity > 1) {
      updatedServices[index].quantity -= 1;
      setSelectedServices(updatedServices);
    }
  };

  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const saveMeeting = async () => {
    if (!selectedDate || !userInfo?.nameid) {
      Alert.alert(
        'Eksik Bilgi',
        'Lütfen tarih seçin ve kullanıcı bilgilerini kontrol edin.',
      );
      return;
    }

    const requestBody = {
      operationDescription: description,
      creationDate: selectedDate.toISOString(),
      totalPrice: calculateTotalPrice(),
      ownerId,
      userId: userInfo.nameid,
      pricingsWithQuantities: selectedServices.map(service => ({
        pricingId: service.pricingId, // pricingId olarak kullanıyoruz
        quantity: service.quantity,
        unitPrice: service.price * service.quantity,
      })),
    };

    try {
      const response = await fetch('${Apiurl}/api/Service/AddService', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        Alert.alert('Başarılı', 'Randevu başarıyla kaydedildi!');
      } else {
        const errorData = await response.json();
        Alert.alert('Hata', `Randevu kaydedilemedi: ${errorData.message}`);
      }
    } catch (error) {
      Alert.alert(
        'Hata',
        'Randevu kaydedilemedi. Lütfen bağlantınızı kontrol edin.',
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seçili Hizmetler:</Text>
      <FlatList
        data={selectedServices}
        keyExtractor={item => item.pricingId}
        renderItem={({item, index}) => (
          <View style={styles.serviceItem}>
            <Text style={styles.serviceText}>
              {item.operationName} - {item.quantity} adet - ₺
              {item.price * item.quantity}
            </Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                onPress={() => decreaseQuantity(index)}
                style={styles.button}>
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{item.quantity}</Text>
              <TouchableOpacity
                onPress={() => increaseQuantity(index)}
                style={styles.button}>
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <Text style={styles.totalPriceText}>
        Toplam Ücret: ₺{calculateTotalPrice()}
      </Text>

      <Text style={styles.label}>Randevu Başlangıç Tarihi:</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Text style={styles.dateText}>
          {selectedDate ? selectedDate.toLocaleDateString() : 'Tarih Seçin'}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <Text style={styles.label}>Açıklama:</Text>
      <TextInput
        style={styles.descriptionInput}
        placeholder="Randevu için bir açıklama girin"
        multiline
        value={description}
        onChangeText={setDescription}
      />

      <View style={styles.buttonContainer}>
        <Button
          title="Randevuyu Kaydet"
          onPress={saveMeeting}
          color="#3b5998"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  serviceItem: {
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
  serviceText: {
    fontSize: 16,
    color: '#555',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  button: {
    width: 30,
    height: 30,
    backgroundColor: '#3b5998',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  totalPriceText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 16,
    color: '#333',
  },
  label: {
    fontSize: 16,
    marginTop: 16,
    marginBottom: 8,
    color: '#333',
  },
  dateText: {
    fontSize: 16,
    color: '#3b5998',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    textAlign: 'center',
  },
  descriptionInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#ffffff',
    textAlignVertical: 'top',
    height: 100,
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 16,
  },
  userInfoContainer: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#ffffff',
    borderRadius: 8,
  },
  userInfoText: {
    fontSize: 16,
    color: '#333',
  },
});

export default MeetingScreen;
