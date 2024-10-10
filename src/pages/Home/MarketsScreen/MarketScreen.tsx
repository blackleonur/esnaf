import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const categories = [
  {
    id: '1',
    name: 'MEKAN TESİSAT',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuWqdEM4Rb3ObHTPlVqY9kuMu4XzT6PulPRQ&s',
    kesifucreti: 300,
    Kombidegisimi: 5000,
    petekdegisimi: 1500,
    muslukdegisimi: 650,
    gidertemizleme: 900,
    yerdenisitma: 15000,
    kazandegisimi: 28000,
    petektemizligi: 3000,
    isNear: true,
    isCheaper: true,
    isFavs: false,
  },
];

const serviceDetails = [
  {key: 'kesifucreti', label: 'Keşif Ücreti', value: categories[0].kesifucreti},
  {
    key: 'Kombidegisimi',
    label: 'Kombi Değişimi',
    value: categories[0].Kombidegisimi,
  },
  {
    key: 'petekdegisimi',
    label: 'Petek Değişimi',
    value: categories[0].petekdegisimi,
  },
  {
    key: 'muslukdegisimi',
    label: 'Musluk Değişimi',
    value: categories[0].muslukdegisimi,
  },
  {
    key: 'gidertemizleme',
    label: 'Gider Temizleme',
    value: categories[0].gidertemizleme,
  },
  {
    key: 'yerdenisitma',
    label: 'Yerden Isıtma',
    value: categories[0].yerdenisitma,
  },
  {
    key: 'kazandegisimi',
    label: 'Kazan Değişimi',
    value: categories[0].kazandegisimi,
  },
  {
    key: 'petektemizligi',
    label: 'Petek Temizliği',
    value: categories[0].petektemizligi,
  },
];

const MarketScreen = () => {
  return (
    <View style={style.container}>
      {/* Başlık ve Görsel */}
      <View style={style.HeaderContainer}>
        <Text style={style.HeaderText}>{categories[0].name}</Text>
        <Image style={style.Image} source={{uri: categories[0].image}} />
      </View>

      {/* Bilgi Alanı */}
      <View style={style.InfoContainer}>
        <Text style={style.InfoMarketHeader}>MEKAN TESİSAT HAKKINDA</Text>
        <View style={{maxHeight: 200}}>
          <FlatList
            data={serviceDetails}
            keyExtractor={item => item.key}
            renderItem={({item}) => (
              <View style={style.InfoMarket}>
                <Text style={style.InfoText}>
                  {item.label}: {item.value} TL
                </Text>
              </View>
            )}
          />
        </View>
      </View>

      <View style={style.ButtonContiner}>
        <TouchableOpacity style={style.Button}>
          <Text style={style.ButtonText}>İletişime Geç</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.Button}>
          <Text style={style.ButtonText}>Yol Tarifi Al</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MarketScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  HeaderContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 20,
  },
  HeaderText: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  Image: {
    width: '90%',
    height: 200,
    borderRadius: 10,
  },
  InfoContainer: {
    flexDirection: 'column',
    padding: 18,
  },
  InfoMarketHeader: {
    alignSelf: 'center',
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  InfoMarket: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginVertical: 8, // Başlık ve fiyat arasına boşluk eklemek için
  },
  InfoText: {
    fontSize: 16,
    color: '#555',
  },
  ButtonContiner: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  Button: {
    backgroundColor: '#FF6347',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  ButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
