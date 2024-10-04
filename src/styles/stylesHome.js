import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const stylesHome = StyleSheet.create({
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 10,
    padding: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    flexDirection: 'row',
    alignItems: 'center',
    width: width - 20,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  productValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'grey',
  },
  productDiscount: {
    fontSize: 14,
    color: 'green',
    marginTop: 5,
  },
  productListContainer: {
    paddingHorizontal: 10,
  },
  productList: {
    paddingBottom: 20,
  },
  flatList: {
    flex: 1,
    marginTop: 10,
  },
  amount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4a4a4a',
    marginTop: 5,
    backgroundColor: '#f0f0f0',
    padding: 5,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
    alignSelf: 'flex-start',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  detailsContainer: {
    marginBottom: 30,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  detailText: {
    fontSize: 16,
    color: '#333',
    marginVertical: 5,
  },
});

export default stylesHome;
