import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {RouteProp, useRoute, NavigationProp} from '@react-navigation/native';
import {TokenService} from '../../../TokenService';
import Apiurl from '../../../Apiurl';

interface Params {
  serviceId: string;
  businessId: string;
}

const UserCommentScreen = () => {
  const route = useRoute<RouteProp<{params: Params}, 'params'>>();
  const navigation = useNavigation<NavigationProp<any>>();

  const {serviceId, businessId} = route.params || {
    serviceId: '',
    businessId: '',
  };

  const [qualityRating, setQualityRating] = useState(0);
  const [reliabilityRating, setReliabilityRating] = useState(0);
  const [timingRating, setTimingRating] = useState(0);
  const [commentTitle, setCommentTitle] = useState('');
  const [comment, setComment] = useState('');

  const renderStars = (rating: number, setRating: (rating: number) => void) => {
    return (
      <View style={styles.starContainer}>
        {[1, 2, 3, 4, 5].map(star => (
          <TouchableOpacity key={star} onPress={() => setRating(star)}>
            <Ionicons
              name={star <= rating ? 'star' : 'star-outline'}
              size={24}
              color="#FFD700"
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const handleSubmit = async () => {
    try {
      const token = await TokenService.getToken(); // Token alınıyor
      const userId = token ? (await TokenService.decodeToken())?.nameid : null;

      if (!userId) {
        Alert.alert('Hata', 'Kullanıcı kimliği alınamadı');
        return;
      }

      const response = await axios.post(`${Apiurl}/api/Review/AddReview/`, {
        userId,
        ownerId: businessId,
        serviceId,
        timingRating,
        reliabilityRating,
        qualityRating,
        commentTitle,
        comment,
      });

      if (response.data.isSuccess) {
        Alert.alert('Başarılı', 'Yorumunuz kaydedildi');
        navigation.goBack();
      } else {
        Alert.alert('Hata', 'Yorum kaydedilemedi');
      }
    } catch (error) {
      console.error('Yorum gönderme hatası:', error);
      Alert.alert('Hata', 'Yorum gönderilemedi.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Yorum Yap</Text>
      <Text style={styles.label}>Yapılan İş Kalitesi</Text>
      {renderStars(qualityRating, setQualityRating)}

      <Text style={styles.label}>Güvenilirlik</Text>
      {renderStars(reliabilityRating, setReliabilityRating)}

      <Text style={styles.label}>Zaman Yönetimi</Text>
      {renderStars(timingRating, setTimingRating)}

      <TextInput
        style={styles.input}
        placeholder="Yorum Başlığı"
        value={commentTitle}
        onChangeText={setCommentTitle}
      />

      <TextInput
        style={[styles.input, styles.commentInput]}
        placeholder="Yorumunuz"
        value={comment}
        onChangeText={setComment}
        multiline
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Vazgeç</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Yorumu Gönder</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
  },
  starContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  commentInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#FF5733',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default UserCommentScreen;
