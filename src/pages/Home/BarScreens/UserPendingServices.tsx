import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Dimensions,
  PixelRatio,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {useRoute} from '@react-navigation/native';
import Apiurl from '../../../Apiurl';

interface ServiceDetail {
  serviceId: string;
  businessName: string;
  operationDescription: string;
  requestDate: string;
  totalPrice: number;
  businessPhone: string;
  businessAddress: string;
  operationNames: string[];
}

const UserPendingServices = () => {
  const route = useRoute();
  const {serviceId} = route.params as {serviceId: string};
  const [serviceDetail, setServiceDetail] = useState<ServiceDetail | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(true);

  const {width: SCREEN_WIDTH} = Dimensions.get('window');
  const scale = SCREEN_WIDTH / 375;

  const normalize = (size: number) => {
    return Math.round(PixelRatio.roundToNearestPixel(size * scale));
  };
  console.log(serviceId);

  useEffect(() => {
    const fetchServiceDetail = async () => {
      try {
        const response = await axios.get(
          `${Apiurl}/api/Service/GetServiceDetailByUserSite/${serviceId}`,
        );

        if (response.data.isSuccess) {
          setServiceDetail(response.data.result);
        } else {
          Alert.alert('Error', 'Failed to load service details');
        }
      } catch (error) {
        console.error('Error fetching service details:', error);
        Alert.alert('Error', 'Could not retrieve service details.');
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetail();
  }, [serviceId]);

  const openMap = () => {
    if (serviceDetail) {
      const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        serviceDetail.businessAddress,
      )}`;
      Alert.alert('Navigating to:', mapUrl);
    }
  };

  const openPhone = () => {
    if (serviceDetail) {
      Alert.alert('Calling:', serviceDetail.businessPhone);
    }
  };

  const handleComplete = () => {
    Alert.alert('Info', 'Appointment confirmed.');
  };

  const handleReject = () => {
    Alert.alert('Info', 'Appointment rejected.');
  };

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
    );
  }

  if (!serviceDetail) {
    return <Text style={styles.errorText}>İş Detaylarına Ulaşılamıyor</Text>;
  }

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>İş Detayları</Text>
        <Text style={styles.Secondtitle}>
          (İŞYERİNİN RANDEVUYU ONAYLAMASI BEKLENİYOR)
        </Text>
        <View style={styles.section}>
          <Text style={styles.label}>İşyeri İsmi:</Text>
          <Text style={styles.value}>{serviceDetail.businessName}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Talep Edilen Hizmetler:</Text>
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
          <Text style={styles.label}>İş Yeri Adres ve Telefon Numarası:</Text>
          <View style={styles.iconRow}>
            <Text style={styles.value}>{serviceDetail.businessAddress}</Text>
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
            <Text style={styles.value}>{serviceDetail.businessPhone}</Text>
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
          <Text style={styles.label}>Total Price:</Text>
          <Text style={styles.value}>{`${serviceDetail.totalPrice} TL`}</Text>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.completeButton, {backgroundColor: '#FF5733'}]}
            onPress={handleReject}>
            <Text style={styles.buttonText}>Randevuyu İptal Et</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  Secondtitle: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'green',
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
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});

export default UserPendingServices;
