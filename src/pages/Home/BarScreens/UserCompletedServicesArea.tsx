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
import {TokenService} from '../../../TokenService';
import axios from 'axios';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../../types';
import Apiurl from '../../../Apiurl';

interface Appointment {
  serviceId: string;
  businessName: string;
  requestDate: string;
  totalPrice: number;
  businessId: string;
}

const UserCompletedServicesArea = ({route}: {route: any}) => {
  const {serviceId} = route.params;
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const decodedToken = await TokenService.decodeToken();
        const userId = decodedToken?.nameid;

        if (userId) {
          const response = await axios.post(
            `${Apiurl}/api/Service/GetServiceByUserIdAndStatus/${userId}`,
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

  const handlePress = (serviceId: string, businessId: string) => {
    navigation.navigate('UserCompletedServices', {
      serviceId,
      bussinessId: businessId, // Update this line
    });
  };

  const renderAppointment = ({item}: {item: Appointment}) => (
    <TouchableOpacity
      onPress={() => handlePress(item.serviceId, item.businessId)}>
      <View style={styles.appointmentContainer}>
        <Text style={styles.businessName}>{item.businessName}</Text>
        <Text style={styles.date}>
          Tarih: {new Date(item.requestDate).toLocaleDateString()}
        </Text>
        <Text style={styles.time}>
          Saat: {new Date(item.requestDate).toLocaleTimeString()}
        </Text>
        <Text style={styles.price}>Toplam Tutar: {item.totalPrice} TL</Text>
      </View>
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
  businessName: {
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

export default UserCompletedServicesArea;
