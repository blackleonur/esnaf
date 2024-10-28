import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Dimensions,
  StyleSheet,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  RouteProp,
  useRoute,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import {TokenService} from '../../TokenService';

const {width, height} = Dimensions.get('window');

// Parametrelerin tiplerini tanımlıyoruz
interface Params {
  name: string;
  surname: string;
  email: string;
  phone: string;
  password: string;
}

const ProfileScreen = () => {
  const route = useRoute<RouteProp<{params: Params}, 'params'>>(); // Tip tanımlaması
  const navigation = useNavigation<NavigationProp<any>>();

  const {name, surname, email, phone, password} = route.params || {
    name: '',
    surname: '',
    email: '',
    phone: '',
    password: '',
  };

  const [workplaceName, setWorkplaceName] = useState('');
  const [address, setAddress] = useState('');
  const [taxNumber, setTaxNumber] = useState('');
  const [kvkkAccepted, setKvkkAccepted] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);
  const [items, setItems] = useState<{label: string; value: string}[]>([]);

  // Mağaza verilerini backend'den çekme
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get(
          'http://10.0.2.2:5150/api/Store/GetAllStores',
        );
        const stores = response.data.result;
        const formattedStores = stores.map(
          (store: {id: string; storeName: string}) => ({
            label: store.storeName,
            value: store.id,
          }),
        );
        setItems(formattedStores);
      } catch (error) {
        console.error('Mağazalar getirilemedi:', error);
      }
    };

    fetchStores();
  }, []);

  const showKvkkAlert = () => {
    Alert.alert(
      'KVKK Metni',
      'KVKK metnini buraya ekleyin...',
      [{text: 'Okudum, anladım', onPress: () => setKvkkAccepted(true)}],
      {cancelable: false},
    );
  };

  const showTermsAlert = () => {
    Alert.alert(
      'Kullanım Şartları',
      'Kullanım şartları metnini buraya ekleyin...',
      [{text: 'Okudum, anladım', onPress: () => setTermsAccepted(true)}],
      {cancelable: false},
    );
  };

  const handleSubmit = async () => {
    if (
      !kvkkAccepted ||
      !termsAccepted ||
      !selectedStoreId ||
      !workplaceName ||
      !address ||
      !taxNumber
    ) {
      Alert.alert(
        'Hata',
        'Lütfen tüm alanları doldurun ve metinleri onaylayın.',
      );
      return;
    }

    try {
      const data = {
        BusinessOwnerFirstName: name,
        BusinessOwnerSurname: surname,
        BusinessOwnerPhone: phone,
        BusinessName: workplaceName,
        BusinessAddress: address,
        BusinessPhone: phone,
        BusinessEmail: email,
        BusinessTaxNo: taxNumber,
        Password: password,
        StoreId: selectedStoreId,
        BusinessDescription: ' ',
      };

      const response = await axios.post(
        'http://10.0.2.2:5150/api/Business/Register',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.status === 200) {
        const token = response.data.result.token; // Token'ı response'dan alıyoruz

        // Token'ı AsyncStorage ile kaydediyoruz
        await TokenService.setToken(token);

        Alert.alert('Başarılı', 'Kayıt işlemi başarıyla tamamlandı.');
        navigation.navigate('PriceEntryScreen', {storeId: selectedStoreId}); // storeId'yi PriceEntryScreen'e gönderiyoruz
      } else {
        Alert.alert('Hata', 'Kayıt işlemi başarısız.');
      }
    } catch (error) {
      console.error('Kayıt işlemi sırasında bir hata oluştu:', error);
      Alert.alert('Hata', 'Kayıt işlemi sırasında bir hata oluştu.');
    }
  };

  return (
    <LinearGradient
      colors={['#FFFFFF', '#A6A6A6']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.title}>Profilinizi Doldurun</Text>

        <Text style={styles.header}>İş Yeri İsmi</Text>
        <TextInput
          style={styles.input}
          placeholder="İş yeri ismini girin"
          value={workplaceName}
          onChangeText={setWorkplaceName}
        />

        <Text style={styles.header}>İş Kategorisi</Text>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="Kategori seçin..."
          searchable={true}
          style={styles.dropdown}
          searchTextInputStyle={styles.searchInput}
          listItemLabelStyle={styles.listItemLabel}
          dropDownContainerStyle={styles.dropDownContainer}
          onChangeValue={val => setSelectedStoreId(val)}
          onSelectItem={item =>
            item.value !== undefined
              ? setSelectedStoreId(item.value)
              : setSelectedStoreId(null)
          }
        />

        <Text style={styles.header}>İş Yeri Adresi</Text>
        <TextInput
          style={styles.input}
          placeholder="Adresinizi girin"
          value={address}
          onChangeText={setAddress}
        />

        <Text style={styles.header}>Vergi Numarası</Text>
        <TextInput
          style={styles.input}
          placeholder="Vergi numaranızı girin"
          value={taxNumber}
          onChangeText={setTaxNumber}
          keyboardType="numeric"
        />

        <View style={styles.checkboxContainer}>
          <CheckBox
            value={termsAccepted}
            tintColors={{true: '#007BFF', false: '#ccc'}}
            disabled={true}
          />
          <TouchableOpacity onPress={showTermsAlert}>
            <Text style={styles.checkboxText}>
              Kullanım şartlarını kabul ediyorum
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.checkboxContainer}>
          <CheckBox
            value={kvkkAccepted}
            tintColors={{true: '#007BFF', false: '#ccc'}}
            disabled={true}
          />
          <TouchableOpacity onPress={showKvkkAlert}>
            <Text style={styles.checkboxText}>
              KVKK metnini okudum, onaylıyorum
            </Text>
          </TouchableOpacity>
        </View>

        <LinearGradient
          colors={['#F36117', '#0a040a']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.buttonGradient}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Fiyatlandırmaya Devam</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: width * 0.05,
    justifyContent: 'center',
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: height * 0.02,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: width * 0.03,
    borderRadius: 8,
    marginBottom: height * 0.02,
  },
  dropdown: {
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#e5e5e5',
    width: '100%',
  },
  dropDownContainer: {
    borderRadius: 8,
  },
  searchInput: {
    borderColor: '#007BFF',
    borderWidth: 1,
    padding: width * 0.03,
    borderRadius: 8,
  },
  listItemLabel: {
    color: '#333',
    fontSize: width * 0.04,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  checkboxText: {
    fontSize: width * 0.04,
    color: 'gray',
    marginLeft: width * 0.03,
  },
  buttonGradient: {
    borderRadius: 25,
    marginTop: height * 0.02,
  },
  button: {
    padding: height * 0.02,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
  header: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    marginBottom: height * 0.01,
  },
});

export default ProfileScreen;
