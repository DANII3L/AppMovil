import React, {useContext, useEffect, useRef, useState} from 'react';
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
import {FirebaseContext} from '../firebase';

const MyPurchasesScreen = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const {state, dispatch} = useContext(TaskContext);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const {firebase} = useContext(FirebaseContext);
  const dataLoadedRef = useRef(false);
  const userCorreo = state.userConnect[0]?.userCorreo ?? null;
  useEffect(() => {
    if (!dataLoadedRef.current) {
      firebase.db
        .collection('purchaseHistory')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            if (doc.id.includes('_' + userCorreo)) {
              let purchase = {
                id: Number(doc.data().id),
                title: doc.data().title,
                shippingCost: doc.data().shippingCost
                  ? Number(doc.data().shippingCost)
                  : null,
                valorBruto: doc.data().valorBruto
                  ? Number(doc.data().valorBruto)
                  : null,
                discount: doc.data().discount
                  ? Number(doc.data().discount)
                  : null,
                dateBuy: formatDate(doc.data().dateBuy),
                valorTotal: doc.data().valorTotal
                  ? Number(doc.data().valorTotal)
                  : null,
                medioDePago: doc.data().medioDePago,
                estado: doc.data().estado,
                userCorreo: doc.data().userCorreo ?? null,
                products: doc.data().products,
              };
              const exists = state.purchaseHistory.some(
                item => item.id === purchase.id,
              );
              if (!exists) {
                dispatch({
                  type: 'SET_ITEMS',
                  payload: purchase,
                  collectionType: 'purchaseHistory',
                });
              }
            }
          });
        });
      dataLoadedRef.current = true;
    }
  }, [dispatch, state.purchaseHistory, firebase.db, userCorreo]);

  const formatDate = date => {
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

    const isMatchingUserCorreo = item.userCorreo === userCorreo;
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
        firebase.db
          .collection('purchaseHistory')
          .doc(item.id.toString() + '_' + userCorreo)
          .update(updatedItem);
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
