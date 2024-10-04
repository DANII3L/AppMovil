import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {productsData} from '../data/productsData';
import stylesOffers from '../styles/stylesOffers';

const OffersScreen = ({navigation}) => {
  const [searchText, setSearchText] = useState('');

  const filteredOffers = productsData.filter(
    item =>
      item.discount !== null &&
      item.title.toLowerCase().includes(searchText.toLowerCase()),
  );

  const handlePress = item => {
    navigation.navigate('Details', {id: item.id});
  };

  const renderOfferItem = ({item}) => (
    <TouchableOpacity
      style={stylesOffers.offerItem}
      onPress={() => handlePress(item)}>
      <Image source={{uri: item.image}} style={stylesOffers.imageProduct} />
      <View style={stylesOffers.infoProduct}>

        <Text style={stylesOffers.productTitle}>{item.title}</Text>
        <Text style={stylesOffers.description}>{item.description}</Text>
        <Text style={stylesOffers.price}>Valor: ${item.price.toFixed(2)}</Text>
        <Text style={stylesOffers.discount}>Descuento: {item.discount}%</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={stylesOffers.container}>
      <TextInput
        style={stylesOffers.searchBar}
        placeholder="Buscar por nombre"
        value={searchText}
        onChangeText={text => setSearchText(text)}
      />

      <FlatList
        data={filteredOffers}
        renderItem={renderOfferItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={stylesOffers.listOffers}
      />
    </View>
  );
};

export default OffersScreen;
