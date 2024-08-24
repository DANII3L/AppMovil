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
import CardsProducts from './CardsProducts';

const ShoppingCartsScreen = ({navigation}) => {
  const calculateTotal = () => {
    return productsCartData
      .reduce((total, item) => total + item.price * item.amount, 0)
      .toFixed(2);
  };

  const cardBuyPress = item => {
    navigation.navigate('Details', {id: item.id});
  };

  return (
    <ScrollView>
      <View style={stylesHome.productListContainer}>
        <FlatList
          data={productsCartData}
          renderItem={({item}) => (
            <CardsProducts
              item={item}
              cardBuyPress={cardBuyPress}
            />
          )}
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
