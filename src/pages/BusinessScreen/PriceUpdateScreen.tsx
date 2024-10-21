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
  Dimensions,
} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';

const {width, height} = Dimensions.get('window');

type RootStackParamList = {
  BussinesHomeScreen: undefined;
};

interface PricingItem {
  id: string;
  label: string;
  value: number;
  unit: string;
  enabled: boolean;
}

const PriceEntryScreen: React.FC = () => {
  const [pricingData, setPricingData] = useState<PricingItem[]>([
    {id: '1', label: 'Metrekare ücreti', value: 10, unit: 'TL', enabled: true},
    {id: '2', label: 'Koltuk ücreti', value: 15, unit: 'TL', enabled: true},
    {id: '3', label: 'Overlok ücreti', value: 20, unit: 'TL', enabled: true},
    {id: '4', label: 'Yorgan ücreti', value: 20, unit: 'TL', enabled: true},
    {
      id: '5',
      label: 'Taşpınar halı m2 ücreti',
      value: 20,
      unit: 'TL',
      enabled: true,
    },
    {id: '6', label: 'Battaniye', value: 20, unit: 'TL', enabled: true},
    {id: '7', label: 'Koltuk', value: 20, unit: 'TL', enabled: true},
  ]);

  const [newServiceLabel, setNewServiceLabel] = useState('');

  const handleSave = () => {
    if (newServiceLabel.trim()) {
      const newService: PricingItem = {
        id: Math.random().toString(),
        label: newServiceLabel,
        value: 0,
        unit: 'TL',
        enabled: true,
      };
      setPricingData([...pricingData, newService]);
      setNewServiceLabel('');
    }
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
          trackColor={{false: '#767577', true: '#CB6040'}} // Track rengi
          thumbColor={item.enabled ? '#CB6040' : '#f4f3f4'} // Thumb rengi
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
            value={String(item.value)}
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
          <Text style={styles.unit}>{item.unit}</Text>
        </View>
      )}
    </View>
  );

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  function goHome() {
    navigation.navigate('BussinesHomeScreen');
  }
  function goCancel() {
    navigation.navigate('BussinesProfileScreen' as any);
  }
  return (
    <LinearGradient colors={['#FFFFFF', '#A6A6A6']} style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <Text style={styles.title}>Fiyat Seçenekleri</Text>
          <Text style={styles.subtitle}>
            Lütfen size uygun fiyat seçeneklerini seçin.
          </Text>
          <FlatList
            data={pricingData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            style={{maxHeight: height * 0.7}}
          />
          <View style={styles.newServiceContainer}>
            <TextInput
              style={styles.newServiceInput}
              placeholder="Yeni hizmet ekle"
              value={newServiceLabel}
              onChangeText={setNewServiceLabel}
            />
            <LinearGradient
              colors={['#F36117', '#0a040a']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}>
              <TouchableOpacity style={styles.addButton} onPress={handleSave}>
                <Text style={styles.buttonText}>Ekle ve Kaydet</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
          <View style={styles.buttonContainer}>
            <LinearGradient
              colors={['#F36117', '#0a040a']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}>
              <TouchableOpacity style={styles.cancelButton} onPress={goCancel}>
                <Text style={styles.buttonText}>İptal</Text>
              </TouchableOpacity>
            </LinearGradient>
            <LinearGradient
              colors={['#F36117', '#0a040a']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}>
              <TouchableOpacity style={styles.saveButton} onPress={goHome}>
                <Text style={styles.buttonText}>Kaydet</Text>
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
  subtitle: {
    fontSize: width * 0.04,
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
    borderRadius: 5,
    marginHorizontal: width * 0.02,
  },
  gradientButton: {
    borderRadius: 5,
  },
  buttonText: {
    color: '#c9c5c9',
    fontSize: width * 0.05,
    fontWeight: '100',
  },
  newServiceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  newServiceInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: height * 0.015,
    marginRight: width * 0.02,
  },
  addButton: {
    padding: height * 0.015,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: height * 0.02,
  },
  cancelButton: {
    padding: height * 0.015,
    borderRadius: 5,
  },
  saveButton: {
    padding: height * 0.015,
    borderRadius: 5,
  },
});

export default PriceEntryScreen;
