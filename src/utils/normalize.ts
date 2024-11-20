import { Dimensions, PixelRatio, Platform } from "react-native";

export const normalize = (size: number) => {
  const { width } = Dimensions.get('window');

  const scale = width / 375;

  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};