import React from 'react';
import {Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {observer, Provider} from 'mobx-react';
import {NavigationContainer} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EStyleSheet from 'react-native-extended-stylesheet';

import Categories from './src/screens/Categories';
import Basket from './src/screens/Basket';
import Payment from './src/screens/Payment';
import Products from './src/screens/Products';
import Product from './src/screens/Product';
import Delivery from './src/screens/Delivery';
import History from './src/screens/History';
import CategoryStore from './src/stories/CategoryStore';
import BasketStore from './src/stories/BasketStore';
import ProductStore from './src/stories/ProductStore';
import {
  IconCategory,
  IconHistory,
  IconHome,
  IconShoppingBag,
} from './assets/icon/icons';
import PaymentSuccess from './src/screens/PaymentSuccess';
import PaymentError from './src/screens/PaymentError';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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
      <Stack.Screen
        name={'delivery'}
        component={Delivery}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'paymentsuccess'}
        component={PaymentSuccess}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'paymenterror'}
        component={PaymentError}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const PaymentStack = () => {
  return (
    <Stack.Navigator initialRouteName={'payment'}>
      <Stack.Screen
        name={'payment'}
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

const HistoryStack = () => {
  return (
    <Stack.Navigator initialRouteName={'history'}>
      <Stack.Screen
        name={'history'}
        component={History}
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
              component={ProductsStack}
              option={{
                tabBarLabel: 'Каталог1',
                tabBarIcon: ({color, size}) => <IconHome />,
              }}
            />
            <Tab.Screen
              name={'Категории'}
              component={CategoriesStack}
              option={{
                tabBarLabel: 'Корзина',
                tabBarIcon: ({color, size}) => <IconCategory />,
              }}
            />
            <Tab.Screen
              name={'Корзина'}
              component={BasketStack}
              option={{
                tabBarLabel: 'Оплата',
                tabBarIcon: ({color, size}) => <IconShoppingBag />,
              }}
            />
            <Tab.Screen
              name={'История'}
              component={HistoryStack}
              option={{
                tabBarLabel: 'История',
                tabBarIcon: ({color, size}) => <IconHistory />,
              }}
            />
            <Tab.Screen
              name={'Payment'}
              component={PaymentStack}
              option={{
                tabBarLabel: 'Товар',
                tabBarIcon: ({color, size}) => (
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
