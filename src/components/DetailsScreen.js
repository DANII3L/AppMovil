import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Button,
  FlatList,
  TextInput,
} from 'react-native';
import {productsData} from '../data/productsData';
import styleDetails from '../styles/styleDetails';

const DetailsScreen = ({route}) => {
  const {id} = route.params;
  const item = productsData.find(product => product.id === id);

  if (!item) {
    return <Text>Producto no encontrado</Text>;
  }

  const [quantity, setQuantity] = useState('1');

  const handleQuantityChange = text => {
    if (/^\d*$/.test(text)) {
      setQuantity(text);
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
        <Button title="Agregar al carrito" onPress={() => {}} />
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
          renderItem={({item}) => <Text style={styleDetails.question}>- {item}</Text>}
          keyExtractor={(item, index) => index.toString()}
        />

        <Text style={styleDetails.commentsTitle}>Comentarios:</Text>
        <FlatList
          data={item.comentarios}
          renderItem={({item}) => <Text style={styleDetails.comment}>- {item}</Text>}
          keyExtractor={(item, index) => index.toString()}
        />

        <Text style={styleDetails.rating}>
          Calificación: {item.calificacion} estrellas
        </Text>
      </View>
    </ScrollView>
  );
};

export default DetailsScreen;
