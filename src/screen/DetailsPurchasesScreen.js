import React, { useContext } from 'react';
import stylesHome from '../styles/stylesHome';
import globalStyles from '../styles/globalStyles';
import {Text, View} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import CardsProducts from './CardsProducts';
import TaskContext from '../context/TaskContext';

const DetailsPurchasesScreen = ({navigation, route}) => {
  const {purchase} = route.params;
  const {state} = useContext(TaskContext);

  const filteredProducts = state.products.filter(item => purchase.products.includes(item.id));

  const cardBuyPress = item => {
    navigation.navigate('Details', {id: item.id});
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={stylesHome.productListContainer}>
        <Text style={globalStyles.titleBlack}>
          Lista de productos de la compra
        </Text>
        <FlatList
          data={filteredProducts}
          renderItem={({item}) => (
            <CardsProducts item={item} cardBuyPress={cardBuyPress} />
          )}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={stylesHome.productList}
        />

        <View style={stylesHome.detailsContainer}>
          <Text style={globalStyles.titleBlack}>Detalles de la compra</Text>
          <Text style={stylesHome.detailText}>
            Fecha de compra: {purchase.dateBuy}
          </Text>
          <Text style={stylesHome.detailText}>
            Costo de envío: ${purchase.shippingCost}
          </Text>
          <Text style={stylesHome.detailText}>
            Valor bruto: ${purchase.valorBruto}
          </Text>
          <Text style={stylesHome.detailText}>
            Descuento: ${purchase.discount}
          </Text>
          <Text style={stylesHome.detailText}>
            Valor total: ${purchase.valorTotal}
          </Text>
          <Text style={stylesHome.detailText}>
            Medio de pago: {purchase.medioDePago}
          </Text>
          <Text style={stylesHome.detailText}>
            Estado: {purchase.estado}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailsPurchasesScreen;
