import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
  Dimensions,
  PixelRatio,
  BackHandler,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RouteProp, useRoute, useNavigation} from '@react-navigation/native';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../types';
import Apiurl from '../../Apiurl';
import {useFocusEffect} from '@react-navigation/native';

interface ServiceDetail {
  serviceId: string;
  userFirstName: string;
  userLastName: string;
  operationDescription: string;
  requestDate: string;
  totalPrice: number;
  customerPhone: string;
  customerAddress: string;
  operationNames: string[];
}

const BussinesActivitiedServiceDetails = () => {
  const route = useRoute<RouteProp<{params: {serviceId: string}}>>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {serviceId} = route.params;

  const [serviceDetail, setServiceDetail] = useState<ServiceDetail | null>(
    null,
  );
  const {width: SCREEN_WIDTH} = Dimensions.get('window');
  const scale = SCREEN_WIDTH / 375;
  const normalize = (size: number) =>
    Math.round(PixelRatio.roundToNearestPixel(size * scale));
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
    const fetchServiceDetail = async () => {
      try {
        const response = await fetch(
          `${Apiurl}/api/Service/GetServiceDetailBusinessAndİndividualSellerSite/${serviceId}`,
        );
        const data = await response.json();
        if (data.isSuccess) {
          setServiceDetail(data.result);
        } else {
          Alert.alert('Hata', 'Servis detayları alınamadı.');
        }
      } catch (error) {
        console.error('Veri çekme hatası:', error);
        Alert.alert('Hata', 'Servis verileri alınırken bir sorun oluştu.');
      }
    };
    fetchServiceDetail();
  }, [serviceId]);

  const openMap = () => {
    if (serviceDetail) {
      const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        serviceDetail.customerAddress,
      )}`;
      Linking.openURL(mapUrl);
    }
  };

  const openPhone = () => {
    if (serviceDetail) {
      Linking.openURL(`tel:${serviceDetail.customerPhone}`);
    }
  };

  const handleServiceStatusUpdate = async (statusValue: number) => {
    try {
      const response = await fetch(
        `${Apiurl}/api/Service/UpdateServiceStatus/${serviceId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({serviceId, statusvalue: statusValue}),
        },
      );
      const data = await response.json();
      if (data.isSuccess) {
        Alert.alert(
          'Başarılı',
          `İş ${statusValue === 2 ? 'kabul edildi' : 'Tamamlandı'}.`,
        );
        navigation.navigate('NonBusinessHomeScreen');
      } else {
        Alert.alert('Hata', 'İşlem gerçekleştirilemedi.');
      }
    } catch (error) {
      console.error('Hata:', error);
      Alert.alert('Hata', 'Bir hata oluştu.');
    }
  };

  if (!serviceDetail) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Randevu Detayları</Text>
        <View style={styles.section}>
          <Text style={styles.label}>Ad Soyad:</Text>
          <Text style={styles.value}>
            {`${serviceDetail.userFirstName} ${serviceDetail.userLastName}`}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Operasyonlar:</Text>
          {serviceDetail.operationNames.map((operation, index) => (
            <Text key={index} style={styles.value}>
              - {operation}
            </Text>
          ))}
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Açıklama:</Text>
          <Text style={styles.value}>{serviceDetail.operationDescription}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Tarih:</Text>
          <Text style={styles.value}>{serviceDetail.requestDate}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Toplam Tutar:</Text>
          <Text style={styles.value}>{serviceDetail.totalPrice} ₺</Text>
        </View>
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>Telefon:</Text>
            <TouchableOpacity onPress={openPhone}>
              <Ionicons name="call" size={20} color="blue" />
            </TouchableOpacity>
          </View>
          <Text style={styles.value}>{serviceDetail.customerPhone}</Text>
        </View>
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>Adres:</Text>
            <TouchableOpacity onPress={openMap}>
              <Ionicons name="location" size={20} color="blue" />
            </TouchableOpacity>
          </View>
          <Text style={styles.value}>{serviceDetail.customerAddress}</Text>
        </View>

        <TouchableOpacity
          style={styles.acceptButton}
          onPress={() => handleServiceStatusUpdate(3)}>
          <Text style={styles.buttonText}>İş Tamamlandı</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  container: {
    flex: 1,
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  section: {
    marginBottom: 20,
  },
  acceptButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 5,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#666',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default BussinesActivitiedServiceDetails;
