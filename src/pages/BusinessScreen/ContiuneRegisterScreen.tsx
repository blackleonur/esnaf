import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import DropDownPicker from 'react-native-dropdown-picker';
import {NavigationProp} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const ProfileScreen = () => {
  const [workplaceName, setWorkplaceName] = useState('');
  const [address, setAddress] = useState('');
  const [taxNumber, setTaxNumber] = useState('');
  const [kvkkAccepted, setKvkkAccepted] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigation = useNavigation<NavigationProp<any>>();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [items, setItems] = useState([
    {label: 'Kafe', value: 'kafe'},
    {label: 'Restoran', value: 'restoran'},
    {label: 'Otel', value: 'otel'},
    {label: 'Tesisatçı', value: 'tesisatci'},
    {label: 'Elektrikçi', value: 'elektrikci'},
    {label: 'Bakıcı', value: 'bakici'},
    {label: 'Kepçe Operatörü', value: 'kepce_operatoru'},
    {label: 'Temizlikçi', value: 'temizlikci'},
    {label: 'Boyacı', value: 'boyaci'},
    {label: 'Tamirci', value: 'tamirci'},
    {label: 'Nakliyeci', value: 'nakliyeci'},
    {label: 'Bahçıvan', value: 'bahcivan'},
    {label: 'IT Destek Uzmanı', value: 'it_destek_uzmani'},
    {label: 'Eğitmen', value: 'egitmen'},
    {label: 'Güvenlik Görevlisi', value: 'guvenlik_gorevlisi'},
    {label: 'Su Tesisatçısı', value: 'su_tesisatcisi'},
    {label: 'Mekanik Ustası', value: 'mekanik_ustasi'},
    {label: 'Marangoz', value: 'marangoz'},
    {label: 'İnşaat İşçisi', value: 'insaat_iscisi'},
    {label: 'Mobilya Montajcısı', value: 'mobilya_montajcisi'},
    {label: 'İlaçlama Servisi', value: 'ilaclama_servisi'},
    {label: 'Klima Teknisyeni', value: 'klima_teknisyeni'},
  ]);

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

  const handleSubmit = () => {
    if (
      kvkkAccepted &&
      termsAccepted &&
      value &&
      workplaceName &&
      address &&
      taxNumber
    ) {
      console.log('Form başarıyla gönderildi.');
    } else {
      Alert.alert(
        'Hata',
        'Lütfen tüm alanları doldurun ve metinleri onaylayın.',
      );
    }
  };

  const goPrice = () => {
    navigation.navigate('PriceEntryScreen');
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
          value={workplaceName}
          onChangeText={setWorkplaceName}
          placeholder="İş yeri ismini girin"
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
          ArrowUpIconComponent={({style}) => (
            <Text style={[style, {fontSize: 20}]}>▲</Text>
          )}
          ArrowDownIconComponent={({style}) => (
            <Text style={[style, {fontSize: 20}]}>▼</Text>
          )}
        />

        <Text style={styles.header}>İş Yeri Adresi</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
          placeholder="Adresinizi girin"
        />

        <Text style={styles.header}>Vergi Numarası</Text>
        <TextInput
          style={styles.input}
          value={taxNumber}
          onChangeText={setTaxNumber}
          placeholder="Vergi numaranızı girin"
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
          style={{borderRadius: 25}}>
          <TouchableOpacity style={styles.button} onPress={goPrice}>
            <Text style={styles.buttonText}>Fiyat Seçeneklerini Gir</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  dropdown: {
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#e5e5e5',
  },
  dropDownContainer: {
    borderRadius: 8,
  },
  searchInput: {
    borderColor: '#007BFF',
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
  },
  listItemLabel: {
    color: '#333',
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkboxText: {
    fontSize: 16,
    color: 'gray',
    marginLeft: 10,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
    marginTop: 15,
  },
});

export default ProfileScreen;
