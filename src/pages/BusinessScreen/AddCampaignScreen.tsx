import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
  Platform,
} from 'react-native';
import {NavigationProp} from '@react-navigation/native';

// Cihazın genişlik ve yüksekliğini alıyoruz
const {width, height} = Dimensions.get('window');

// Dinamik olarak boyutlandırma fonksiyonları
const scale = (size: number) => (width / 375) * size; // iPhone 11 genişliği baz alındı
const verticalScale = (size: number) => (height / 812) * size;

const AddCampaignScreen: React.FC<{navigation: NavigationProp<any>}> = ({
  navigation,
}) => {
  const [title, setTitle] = useState('');
  const [discount, setDiscount] = useState('');
  const [startDate, setStartDate] = useState('2023-06-01');
  const [endDate, setEndDate] = useState('2023-06-30');

  const handleAddCampaign = () => {
    Alert.alert('Başarılı', 'Yeni kampanya eklendi.');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Yeni Kampanya Ekle</Text>

      <TextInput
        style={styles.input}
        placeholder="Kampanya Başlığı"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="İndirim Oranı (%)"
        value={discount}
        onChangeText={setDiscount}
      />
      <TextInput
        style={styles.input}
        placeholder="Başlangıç Tarihi"
        value={startDate}
        onChangeText={setStartDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Bitiş Tarihi"
        value={endDate}
        onChangeText={setEndDate}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleAddCampaign}>
        <Text style={styles.saveButtonText}>Kaydet</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scale(16),
    backgroundColor: '#fff',
  },
  title: {
    fontSize: scale(18),
    fontWeight: 'bold',
    marginBottom: verticalScale(16),
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: scale(8),
    padding: scale(10),
    fontSize: scale(16),
    marginBottom: verticalScale(16),
  },
  saveButton: {
    backgroundColor: '#28a745',
    padding: scale(16),
    borderRadius: scale(8),
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: scale(16),
  },
});

export default AddCampaignScreen;
