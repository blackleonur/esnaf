import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Switch,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {NavigationProp, RouteProp, useRoute} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {TokenService} from '../../TokenService';

const {width, height} = Dimensions.get('window');

type RootStackParamList = {
  PriceEntryScreen: {storeId: string};
};

interface PricingItem {
  id: string;
  operationName: string;
  price: number;
  quantity: number;
  enabled: boolean;
}

const PriceEntryScreen: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'PriceEntryScreen'>>();
  const {storeId} = route.params;
  const navigation = useNavigation<NavigationProp<any>>();

  const [pricingData, setPricingData] = useState<PricingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [newServiceLabel, setNewServiceLabel] = useState('');
  const [originalData, setOriginalData] = useState<PricingItem[]>([]);

  useEffect(() => {
    const fetchPricingData = async () => {
      try {
        const response = await axios.get(
          `http://10.0.2.2:5150/api/Pricing/GetPricingWithStoreId/${storeId}`,
        );
        const pricing = response.data.result.map(
          (item: {operationName: string; price: number; quantity: number}) => ({
            id: Math.random().toString(),
            operationName: item.operationName,
            price: item.price,
            quantity: item.quantity,
            enabled: true,
          }),
        );
        setPricingData(pricing);
        setOriginalData(pricing);
        setLoading(false);
      } catch (error) {
        console.error('Fiyat verileri getirilemedi:', error);
        setLoading(false);
      }
    };

    fetchPricingData();
  }, [storeId]);

  const handleValueChange = (id: string, newValue: number) => {
    setPricingData(prevData =>
      prevData.map(item =>
        item.id === id
          ? {...item, price: isNaN(newValue) ? 0 : newValue}
          : item,
      ),
    );
  };

  const handleSave = () => {
    if (newServiceLabel.trim()) {
      const newService: PricingItem = {
        id: Math.random().toString(),
        operationName: newServiceLabel,
        price: 0,
        quantity: 1,
        enabled: true,
      };
      setPricingData([...pricingData, newService]);
      setNewServiceLabel('');
    }
    Alert.alert('Başarılı', 'Veriler başarıyla kaydedildi!');
  };

  const handleIncrement = (id: string) => {
    setPricingData(prevData =>
      prevData.map(item =>
        item.id === id ? {...item, price: item.price + 1} : item,
      ),
    );
  };

  const handleDecrement = (id: string) => {
    setPricingData(prevData =>
      prevData.map(item =>
        item.id === id && item.price > 0
          ? {...item, price: item.price - 1}
          : item,
      ),
    );
  };

  const toggleService = (id: string) => {
    setPricingData(prevData =>
      prevData.map(item =>
        item.id === id ? {...item, enabled: !item.enabled} : item,
      ),
    );
  };

  const handleFullSave = async () => {
    try {
      const decodedToken = await TokenService.decodeToken(); // Token'ı çözüp verileri alıyoruz

      if (!decodedToken) {
        Alert.alert('Hata', 'Kullanıcı kimliği alınamadı!');
        return;
      }

      const ownerId = decodedToken.nameid; // Token'dan ownerId'yi alıyoruz

      // Enabled durumu true olan itemları filtreliyoruz
      const filteredPricingData = pricingData
        .filter(item => item.enabled) // Yalnızca enabled true olanları alıyoruz
        .map(item => ({
          operationName: item.operationName, // OperationName'i dahil ediyoruz
          price: item.price, // Price'ı dahil ediyoruz
          quantity: item.quantity, // Quantity'yi dahil ediyoruz
          ownerId: ownerId, // OwnerId'yi token'dan ekliyoruz
        }));

      // API'ye post isteği yapıyoruz
      await axios.post(
        'http://10.0.2.2:5150/api/Pricing/AddPricing',
        filteredPricingData,
      );

      Alert.alert('Başarılı', 'Tüm değişiklikler kaydedildi!');
      setOriginalData([...pricingData]);
      navigation.navigate('BussinesHomeScreen');
    } catch (error) {
      console.error('Veri gönderme hatası:', error);
      Alert.alert('Hata', 'Veriler kaydedilirken bir hata oluştu.');
    }
  };

  const handleCancel = () => {
    setPricingData([...originalData]);
    Alert.alert('İptal Edildi', 'Değişiklikler geri alındı.');
  };

  const renderItem = ({item}: {item: PricingItem}) => (
    <View style={styles.priceContainer}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{item.operationName}</Text>
        <Switch
          value={item.enabled}
          onValueChange={() => toggleService(item.id)}
        />
      </View>
      {item.enabled && (
        <View style={styles.controls}>
          <LinearGradient
            colors={['#F36117', '#0a040a']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.gradientButton}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleDecrement(item.id)}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
          </LinearGradient>
          <TextInput
            style={styles.input}
            value={String(item.price)}
            onChangeText={text => handleValueChange(item.id, parseInt(text))}
            keyboardType="numeric"
          />
          <LinearGradient
            colors={['#F36117', '#0a040a']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.gradientButton}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleIncrement(item.id)}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </LinearGradient>
          <Text style={styles.unit}>TL</Text>
        </View>
      )}
    </View>
  );

  return (
    <LinearGradient colors={['#FFFFFF', '#A6A6A6']} style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <Text style={styles.title}>Fiyat Seçenekleri</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <FlatList
              data={pricingData}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              style={{maxHeight: height * 0.7}}
            />
          )}
          <View style={styles.newServiceContainer}>
            <TextInput
              style={styles.newServiceInput}
              placeholder="Yeni hizmet ekle"
              value={newServiceLabel}
              onChangeText={setNewServiceLabel}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleSave}>
              <Text style={styles.buttonText}>Ekle ve Kaydet</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.saveCancelButtons}>
            <LinearGradient
              colors={['#F36117', '#0a040a']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.buttonGradient}>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleFullSave}>
                <Text style={styles.buttonText}>Kaydet</Text>
              </TouchableOpacity>
            </LinearGradient>
            <LinearGradient
              colors={['#F36117', '#0a040a']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.buttonGradient}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancel}>
                <Text style={styles.buttonText}>Vazgeç</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.005,
    paddingTop: height * 0.02,
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: height * 0.02,
  },
  priceContainer: {
    marginBottom: height * 0.02,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.01,
  },
  label: {
    fontSize: width * 0.04,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: height * 0.015,
    borderRadius: width * 0.05,
    textAlign: 'center',
    width: width * 0.15,
  },
  unit: {
    marginLeft: width * 0.02,
    fontSize: width * 0.04,
  },
  button: {
    padding: height * 0.015,
    borderRadius: width * 0.05,
  },
  buttonGradient: {
    borderRadius: 25,
    marginTop: height * 0.02,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: width * 0.035,
  },
  newServiceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: height * 0.03,
  },
  newServiceInput: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: height * 0.009,
    borderRadius: width * 0.05,
    width: '69%',
  },
  addButton: {
    backgroundColor: '#F36117',
    padding: height * 0.015,
    borderRadius: width * 0.05,
  },
  saveCancelButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: height * 0.002,
  },
  saveButton: {
    paddingLeft: height * 0.07,
    paddingRight: height * 0.07,
    padding: height * 0.02,
    borderRadius: width * 0.05,
  },
  cancelButton: {
    padding: height * 0.02,
    paddingLeft: height * 0.07,
    paddingRight: height * 0.07,
    borderRadius: width * 0.05,
    alignSelf: 'center',
  },
  gradientButton: {
    borderRadius: width * 0.07,
  },
});

export default PriceEntryScreen;
