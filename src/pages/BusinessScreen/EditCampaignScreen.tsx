import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

// Arayüz tanımları
interface Job {
  id: string;
  name: string;
  price: number;
}

const EditCampaignScreen: React.FC = () => {
  // Statik veri
  const jobOptions: Job[] = [
    {id: '1', name: 'Keşif Ücreti', price: 300},
    {id: '2', name: 'Kombi Değişimi', price: 1500},
    {id: '3', name: 'Petek Değişimi', price: 3000},
    {id: '4', name: 'Gider Temizleme', price: 100},
  ];

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [price, setPrice] = useState(0);

  // Tarih state'leri
  const [startDate, setStartDate] = useState(new Date(2023, 5, 1));
  const [endDate, setEndDate] = useState(new Date(2023, 5, 30));
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const handleSave = () => {
    Alert.alert('Başarılı', 'Kampanya güncellendi.');
  };

  const handleJobSelect = (job: Job) => {
    setSelectedJob(job);
    setPrice(job.price);
  };

  const handlePriceChange = (value: number) => {
    setPrice(prevPrice => prevPrice + value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kampanyayı Düzenle</Text>

      {/* İş Seçimi */}
      <Text style={styles.label}>İş Seçimi</Text>
      <FlatList
        data={jobOptions}
        keyExtractor={item => item.id}
        renderItem={({item}: {item: Job}) => (
          <TouchableOpacity
            style={[
              styles.jobOption,
              selectedJob?.id === item.id && styles.selectedJob,
            ]}
            onPress={() => handleJobSelect(item)}>
            <Text style={styles.jobOptionText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Fiyat */}
      {selectedJob && (
        <View>
          <Text style={styles.label}>Fiyat</Text>
          <View style={styles.priceContainer}>
            <TouchableOpacity
              style={styles.priceButton}
              onPress={() => handlePriceChange(-100)}>
              <Text style={styles.priceButtonText}>-</Text>
            </TouchableOpacity>

            <TextInput
              style={styles.priceInput}
              keyboardType="numeric"
              value={price.toString()}
              onChangeText={text => setPrice(Number(text))}
            />

            <TouchableOpacity
              style={styles.priceButton}
              onPress={() => handlePriceChange(100)}>
              <Text style={styles.priceButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Başlangıç Tarihi Seçimi */}
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowStartDatePicker(true)}>
        <Text style={styles.dateButtonText}>
          Başlangıç Tarihi: {startDate.toLocaleDateString()}
        </Text>
      </TouchableOpacity>
      {showStartDatePicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            if (event.type === 'set') {
              const currentDate = selectedDate || startDate;
              setShowStartDatePicker(false);
              setStartDate(currentDate);
            }
          }}
        />
      )}

      {/* Bitiş Tarihi Seçimi */}
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowEndDatePicker(true)}>
        <Text style={styles.dateButtonText}>
          Bitiş Tarihi: {endDate.toLocaleDateString()}
        </Text>
      </TouchableOpacity>
      {showEndDatePicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            if (event.type === 'set') {
              const currentDate = selectedDate || endDate;
              setShowEndDatePicker(false);
              setEndDate(currentDate);
            }
          }}
        />
      )}

      {/* Kaydet Butonu */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
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
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  jobOption: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedJob: {
    backgroundColor: '#e0f7fa',
  },
  jobOptionText: {
    fontSize: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  priceButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 8,
  },
  priceButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  priceInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    textAlign: 'center',
    marginHorizontal: 8,
    fontSize: 16,
  },
  dateButton: {
    padding: 12,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    marginBottom: 16,
  },
  dateButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#007BFF',
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

export default EditCampaignScreen;
