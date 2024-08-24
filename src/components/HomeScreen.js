import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import SearchBarScreen from './SearchBarScreen';
import globalStyles from '../styles/globalStyles';
import {carouselData} from '../data/carouselData';
import CarouselItem from './CarouselItem';
import Swiper from 'react-native-swiper';
import {continueBuyData} from '../data/continueBuyData';
import ContinueBuyingSection from './ContinueBuySection';
import {useAuth} from '../data/authContext';
import {productsData} from '../data/productsData';
import stylesHome from '../styles/stylesHome';
import {ScrollView} from 'react-native-gesture-handler';

const HomeScreen = ({navigation}) => {
  const {isAuthenticated} = useAuth();
  const [searchText, setSearchText] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(productsData);

  useEffect(() => {
    if (!isAuthenticated) {
      navigation.navigate('Login');
    }
  }, [isAuthenticated, navigation]);

  useEffect(() => {
    const filtered = productsData.filter(product =>
      product.title.toLowerCase().includes(searchText.toLowerCase()),
    );
    setFilteredProducts(filtered);
  }, [searchText]);

  const handleSearch = query => {
    setSearchText(query);
  };

  const handlePress = item => {
    navigation.navigate('Offers');
  };

  const cardBuyPress = item => {
    navigation.navigate('Details', {id: item.id});
  };

  const renderProductItem = ({item}) => (
    <TouchableOpacity
      style={stylesHome.productCard}
      onPress={() => cardBuyPress(item)}>
      <Image source={{uri: item.image}} style={stylesHome.productImage} />
      <View style={stylesHome.productInfo}>
        <Text style={stylesHome.productTitle}>{item.title}</Text>
        <Text style={stylesHome.productDescription}>{item.description}</Text>
        <Text style={stylesHome.productValue}>${item.price.toFixed(2)}</Text>
        {item.discount && (
          <Text style={stylesHome.productDiscount}>-${item.discount}%</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <ScrollView contentContainerStyle={globalStyles.scrollViewContent}>
        <View>
          <SearchBarScreen onSearch={handleSearch} />
        </View>
        <View style={globalStyles.containerSwiper}>
          <Swiper
            showsPagination={false}
            autoplay={true}
            autoplayTimeout={5}
            loop={true}>
            {carouselData.map((item, index) => (
              <CarouselItem key={index} item={item} onPress={handlePress} />
            ))}
          </Swiper>
        </View>
        <View style={globalStyles.containerBuys}>
          <ContinueBuyingSection
            continueBuyData={continueBuyData}
            cardBuyPress={cardBuyPress}
            navigation={navigation}
          />
        </View>
        <View style={stylesHome.productListContainer}>
          <Text style={globalStyles.titleBlack}>Lista de Productos</Text>
          <FlatList
            data={filteredProducts}
            renderItem={renderProductItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={stylesHome.productList}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
