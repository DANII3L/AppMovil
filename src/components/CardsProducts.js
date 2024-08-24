import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import stylesHome from '../styles/stylesHome';

const CardsProducts = ({item, cardBuyPress}) => {

  return (
    <TouchableOpacity
      style={stylesHome.productCard}
      onPress={() => cardBuyPress(item)}>
      <Image source={{uri: item.image}} style={stylesHome.productImage} />
      <View style={stylesHome.productInfo}>
        <Text style={stylesHome.productTitle}>{item.title}</Text>
        <Text style={stylesHome.productDescription}>{item.description}</Text>
        <Text style={stylesHome.productValue}>${item.price.toFixed(2)}</Text>
        {item.discount && (
          <Text style={stylesHome.productDiscount}>-${item.discount}%</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CardsProducts;
