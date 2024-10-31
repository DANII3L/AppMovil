import React, {useContext, useEffect, useRef, useState} from 'react';
import {Text, Button, ScrollView, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {TextInput} from 'react-native-paper';
import {stylesSupport} from '../styles/stylesSupport';
import {FirebaseContext} from '../firebase';
import TaskContext from '../context/TaskContext';

const RequestScreen = ({navigation}) => {
  const [requestType, setRequestType] = useState('queja');
  const [description, setDescription] = useState('');
  const [countSupport, setCount] = useState(0);
  const {firebase} = useContext(FirebaseContext);
  const {state, dispatch} = useContext(TaskContext);
  const userCorreo = state.userConnect[0]?.userCorreo ?? null;

  useEffect(() => {
    firebase.db
      .collection('support')
      .get()
      .then(querySnapshot => {
        setCount(querySnapshot.docs.length);
        console.log(querySnapshot.docs.length);
      });
  }, [dispatch, firebase.db]);

  const onSend = () => {
    if (!description || description.length > 300) {
      Alert.alert(
        'Error',
        'La descripción debe tener entre 1 y 300 caracteres.',
      );
      return;
    }
    setRequestType('');
    setDescription('');
    const itemNew = {
      id: countSupport + 1,
      description: description,
      requestType: requestType,
    };

    firebase.db
      .collection('support')
      .doc(itemNew.id.toString() + '_' + userCorreo)
      .set(itemNew);
    Alert.alert('Éxito', 'Solicitud enviada con éxito.');
    navigation.navigate('MainStack');
  };

  return (
    <ScrollView contentContainerStyle={stylesSupport.container}>
      <Text style={stylesSupport.title}>Enviar Solicitud</Text>

      <Text style={stylesSupport.label}>Tipo de solicitud</Text>
      <Picker
        selectedValue={requestType}
        style={stylesSupport.picker}
        onValueChange={itemValue => setRequestType(itemValue)}>
        <Picker.Item label="Queja" value="queja" />
        <Picker.Item label="Petición" value="peticion" />
        <Picker.Item label="Recurso" value="recurso" />
      </Picker>

      <Text style={stylesSupport.label}>Descripción de la solicitud</Text>
      <TextInput
        style={stylesSupport.textInput}
        mode="outlined"
        multiline
        numberOfLines={4}
        maxLength={300}
        value={description}
        onChangeText={text => setDescription(text)}
        placeholder="Escribe aquí..."
      />

      <Button title="Enviar" onPress={onSend} style={stylesSupport.button} />
    </ScrollView>
  );
};

export default RequestScreen;
