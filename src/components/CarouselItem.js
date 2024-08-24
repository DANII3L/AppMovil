import React from 'react';
import { Image, Dimensions, TouchableOpacity} from 'react-native';
import globalStyles from '../styles/globalStyles';

const {width} = Dimensions.get('window');

const CarouselItem = ({item, onPress}) => {
  const {title, image} = item;
  return (
    <TouchableOpacity style={globalStyles.containerCard} onPress={() => onPress(item)}>
      <Image source={{uri: image}} style={globalStyles.image} />
    </TouchableOpacity >
  );
};

export default CarouselItem;
