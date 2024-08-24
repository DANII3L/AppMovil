import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
} from 'react-native';
import {myPurchasesData} from '../data/myPurchasesData';
import DateTimePicker from '@react-native-community/datetimepicker';
import globalStyles from '../styles/globalStyles';
import stylesPurchases from '../styles/stylePurchases';

const MyPurchasesScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const filteredCompras = myPurchasesData.filter(item => {
    const searchTextLower = (
      searchText.length > 0 ? searchText : 'SinValorEnElFiltro'
    ).toLowerCase();
    const isMatchingName = item.nameProducto.toLowerCase().includes(searchTextLower);

    const isMatchingDate = selectedDate ? item.dateBuy === selectedDate : searchText.length > 0 ? false : true;
    return isMatchingName || isMatchingDate;
  });

  const renderCompraItem = ({item}) => (
    <TouchableOpacity style={stylesPurchases.compraItem}>
      <Image source={{uri: item.image}} style={stylesPurchases.imagenProducto} />
      <View style={stylesPurchases.infoProducto}>
        <Text style={stylesPurchases.nameProducto}>{item.nameProducto}</Text>
        <Text style={stylesPurchases.dateBuy}>Fecha de compra: {item.dateBuy}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      const formattedDate = new Date(date.toISOString().split('T')[0]);
      const day = String(formattedDate.getDate()).padStart(2, '0');
      const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
      const year = formattedDate.getFullYear();
      setSelectedDate(`${day}/${month}/${year}`);
    }
  };

  const clearDate = () => {
    setSelectedDate('');
  };

  return (
    <View style={stylesPurchases.container}>

      <TextInput
        style={stylesPurchases.searchBar}
        placeholder="Buscar por nombre"
        value={searchText}
        onChangeText={text => setSearchText(text)}
      />

      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={globalStyles.dateButton}>
        <Text style={globalStyles.dateButtonText}>Seleccionar fecha</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      {selectedDate && (
         <Button title="Limpiar Fecha" onPress={clearDate} />
      )}

      <Text>Fecha seleccionada: {selectedDate ? selectedDate : 'Ninguna'}</Text>

      <FlatList
        data={filteredCompras}
        renderItem={renderCompraItem}
        keyExtractor={item => item.id}
        contentContainerStyle={stylesPurchases.listaCompras}
      />
    </View>
  );
};

export default MyPurchasesScreen;
