import React from 'react';
import {Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { observer, Provider } from "mobx-react";
import {NavigationContainer} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EStyleSheet from 'react-native-extended-stylesheet';

import Categories from './src/screens/Categories';
import Basket from './src/screens/Basket';
import Payment from './src/screens/Payment';
import Products from './src/screens/Products';
import Product from './src/screens/Product';
import CategoryStore from './src/stories/CategoryStore';
import BasketStore from './src/stories/BasketStore';
import ProductStore from './src/stories/ProductStore';
import { IconCategory, IconHistory, IconHome, IconShoppingBag } from "./assets/icon/icons";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Ionicons.loadFont();

const stories = {
  categoryStore: CategoryStore,
  basketStore: BasketStore,
  productStore: ProductStore,
};

const CategoriesStack = () => {
  return (
    <Stack.Navigator initialRouteName={'categories'}>
      <Stack.Screen
        name={'categories'}
        component={Categories}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const BasketStack = () => {
  return (
    <Stack.Navigator initialRouteName={'Basket'}>
      <Stack.Screen
        name={'Basket'}
        component={Basket}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const PaymentStack = () => {
  return (
    <Stack.Navigator initialRouteName={'Payment'}>
      <Stack.Screen
        name={'Payment'}
        component={Payment}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const ProductsStack = () => {
  return (
    <Stack.Navigator initialRouteName={'Products'}>
      <Stack.Screen
        name={'Products'}
        component={Products}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const ProductStack = () => {
  return (
    <Stack.Navigator initialRouteName={'Product'}>
      <Stack.Screen
        name={'Product'}
        component={Product}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

@observer
class App extends React.Component {
  render() {
    return (
      <Provider {...stories}>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName={'categories'}
            tabBarOptions={{
              activeTinColor: '#42f44b',
            }}>
            <Tab.Screen
              name={'Главная'}
              component={CategoriesStack}
              option={{
                tabBarLabel: 'Каталог1',
                tabBarIcon: ({ color, size }) => <IconHome />,
              }}
            />
            <Tab.Screen
              name={'basket'}
              component={BasketStack}
              option={{
                tabBarLabel: 'Корзина',
                tabBarIcon: ({ color, size }) => <IconCategory />,
              }}
            />
            <Tab.Screen
              name={'payment'}
              component={PaymentStack}
              option={{
                tabBarLabel: 'Оплата',
                tabBarIcon: ({ color, size }) => <IconShoppingBag />,
              }}
            />
            <Tab.Screen
              name={'products'}
              component={ProductsStack}
              option={{
                tabBarLabel: 'Товары',
                tabBarIcon: ({ color, size }) => <IconHistory />,
              }}
            />
            <Tab.Screen
              name={'product'}
              component={ProductStack}
              option={{
                tabBarLabel: 'Товар',
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="cog" color={color} size={size} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
