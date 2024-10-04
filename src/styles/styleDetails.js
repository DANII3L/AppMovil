import { StyleSheet } from "react-native";

const styleDetails = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    backgroundColor: '#fff',
  },
  mainSection: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  additionalSection: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'black',
  },
  price: {
    fontSize: 20,
    color: '#B12704',
    marginBottom: 8,
  },
  discount: {
    fontSize: 16,
    color: '#007600',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 16,
  },
  seller: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  shipping: {
    fontSize: 14,
    color: '#888',
    marginBottom: 16,
  },
  characteristics: {
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
  },
  paymentMethods: {
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
  },
  questionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  question: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  commentsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  comment: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  rating: {
    fontSize: 16,
    color: '#F39C12',
    marginBottom: 16,
  },
  quantityLabel: {
    fontSize: 16,
    color: '#333',
    marginRight: 8,
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
    width: 100,
    textAlign: 'center',
    marginBottom: 16,
  },
  stock: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default styleDetails;
