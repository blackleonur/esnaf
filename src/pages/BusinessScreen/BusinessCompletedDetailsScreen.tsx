import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
  Alert,
  Dimensions,
  PixelRatio,
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

const scale = Dimensions.get('window').width / 375;
const normalize = (size: number) => {
  return Math.round(PixelRatio.roundToNearestPixel(size * scale));
};

const BussinesCompletedDetails = () => {
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
          `${Apiurl}/api/Service/GetServiceDetail/${serviceId}`,
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

  const deleteService = async () => {
    try {
      const response = await fetch(
        `${Apiurl}/api/Service/DeleteService/${serviceId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const data = await response.json();
      if (data.isSuccess) {
        Alert.alert('Bilgi', 'Tamamlanan iş başarıyla silindi.', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('BussinesHomeScreen'),
          },
        ]);
      } else {
        Alert.alert('Hata', 'İş silinemedi.');
      }
    } catch (error) {
      console.error('Silme hatası:', error);
      Alert.alert('Hata', 'İş silinirken bir sorun oluştu.');
    }
  };

  const confirmDelete = () => {
    Alert.alert('Onay', 'Tamamlanan işi silmek istediğinize emin misiniz?', [
      {text: 'Vazgeç', style: 'cancel'},
      {text: 'Tamam', onPress: deleteService},
    ]);
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
                size={normalize(24)}
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
                size={normalize(24)}
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
            onPress={confirmDelete}>
            <Text style={styles.buttonText}>Tamamlanan İşi Sil</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    padding: normalize(20),
    backgroundColor: '#f8f8f8',
  },
  container: {
    flex: 1,
    padding: normalize(20),
    borderRadius: normalize(10),
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: normalize(5),
    elevation: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: normalize(24),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: normalize(20),
    color: '#333',
  },
  section: {
    marginBottom: normalize(20),
  },
  label: {
    fontSize: normalize(16),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: normalize(5),
  },
  value: {
    fontSize: normalize(16),
    color: '#666',
    marginBottom: normalize(5),
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(5),
  },
  icon: {
    marginLeft: normalize(10),
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  completeButton: {
    backgroundColor: '#FF5733',
    paddingVertical: normalize(10),
    borderRadius: normalize(5),
    alignItems: 'center',
    marginTop: normalize(20),
    flex: 1,
  },
  buttonText: {
    fontSize: normalize(16),
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default BussinesCompletedDetails;
