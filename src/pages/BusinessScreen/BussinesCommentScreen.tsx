import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Modal,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TokenService} from '../../TokenService';
import {Dimensions, PixelRatio} from 'react-native';
import Apiurl from '../../Apiurl';

const {width} = Dimensions.get('window');
const scale = width / 375;
const normalize = (size: number) => {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

// Types
type Review = {
  id: string;
  userId: string;
  userFirstName: string;
  userLastName: string;
  timingRating: number;
  reliabilityRating: number;
  qualityRating: number;
  commentTitle: string;
  comment: string;
  createdDate: string;
  reply?: {
    replyContent: string;
    createdDate?: string;
  } | null;
};

type Averages = {
  timingAverage: number;
  reliabilityAverage: number;
  qualityAverage: number;
};

type ResponseData = {
  reviews: Review[];
  averages: Averages;
  businessName: string;
};

const BussinesCommentScreen = () => {
  const [data, setData] = useState<ResponseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [ownerId, setOwnerId] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const decodedToken = await TokenService.decodeToken();
      if (decodedToken && decodedToken.nameid) {
        setOwnerId(decodedToken.nameid);

        const response = await axios.get(
          `${Apiurl}/api/Review/GetAllCommentAndRating/${decodedToken.nameid}`,
        );

        if (response.data.isSuccess) {
          setData(response.data.result);
        } else {
          console.error('Failed to fetch data');
        }
      } else {
        console.error('Failed to retrieve owner ID from token');
      }
    } catch (error) {
      console.error('API or token error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
      <View style={styles.starsContainer}>
        <View style={styles.stars}>
          {[...Array(fullStars)].map((_, index) => (
            <Icon
              key={`full-${index}`}
              name="star"
              size={normalize(17)}
              color="#FFD700"
            />
          ))}
          {halfStar === 1 && (
            <Icon name="star-half-full" size={normalize(17)} color="#FFD700" />
          )}
          {[...Array(emptyStars)].map((_, index) => (
            <Icon
              key={`empty-${index}`}
              name="star-o"
              size={normalize(17)}
              color="#FFD700"
            />
          ))}
        </View>
        <Text style={styles.averageRatingText}>{rating.toFixed(1)}</Text>
      </View>
    );
  };

  const openReplyModal = (reviewId: string) => {
    setSelectedReviewId(reviewId);
    setModalVisible(true);
  };

  const sendReply = async () => {
    if (selectedReviewId && replyContent.trim()) {
      try {
        const response = await axios.post('${Apiurl}/api/Reply/AddReply', {
          reviewId: selectedReviewId,
          responderId: ownerId,
          replyContent: replyContent,
        });

        if (response.data.isSuccess) {
          Alert.alert('Başarılı', 'Yanıt gönderildi');
          setModalVisible(false);
          setReplyContent('');
          fetchData(); // Güncel veriyi çek
        } else {
          Alert.alert('Hata', 'Yanıt gönderilemedi');
        }
      } catch (error) {
        console.error('Yanıt gönderme hatası:', error);
        Alert.alert('Hata', 'Bir hata oluştu');
      }
    } else {
      Alert.alert('Hata', 'Yanıt içeriği boş olamaz.');
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!data) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Veri bulunamadı</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {data.businessName.toUpperCase()} PUANLARI
      </Text>
      <View style={styles.allRatingContainer}>
        <View style={styles.rating}>
          <Text style={styles.ratingText}>Timing Rating</Text>
          {renderStars(data.averages.timingAverage)}
        </View>
        <View style={styles.rating}>
          <Text style={styles.ratingText}>Reliability Rating</Text>
          {renderStars(data.averages.reliabilityAverage)}
        </View>
        <View style={styles.rating}>
          <Text style={styles.ratingText}>Quality Rating</Text>
          {renderStars(data.averages.qualityAverage)}
        </View>
      </View>
      <Text style={styles.header}>Yorumlar</Text>
      <FlatList
        data={data.reviews}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.commentCard}>
            <View style={styles.commentContainer}>
              <Text style={styles.commentUser}>
                {item.userFirstName} {item.userLastName}
              </Text>
              <Text style={styles.commentDate}>
                {new Date(item.createdDate).toLocaleDateString()}
              </Text>
            </View>
            <View style={styles.Comment}>
              <Text style={styles.commentTitle}>
                {item.commentTitle.toUpperCase()}
              </Text>
              <Text style={styles.commentText}>{item.comment}</Text>
            </View>
            <View style={styles.StarsRating}>
              <View style={styles.starsContainer}>
                <Text style={styles.ratingLabel}>Timing: </Text>
                {renderStars(item.timingRating)}
              </View>
              <View style={styles.starsContainer}>
                <Text style={styles.ratingLabel}>Reliability: </Text>
                {renderStars(item.reliabilityRating)}
              </View>
              <View style={styles.starsContainer}>
                <Text style={styles.ratingLabel}>Quality: </Text>
                {renderStars(item.qualityRating)}
              </View>
            </View>
            {item.reply ? (
              <View style={styles.replyContainer}>
                <View style={styles.replyContentContainer}>
                  <Text style={styles.replyLabel}>İşletme Yanıtı:</Text>
                  <Text style={styles.replyContent}>
                    {item.reply.replyContent}
                  </Text>
                </View>
                {item.reply.createdDate && ( // Check if replyDate exists
                  <Text style={styles.replyDate}>
                    {new Date(item.reply.createdDate).toLocaleDateString()}
                  </Text>
                )}
              </View>
            ) : (
              <TouchableOpacity onPress={() => openReplyModal(item.id)}>
                <Text style={styles.replyButton}>Yanıtla</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
      {/* Yanıt Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Yanıt Ver</Text>
            <TextInput
              style={styles.input}
              placeholder="Yanıtınızı yazın"
              value={replyContent}
              onChangeText={setReplyContent}
            />
            <Button title="Gönder" onPress={sendReply} />
            <Button title="İptal" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  allRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  starsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingLeft: 8,
  },
  stars: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingLeft: 8,
  },
  averageRatingText: {
    fontSize: normalize(16),
    fontWeight: 'bold',
    color: '#333',
    marginLeft: normalize(10),
  },
  rating: {
    marginBottom: 10,
    alignItems: 'center',
  },
  ratingText: {
    fontSize: normalize(14),
    fontWeight: 'bold',
    marginLeft: 18,
  },
  Comment: {
    marginTop: 8,
    flexDirection: 'column',
  },
  header: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 13,
  },
  commentCard: {
    backgroundColor: '#fff',
    padding: 6,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 1},
    elevation: 2,
    borderWidth: 1.5,
    borderColor: '#e3ca8f',
  },
  commentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  commentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    borderBottomWidth: 0.4,
  },
  commentText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    paddingLeft: 16,
    marginTop: 20,
  },
  commentUser: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  commentDate: {
    fontSize: 14,
    color: 'grey',
  },
  StarsRating: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  ratingLabel: {
    fontSize: normalize(14),
    fontWeight: 'bold',
    color: '#555',
  },
  replyContainer: {
    backgroundColor: '#e8e8e8',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    flexDirection: 'column',
    alignContent: 'space-around',
  },
  replyContentContainer: {
    backgroundColor: '#e8e8e8',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  replyLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  replyContent: {
    fontSize: 14,
    color: '#333',
  },
  replyButton: {
    color: '#3b5998',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  replyDate: {
    fontSize: 12,
    color: 'grey',
    marginTop: 5,
    alignSelf: 'flex-end',
    marginRight: 5,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default BussinesCommentScreen;
