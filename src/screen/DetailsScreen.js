import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Button,
  FlatList,
  TextInput,
  Alert,
} from 'react-native';
import {productsData} from '../data/productsData';
import styleDetails from '../styles/styleDetails';
import TaskContext from '../context/TaskContext';
import stylesFavorites from '../styles/stylesFavorites';

const DetailsScreen = ({route}) => {
  const {id} = route.params;
  const [quantity, setQuantity] = useState('1');
  const {state, dispatch} = useContext(TaskContext);
  const item = productsData.find(product => product.id === id);
  const statusColor = item.estado === 'Disponible' ? 'green' : 'red';

  if (!item) {
    return <Text>Producto no encontrado</Text>;
  }

  const handleQuantityChange = text => {
    if (/^\d*$/.test(text)) {
      setQuantity(text);
    }
  };

  const handleItemPress = (producto, cantidad) => {
    const cantidadNumerica = parseInt(cantidad, 10);
    if (isNaN(cantidadNumerica) || cantidadNumerica <= 0) {
      Alert.alert('Por favor, ingrese una cantidad válida');
      return;
    }

    if (cantidadNumerica > producto.amount) {
      Alert.alert('No hay suficiente stock para agregar al carrito');
      return;
    }

    const userCorreo = state.userConnect[0].userCorreo;

    if (
      !state.productsBuy.some(
        product => product.id === producto.id && product.userCorreo === userCorreo,
      )
    ) {
      dispatch({
        type: 'ADD_ITEM',
        payload: {
          ...producto,
          amount: cantidadNumerica,
          userCorreo: userCorreo,
        },
        collectionType: 'productsBuy',
      });
      Alert.alert('Producto agregado al carrito');
    } else {
      Alert.alert('Producto ya agregado al carrito');
    }
  };

  return (
    <ScrollView style={styleDetails.container}>
      <Image source={{uri: item.image}} style={styleDetails.productImage} />

      <View style={styleDetails.mainSection}>
        <Text style={styleDetails.title}>{item.title}</Text>
        <Text style={styleDetails.price}>${item.price.toFixed(2)}</Text>
        {item.discount && (
          <Text style={styleDetails.discount}>
            {item.discount}% de descuento aplicado
          </Text>
        )}
        <Text style={styleDetails.description}>{item.description}</Text>
        <Text style={styleDetails.seller}>Vendido por: {item.seller}</Text>
        <Text style={styleDetails.shipping}>
          Costo de envío:{' '}
          {item.shippingCost ? `$${item.shippingCost.toFixed(2)}` : 'Gratis'}
        </Text>
        <Text style={styleDetails.quantityLabel}>Cantidad:</Text>
        <TextInput
          style={styleDetails.quantityInput}
          keyboardType="numeric"
          value={quantity}
          onChangeText={handleQuantityChange}
        />
        <Text style={styleDetails.stock}>Stock: {item.amount}</Text>
        <Text style={[stylesFavorites.itemStatus, {color: statusColor}]}>
          {item.estado}
        </Text>
        {item.estado !== 'No disponible' && (
          <Button
            title="Agregar al carrito"
            onPress={() => {
              handleItemPress(item, quantity);
            }}
          />
        )}
      </View>

      <View style={styleDetails.additionalSection}>
        <Text style={styleDetails.characteristics}>
          Características: {item.caracteristicas}
        </Text>
        <Text style={styleDetails.paymentMethods}>
          Medios de pago: {item.medioDePago.join(', ')}
        </Text>

        <Text style={styleDetails.questionsTitle}>Preguntas frecuentes:</Text>
        <FlatList
          data={item.preguntas}
          renderItem={({item: pregunta}) => (
            <Text style={styleDetails.question}>- {pregunta}</Text>
          )}
          keyExtractor={(_, index) => index.toString()}
        />

        <Text style={styleDetails.commentsTitle}>Comentarios:</Text>
        <FlatList
          data={item.comentarios}
          renderItem={({item: comentario}) => (
            <Text style={styleDetails.comment}>- {comentario}</Text>
          )}
          keyExtractor={(_, index) => index.toString()}
        />

        <Text style={styleDetails.rating}>
          Calificación: {item.calificacion} estrellas
        </Text>
      </View>
    </ScrollView>
  );
};

export default DetailsScreen;
