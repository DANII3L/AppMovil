import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Button,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import globalStyles from '../styles/globalStyles';
import stylesPurchases from '../styles/stylePurchases';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ConfirmationAlert from '../components/ConfirmationAlert';
import TaskContext from '../context/TaskContext';

const MyPurchasesScreen = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const {state, dispatch} = useContext(TaskContext);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const formatDate = (date) => {
    const parts = date.split('/');
    parts[0] = parts[0].padStart(2, '0');
    return parts.join('/');
  };

  const filteredCompras = state.purchaseHistory.filter(item => {
    const searchTextLower = (
      searchText.length > 0 ? searchText : 'SinValorEnElFiltro'
    ).toLowerCase();
    const isMatchingName = item.title.toLowerCase().includes(searchTextLower);

    const isMatchingDate = selectedDate
      ? formatDate(item.dateBuy) === selectedDate
      : searchText.length > 0
      ? false
      : true;

    const isMatchingUserCorreo = item.userCorreo === state.userConnect[0]?.userCorreo;

    return (isMatchingName || isMatchingDate) && isMatchingUserCorreo;
  });

  const detailsPurchasesPress = item => {
    navigation.navigate('DetailsPurchases', {purchase: item});
  };

  const handleCancel = item => {
    ConfirmationAlert({
      title: 'Confirmar cancelación',
      message: '¿Estás seguro de que quieres cancelar tu compra?',
      onConfirm: () => {
        const updatedItem = {
          ...item,
          estado: 'cancelado',
        };

        console.log(updatedItem);
        dispatch({
          type: 'UPDATE_ITEM',
          payload: updatedItem,
          collectionType: 'purchaseHistory',
        });
      },
      onCancel: () => console.log('Eliminación cancelada'),
    });
  };

  const renderCompraItem = ({item}) => (
    <TouchableOpacity
      style={stylesPurchases.compraItem}
      onPress={() => detailsPurchasesPress(item)}>
      <TouchableOpacity style={stylesPurchases.imagenProducto}>
        <Ionicons
          name={
            item.estado === 'proceso'
              ? 'checkmark-outline'
              : item.estado === 'cancelado'
              ? 'close-outline'
              : 'checkmark-done-outline'
          }
          size={60}
          color={
            item.estado === 'proceso'
              ? 'orange'
              : item.estado === 'cancelado'
              ? 'red'
              : 'green'
          }
        />
      </TouchableOpacity>
      <View style={stylesPurchases.infoProducto}>
        <Text style={stylesPurchases.title}>{item.title}</Text>
        <Text style={stylesPurchases.dateBuy}>
          Fecha de compra: {item.dateBuy}
        </Text>
        {item.estado === 'proceso' && (
          <TouchableOpacity
            style={stylesPurchases.cancelIconContainer}
            onPress={() => handleCancel(item)}>
            <Ionicons name="trash-outline" size={24} color="red" />
          </TouchableOpacity>
        )}
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

      {selectedDate && <Button title="Limpiar Fecha" onPress={clearDate} />}

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
