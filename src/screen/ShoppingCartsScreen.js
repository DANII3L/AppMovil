import React, {useContext} from 'react';
import {FlatList, View, Button, Text, Alert} from 'react-native';
import {stylesCarts} from '../styles/stylesCarts';
import stylesHome from '../styles/stylesHome';
import CardsProducts from './CardsProducts';
import TaskContext from '../context/TaskContext';
import {ScrollView} from 'react-native-gesture-handler';
import ConfirmationAlert from '../components/ConfirmationAlert';

const ShoppingCartsScreen = ({navigation}) => {
  const {state, dispatch} = useContext(TaskContext);

  const getTotalShippingCost = () => {
    return state.productsBuy
      .filter(item => item.userCorreo === state.userConnect[0]?.userCorreo)
      .reduce((total, item) => total + item.shippingCost * item.amount, 0)
      .toFixed(2);
  };

  const getTotalPrice = () => {
    return state.productsBuy
      .filter(item => item.userCorreo === state.userConnect[0]?.userCorreo)
      .reduce((total, item) => {
        let precio = item.price;
        if (item.discount) {
          precio = precio - (precio * item.discount) / 100;
        }
        return total + precio * item.amount;
      }, 0)
      .toFixed(2);
  };

  const getTotalDiscount = () => {
    return state.productsBuy
      .filter(item => item.userCorreo === state.userConnect[0]?.userCorreo)
      .reduce((total, item) => {
        return (
          total +
          (item.discount
            ? ((item.price * item.discount) / 100) * item.amount
            : 0)
        );
      }, 0)
      .toFixed(2);
  };

  const calculateTotal = () => {
    const totalPrice = getTotalPrice() || 0;
    const totalShipping = getTotalShippingCost() || 0;
    const totalDiscount = getTotalDiscount() || 0;

    return (
      parseFloat(totalPrice) +
      parseFloat(totalShipping) -
      parseFloat(totalDiscount)
    );
  };

  const cardBuyPress = item => {
    navigation.navigate('Details', {id: item.id});
  };

  const finallyPurchase = () => {
    const lastIdPurchases =
      state.purchaseHistory.length > 0
        ? parseFloat(
            state.purchaseHistory[state.purchaseHistory.length - 1]?.id,
          ) + 1
        : 1;

    const bodyPurchase = {
      id: lastIdPurchases,
      title: `Compra app movil ${lastIdPurchases}`,
      shippingCost: parseFloat(getTotalShippingCost()),
      valorBruto: parseFloat(getTotalPrice()),
      discount: parseFloat(getTotalDiscount()),
      dateBuy: new Date().toLocaleDateString('es-ES'),
      valorTotal: parseFloat(calculateTotal()),
      medioDePago: 'Tarjeta de crédito',
      estado: 'proceso',
      userCorreo: state.userConnect[0]?.userCorreo,
      products: state.productsBuy
        .filter(item => item.userCorreo === state.userConnect[0]?.userCorreo)
        .map(item => item.id),
    };
    dispatch({
      type: 'ADD_ITEM',
      payload: bodyPurchase,
      collectionType: 'purchaseHistory',
    });

    dispatch({
      type: 'DELETE_ALL_ITEMS',
      payload: '',
      collectionType: 'productsBuy',
    });

    Alert.alert('Registro Exitoso', '¡Tu compra a sido realizada!');
    navigation.navigate('MyPurchases');
  };

  const onDeletePress = item => {
    ConfirmationAlert({
      title: 'Confirmar eliminación',
      message: `¿Estás seguro de que quieres eliminar ${item.title} de tu carrito?`,
      onConfirm: () =>
        dispatch({
          type: 'DELETE_ITEM',
          payload: {id: item.id},
          collectionType: 'productsBuy',
        }),
      onCancel: () => console.log('Eliminación cancelada'),
    });
  };

  return (
    <ScrollView>
      <View style={stylesHome.productListContainer}>
        <FlatList
          data={state.productsBuy}
          renderItem={({item}) => (
            <CardsProducts
              item={item}
              cardBuyPress={cardBuyPress}
              mostrarBotonDelete={true}
              onDeletePress={onDeletePress}
            />
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={stylesHome.productList}
        />
      </View>

      <View style={stylesCarts.footer}>
        <Text style={stylesCarts.total}>Total: ${calculateTotal()}</Text>
        <Button title="Proceder al Pago" onPress={() => finallyPurchase()} />
      </View>
    </ScrollView>
  );
};

export default ShoppingCartsScreen;
