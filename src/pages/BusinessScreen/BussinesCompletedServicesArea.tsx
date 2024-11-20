import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {TokenService} from '../../TokenService';
import {RootStackParamList} from '../../types';
import {NavigationProp} from '@react-navigation/native';
import axios from 'axios';
import Apiurl from '../../Apiurl';

interface Appointment {
  serviceId: string;
  userFirstName: string;
  userLastName: string;
  requestDate: string;
  totalPrice: number;
  status: string;
}

const BussinesPendingServicesArea = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const navigation: NavigationProp<RootStackParamList> = useNavigation();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // TokenService'den OwnerId'yi alıyoruz
        const decodedToken = await TokenService.decodeToken();
        const OwnerId = decodedToken?.nameid;

        if (OwnerId) {
          // Backend'den veriyi çekiyoruz
          const response = await axios.post(
            `${Apiurl}/api/Service/GetServicesByOwnerIdAndStatus/${OwnerId}`,
            {StatusValue: 3},
          );

          if (response.data.isSuccess) {
            setAppointments(response.data.result);
          }
        }
      } catch (error) {
        console.error('Veriler alınırken hata oluştu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleAppointmentPress = (serviceId: string) => {
    navigation.navigate('BussinesCompletedServiceDetails', {serviceId});
  };

  const renderAppointment = ({item}: {item: Appointment}) => (
    <TouchableOpacity
      style={styles.appointmentContainer}
      onPress={() => handleAppointmentPress(item.serviceId)}>
      <Text style={styles.userName}>
        {item.userFirstName} {item.userLastName}
      </Text>
      <Text style={styles.date}>
        Tarih: {new Date(item.requestDate).toLocaleDateString()}
      </Text>
      <Text style={styles.time}>
        Saat: {new Date(item.requestDate).toLocaleTimeString()}
      </Text>
      <Text style={styles.price}>Toplam Tutar: {item.totalPrice} TL</Text>
      <Text style={styles.status}>Durum: {item.status}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Randevularınız</Text>
      <FlatList
        data={appointments}
        keyExtractor={item => item.serviceId}
        renderItem={renderAppointment}
        contentContainerStyle={appointments.length === 0 && styles.emptyList}
        ListEmptyComponent={<Text>Henüz bir randevunuz bulunmamaktadır.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  appointmentContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 16,
    color: '#555',
  },
  time: {
    fontSize: 16,
    color: '#555',
  },
  price: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  status: {
    fontSize: 16,
    color: '#666',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BussinesPendingServicesArea;
