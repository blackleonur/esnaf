import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RouteProp, useRoute, useNavigation} from '@react-navigation/native';
import Apiurl from '../../Apiurl';

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

const BussinesPendingServiceDetails = () => {
  const route = useRoute<RouteProp<{params: {serviceId: string}}>>();
  const {serviceId} = route.params;
  const [serviceDetail, setServiceDetail] = useState<ServiceDetail | null>(
    null,
  );
  interface NavigationProp {
    navigate: (routeName: string) => void;
  }
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const fetchServiceDetail = async () => {
      try {
        const response = await fetch(
          `${Apiurl}/api/GetServiceDetailBusinessAndİndividualSellerSite/${serviceId}`,
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

  const updateServiceStatus = async (statusValue: number) => {
    console.log(`Gönderilen Status: ${statusValue}`);

    try {
      const response = await fetch(
        `GetServiceDetailBusinessAndİndividualSellerSite/{serviceId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const data = await response.json();
      if (data.isSuccess) {
        Alert.alert(
          'Bilgi',
          statusValue === 3
            ? 'İş tamamlandı olarak işaretlendi.'
            : 'Durum güncellendi.',
        );

        navigation.navigate('BussinesHomeScreen');
      } else {
        Alert.alert('Hata', 'Durum güncellenemedi.');
      }
    } catch (error) {
      console.error('Durum güncelleme hatası:', error);
      Alert.alert('Hata', 'Durum güncellenirken bir sorun oluştu.');
    }
  };

  const handleComplete = () => {
    updateServiceStatus(3); // İş tamamlandı olarak işaretlemek için 3 gönderiyoruz
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
          <Text style={styles.label}>Yapılacak İşler:</Text>
          <FlatList
            data={serviceDetail.operationNames}
            renderItem={({item, index}) => (
              <Text style={styles.value}>{`${index + 1}. ${item}`}</Text>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>İş Açıklaması:</Text>
          <Text style={styles.value}>{serviceDetail.operationDescription}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Tarih:</Text>
          <Text style={styles.value}>
            {new Date(serviceDetail.requestDate).toLocaleDateString()}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Adres ve Telefon:</Text>
          <View style={styles.iconRow}>
            <Text style={styles.value}>{serviceDetail.customerAddress}</Text>
            <TouchableOpacity onPress={openMap}>
              <Ionicons
                name="map-outline"
                size={24}
                color="blue"
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.iconRow}>
            <Text style={styles.value}>0{serviceDetail.customerPhone}</Text>
            <TouchableOpacity onPress={openPhone}>
              <Ionicons
                name="call-outline"
                size={24}
                color="green"
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Toplam Fiyat:</Text>
          <Text style={styles.value}>{`${serviceDetail.totalPrice} TL`}</Text>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.completeButton}
            onPress={handleComplete}>
            <Text style={styles.buttonText}>İş Tamamlandı</Text>
          </TouchableOpacity>
        </View>
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
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  icon: {
    marginLeft: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  completeButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default BussinesPendingServiceDetails;
