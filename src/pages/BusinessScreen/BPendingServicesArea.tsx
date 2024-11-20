import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  GestureResponderEvent,
  BackHandler,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {TokenService} from '../../TokenService';
import {RootStackParamList} from '../../types';
import {NavigationProp} from '@react-navigation/native';
import axios from 'axios';
import Apiurl from '../../Apiurl';
import {useFocusEffect} from '@react-navigation/native';

interface Appointment {
  serviceId: string;
  userFirstName: string;
  userLastName: string;
  requestDate: string;
  totalPrice: number;
  status: string;
}

const BPendingServicesArea = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.goBack();
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [navigation]),
  );

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const decodedToken = await TokenService.decodeToken();
        const OwnerId = decodedToken?.nameid;

        if (OwnerId) {
          const response = await axios.post(
            `${Apiurl}/api/Service/GetServicesByOwnerIdAndStatus/${OwnerId}`,
            {StatusValue: 1},
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

  const handleAppointmentPress = (
    serviceId: string,
    event: GestureResponderEvent,
  ) => {
    if (event && event.defaultPrevented) return; // kaydırma olayında tetiklememek için
    navigation.navigate('BPendingServiceDetails', {serviceId});
  };

  const renderAppointment = ({item}: {item: Appointment}) => (
    <TouchableOpacity
      style={styles.appointmentContainer}
      activeOpacity={0.8}
      onPress={event => handleAppointmentPress(item.serviceId, event)}
      delayPressIn={150}>
      <Image source={require('../../images/Logo.png')} style={styles.logo} />
      <View style={styles.textContainer}>
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
    marginTop: 20,
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
    position: 'relative',
    marginTop: 40,
  },
  logo: {
    width: 50,
    height: 50,
    position: 'absolute',
    top: -25,
    left: '50%',
    transform: [{translateX: -15}],
  },
  textContainer: {
    marginTop: 30,
    alignItems: 'flex-start',
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

export default BPendingServicesArea;
