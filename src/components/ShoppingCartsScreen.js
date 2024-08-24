import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Button,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {stylesCarts} from '../styles/stylesCarts';
import {productsCartData} from '../data/productsCartData';
import stylesHome from '../styles/stylesHome';
import globalStyles from '../styles/globalStyles';

const ShoppingCartsScreen = () => {
  const renderCartItem = ({item}) => (
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

  const calculateTotal = () => {
    return productsCartData
      .reduce((total, item) => total + item.price * item.amount, 0)
      .toFixed(2);
  };

  return (
    <ScrollView>
      <View style={stylesHome.productListContainer}>
        <Text style={globalStyles.titleBlack}>Lista de Productos</Text>
        <FlatList
          data={productsCartData}
          renderItem={renderCartItem}
          keyExtractor={item => item.id}
          contentContainerStyle={stylesHome.productList}
        />
      </View>

      <View style={stylesCarts.footer}>
        <Text style={stylesCarts.total}>Total: ${calculateTotal()}</Text>
        <Button
          title="Proceder al Pago"
          onPress={() =>
            Alert.alert(
              'Confirmación pago',
              'Se ha realizado el pago exitosamente!',
            )
          }
        />
      </View>
    </ScrollView>
  );
};

export default ShoppingCartsScreen;
