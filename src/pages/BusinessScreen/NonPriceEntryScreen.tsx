import React, {useState} from 'react';
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
} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

type RootStackParamList = {
  NonBusinessHomeScreen: undefined;
};

interface PricingItem {
  id: string;
  label: string;
  value: number;
  unit: string;
  enabled: boolean;
}

interface PriceEntryScreenProps {}

const NonPriceEntryScreen: React.FC<PriceEntryScreenProps> = () => {
  const [pricingData, setPricingData] = useState<PricingItem[]>([
    {
      id: '1',
      label: 'Ev Temizliği',
      value: 3000,
      unit: 'TL',
      enabled: true,
    },
    {
      id: '2',
      label: 'Merdiven temizliği',
      value: 6000,
      unit: 'TL',
      enabled: true,
    },
    {
      id: '3',
      label: 'Bina Temizliği',
      value: 20000,
      unit: 'TL',
      enabled: true,
    },
    {
      id: '4',
      label: 'Oda temizliği',
      value: 600,
      unit: 'TL',
      enabled: true,
    },
    {
      id: '5',
      label: 'Dükkan Temizliği',
      value: 3000,
      unit: 'TL',
      enabled: true,
    },
    {
      id: '6',
      label: 'Ofis Temizliği',
      value: 6000,
      unit: 'TL',
      enabled: true,
    },
    {
      id: '7',
      label: 'Salon Temizliği',
      value: 25000,
      unit: 'TL',
      enabled: true,
    },
  ]);

  const [newServiceLabel, setNewServiceLabel] = useState('');

  // "Kaydet" butonuna tıklandığında verileri güncelleme fonksiyonu
  const handleSave = () => {
    // Eğer bir yeni hizmet eklenmişse, onu da pricingData'ya ekliyoruz
    if (newServiceLabel.trim()) {
      const newService: PricingItem = {
        id: Math.random().toString(),
        label: newServiceLabel,
        value: 0,
        unit: 'TL',
        enabled: true,
      };
      setPricingData([...pricingData, newService]);
      setNewServiceLabel(''); // Yeni hizmet label'ını sıfırlıyoruz
    }

    // Kaydedilen veriyi işleyebilirsiniz (örn: bir API'ye gönderme)
    console.log('Güncellenmiş Veriler:', pricingData);
    Alert.alert('Başarılı', 'Veriler başarıyla kaydedildi!');
  };

  const handleValueChange = (id: string, newValue: number) => {
    setPricingData(prevData =>
      prevData.map(item =>
        item.id === id
          ? {...item, value: isNaN(newValue) ? 0 : newValue}
          : item,
      ),
    );
  };

  const handleIncrement = (id: string) => {
    setPricingData(prevData =>
      prevData.map(item =>
        item.id === id ? {...item, value: item.value + 1} : item,
      ),
    );
  };

  const handleDecrement = (id: string) => {
    setPricingData(prevData =>
      prevData.map(item =>
        item.id === id && item.value > 0
          ? {...item, value: item.value - 1}
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

  const renderItem = ({item}: {item: PricingItem}) => (
    <View style={styles.priceContainer}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{item.label}</Text>
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
            style={{borderRadius: 65, marginTop: 20}}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleDecrement(item.id)}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
          </LinearGradient>
          <TextInput
            style={styles.input}
            value={String(item.value)}
            onChangeText={text => handleValueChange(item.id, parseInt(text))}
            keyboardType="numeric"
          />
          <LinearGradient
            colors={['#F36117', '#0a040a']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={{borderRadius: 65, marginTop: 20}}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleIncrement(item.id)}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </LinearGradient>
          <Text style={styles.unit}>{item.unit}</Text>
        </View>
      )}
    </View>
  );

  interface goHomeProp {
    navigation: NavigationProp<any, any>;
  }
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  function goHome() {
    navigation.navigate('NonBusinessHomeScreen');
  }

  return (
    <LinearGradient
      colors={['#FFFFFF', '#A6A6A6']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={{flex: 1}}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Text style={styles.title}>Fiyat Seçenekleri</Text>
        <Text style={styles.subtitle}>
          Lütfen size uygun fiyat seçeneklerini seçin.
        </Text>

        <Text style={styles.serviceHeader}>Hizmetler</Text>

        <FlatList
          data={pricingData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          style={{maxHeight: 650}}
        />

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

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.buttonText}>İptal</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={goHome}>
            <Text style={styles.buttonText}>Kaydet</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  serviceHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  priceContainer: {
    marginBottom: 20,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginTop: 23,
    borderRadius: 25,
    textAlign: 'center',
    width: 60,
  },
  unit: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  button: {
    padding: 12,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    padding: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#f44336',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  newServiceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  newServiceInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
});

export default NonPriceEntryScreen;
