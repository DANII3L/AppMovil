import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../src/components/HomeScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileScreen from '../src/components/ProfileScreen';
import ShoppingCartsScreen from '../src/components/ShoppingCartsScreen';
import OptionsScreen from '../src/components/OptionsScreen';
import SupportScreen from '../src/components/SupportScreen';
import SearchBarScreen from '../src/components/SearchBarScreen';
import SettingsScreen from '../src/components/SettingsScreen';
import RegisterScreen from '../src/components/RegisterScreen';
import PaymentBranchScreen from '../src/components/PaymentBranchScreen';
import OffersScreen from '../src/components/OffersScreen';
import LoginScreen from '../src/components/LoginScreen';
import ListArticlesScreen from '../src/components/ListArticlesScreen';
import FavoritesScreen from '../src/components/FavoritesScreen';
import CategoryArticles from '../src/components/CategoryArticles';
import DetailsScreen from '../src/components/DetailsScreen';
import MyPurchasesScreen from '../src/components/MyPurchasesScreen';
import {createStackNavigator} from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const homeName = 'Home';
const profileName = 'Profile';
const shoppingCartsName = 'ShoppingCarts';
const optionsName = 'Options';

const MainStack = () => {
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === homeName) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === profileName) {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === shoppingCartsName) {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === optionsName) {
            iconName = focused ? 'list' : 'list-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'grey',
        tabBarLabelStyle: {
          paddingBottom: 10,
          fontSize: 10,
        },
        tabBarStyle: [
          {
            display: 'flex',
            height: 60,
          },
          null,
        ],
      })}>
      <Tab.Screen
        name={homeName}
        component={HomeScreen}
        options={{title: 'Bienvenido'}}
      />
      <Tab.Screen
        name={profileName}
        component={ProfileScreen}
        options={{title: 'Perfil'}}
      />
      <Tab.Screen
        name={shoppingCartsName}
        component={ShoppingCartsScreen}
        options={{title: 'Carrito de compras'}}
      />
      <Tab.Screen
        name={optionsName}
        component={OptionsScreen}
        options={{title: 'Opciones'}}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Stack.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{title: 'Mis favoritos', tabBarButton: () => null}}
      />
      <Stack.Screen
        name="MyPurchases"
        component={MyPurchasesScreen}
        options={{title: 'Mis compras', tabBarButton: () => null}}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{title: 'Detalle', tabBarButton: () => null}}
      />
    </Tab.Navigator>
  );
};

const AppStack = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainStack"
        component={MainStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{title: 'Home'}}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{title: 'Registrarse'}}
      />
      <Stack.Screen
        name="Category"
        component={CategoryArticles}
        options={{title: 'Categorias'}}
      />
      <Stack.Screen
        name="ListArticles"
        component={ListArticlesScreen}
        options={{title: 'Lista de articulos'}}
      />
      <Stack.Screen
        name="Offers"
        component={OffersScreen}
        options={{title: 'Ofertas'}}
      />
      <Stack.Screen
        name="PaymentBranch"
        component={PaymentBranchScreen}
        options={{title: 'Pasarela de pago'}}
      />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen
        name="ShoppingCarts"
        component={ShoppingCartsScreen}
        options={{title: 'Carrito de compras'}}
      />
      <Stack.Screen
        name="Support"
        component={SupportScreen}
        options={{title: 'Soporte y Ayuda'}}
      />
      <Stack.Screen name="Search" component={SearchBarScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
