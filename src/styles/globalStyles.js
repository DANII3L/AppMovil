import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingHorizontal: 10,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10,
    borderRadius: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  headerText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
  },
  content: {
    padding: 10,
  },
  contentText: {
    fontSize: 16,
    marginBottom: 10,
  },
  section: {
    marginVertical: 15,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    paddingVertical: 8,
    color: '#007BFF',
  },
  divider: {
    height: 1,
    backgroundColor: '#DDD',
    marginVertical: 10,
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardList: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    margin: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  cardText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonMargin: {
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  icon: {
    marginLeft: 10,
  },
  buttonContainer: {
    marginBottom: 10,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  containerSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginHorizontal: 15,
    marginVertical: 10,
  },
  iconSearch: {
    marginHorizontal: 8,
  },
  inputSearch: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#f1f1f1',
    fontSize: 16,
  },
  containerSwiper: {
    backgroundColor: '#f8f8f8',
    overflow: 'hidden',
    height: 210,
  },
  containerBuys: {
    backgroundColor: '#f8f8f8',
    overflow: 'hidden',
    height: 270,
    paddingTop: 5
  },
  titleBlack: {
    alignSelf: 'flex-start',
    paddingTop: 5 ,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  containerCard: {
    width: width,
    height: 210,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  containerContinueBuy: {
    flex: 1,
    paddingLeft: 20,
    alignItems: 'center', 
  },
  flatListContainer: {
    paddingRight: 8,
    marginBottom: 0,
    paddingBottom: 0
  },
  buttonContainer: {
    marginTop: 10,
  }, 
  cardContainerBuys: {
    marginRight: 8,
    width: 120,
    height: 150
  }, 
  cardItem: {
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  cardText: {
    marginTop: 8,
    textAlign: 'center',
  },
  dateButton: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  dateButtonText: {
    color: '#000',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  }
});
export default globalStyles;
