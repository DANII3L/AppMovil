import {Alert} from 'react-native';

const ConfirmationAlert = ({title, message, onConfirm, onCancel}) => {
  Alert.alert(title, message, [
    {
      text: 'Cancelar',
      onPress: onCancel,
      style: 'cancel',
    },
    {
      text: 'Eliminar',
      onPress: onConfirm,
    },
  ]);
};

export default ConfirmationAlert;
