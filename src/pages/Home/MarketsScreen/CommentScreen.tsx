import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  CommentScreen: undefined; // CommentScreen parametre almıyor
  MarketScreen: {comment: string; rating: number}; // MarketScreen yorum ve puan alacak
};

// CommentScreen'deki Navigation tipi
type CommentScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CommentScreen'
>;

// MarketScreen'deki Route tipi (Yorum ve puan parametrelerini almak için)
type MarketScreenRouteProp = RouteProp<RootStackParamList, 'MarketScreen'>;
interface StarRatingProps {
  rating: number;
  setRating: (rating: number) => void;
}

// Basit bir yıldız puanlama komponenti
const StarRating: React.FC<StarRatingProps> = ({rating, setRating}) => {
  return (
    <View style={styles.starContainer}>
      {[1, 2, 3, 4, 5].map(star => (
        <TouchableOpacity
          key={star}
          onPress={() => setRating(star)}
          style={styles.starButton}>
          <Text
            style={[styles.star, rating >= star ? styles.selectedStar : null]}>
            ★
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const CommentScreen = () => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const navigation = useNavigation<CommentScreenNavigationProp>();

  const submitReview = () => {
    if (comment === '' || rating === 0) {
      Alert.alert('Hata', 'Lütfen yorum ve puanlama yapınız.');
      return;
    }
    navigation.navigate('MarketScreen', {
      comment: comment,
      rating: rating,
    });

    // Yorum ve puanı başka bir ekrana göndermek için burada veri işleme yapılabilir
    console.log('Yorum:', comment);
    console.log('Puan:', rating);

    Alert.alert('Başarılı', 'Yorumunuz ve puanlamanız alındı.');

    // Yorum ve puanı temizle
    setComment('');
    setRating(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Yorum ve Puan Ver</Text>

      {/* Yorum Alma */}
      <TextInput
        style={styles.textInput}
        placeholder="Yorumunuzu buraya yazınız"
        value={comment}
        onChangeText={setComment}
        multiline
      />

      {/* Yıldız Puanlama */}
      <Text style={styles.subHeader}>Puanınız:</Text>
      <StarRating rating={rating} setRating={setRating} />

      {/* Gönder Butonu */}
      <TouchableOpacity style={styles.button} onPress={submitReview}>
        <Text style={styles.buttonText}>Yorumu Gönder</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CommentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  textInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  starContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  starButton: {
    padding: 5,
  },
  star: {
    fontSize: 32,
    color: '#ccc',
  },
  selectedStar: {
    color: '#FFD700', // Altın sarısı yıldız
  },
  button: {
    backgroundColor: '#FF6347',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
