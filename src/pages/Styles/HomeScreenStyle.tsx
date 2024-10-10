import {Image, StyleSheet} from 'react-native';

const HomeScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topButton: {
    width: '100%',
    height: '100%',
  },
  topImage: {
    width: '20%',
    height: '20%',
    resizeMode: 'cover',
    alignSelf: 'center',
    marginTop: 450,
  },
  middleImageContainer: {
    position: 'absolute',
    top: '35%',
    zIndex: 1,
  },
  middleImage: {
    width: 250,
    height: 250,
    borderRadius: 999, // Yuvarlak yapmak için
    borderWidth: 1,
    borderColor: 'black',
    resizeMode: 'cover',
  },
  bottomButton: {
    width: '100%',
    height: '60%',
  },
  bottomImage: {
    width: '50%',
    height: '50%',
    resizeMode: 'cover',
    alignSelf: 'center',
    marginTop: 150,
  },
});

export default HomeScreenStyle;
