import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import globalStyles from '../styles/globalStyles';

const CardItemsSecondary = ({item, onPress}) => {
  const {title, image} = item;
  return (
    <TouchableOpacity style={globalStyles.cardContainerBuys} onPress={() => onPress(item)}>
      <View style={globalStyles.cardItem}>
        <Image source={{uri: image}} style={globalStyles.cardImage} />
      </View>
      <Text style={globalStyles.cardText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CardItemsSecondary;
