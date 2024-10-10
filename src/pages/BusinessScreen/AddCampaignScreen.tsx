import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {NavigationProp} from '@react-navigation/native';

const AddCampaignScreen: React.FC<{navigation: NavigationProp<any>}> = ({
  navigation,
}) => {
  const [title, setTitle] = useState('');
  const [discount, setDiscount] = useState('');
  const [startDate, setStartDate] = useState('2023-06-01');
  const [endDate, setEndDate] = useState('2023-06-30');

  const handleAddCampaign = () => {
    // Kampanyayı ekleme işlemi
    Alert.alert('Başarılı', 'Yeni kampanya eklendi.');
    navigation.goBack(); // Geri dön
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
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: '#28a745',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AddCampaignScreen;
