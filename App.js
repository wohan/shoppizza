import React from 'react';
import {Text, Image, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {observer, Provider} from 'mobx-react';
import {NavigationContainer} from '@react-navigation/native';

import Categories from './src/screens/Categories';
import Basket from './src/screens/Basket';
import Payment from './src/screens/Payment';
import Home from './src/screens/Home';
import Product from './src/screens/Product';
import Delivery from './src/screens/Delivery';
import History from './src/screens/History';
import Profile from './src/screens/Profile';
import CategoryStore from './src/stories/CategoryStore';
import BasketStore from './src/stories/BasketStore';
import ProductStore from './src/stories/ProductStore';
import OrderStore from './src/stories/OrderStore';
import {
  IconCategory,
  IconCategoryPink,
  IconHistory,
  IconHistoryPink,
  IconHome,
  IconHomePink,
  IconShoppingBag,
  IconShoppingBagPink,
} from './assets/icon/icons';
import PaymentSuccess from './src/screens/PaymentSuccess';
import PaymentError from './src/screens/PaymentError';
import {colors} from './assets/colors/colors';
import Products from './src/screens/Products';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const stories = {
  categoryStore: CategoryStore,
  basketStore: BasketStore,
  productStore: ProductStore,
  orderStore: OrderStore,
};

const CategoriesStack = () => {
  return (
    <Stack.Navigator initialRouteName={'categories'}>
      <Stack.Screen
        name={'categories'}
        component={Categories}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'products'}
        component={Products}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'product'}
        component={Product}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const BasketStack = () => {
  return (
    <Stack.Navigator initialRouteName={'basket'}>
      <Stack.Screen
        name={'basket'}
        component={Basket}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'delivery'}
        component={Delivery}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'payment'}
        component={Payment}
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
    <Stack.Navigator initialRouteName={'home'}>
      <Stack.Screen
        name={'home'}
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'product'}
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

const ProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName={'profile'}>
      <Stack.Screen
        name={'profile'}
        component={Profile}
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
            initialRouteName={'home'}
            screenOptions={({route}) => ({
              tabBarIcon: ({focused, color, size}) => {
                if (route.name === 'home') {
                  return focused ? (
                    <IconHomePink color={color} />
                  ) : (
                    <IconHome color={color} />
                  );
                } else if (route.name === 'categories') {
                  return focused ? (
                    <IconCategoryPink color={color} />
                  ) : (
                    <IconCategory color={color} />
                  );
                } else if (route.name === 'basket') {
                  return focused ? (
                    <IconShoppingBagPink color={color} />
                  ) : (
                    <IconShoppingBag color={color} />
                  );
                } else if (route.name === 'history') {
                  return focused ? (
                    <IconHistoryPink color={color} />
                  ) : (
                    <IconHistory color={color} />
                  );
                } else if (route.name === 'profile') {
                  return (
                    <Image
                      source={require('./assets/images/ava.jpg')}
                      style={styles.image}
                    />
                  );
                }
              },
              tabBarLabel: ({focused, color, size}) => {
                if (route.name === 'home') {
                  return (
                    <Text
                      style={{
                        ...styles.textTabs,
                        color: focused ? colors.pink : colors.blueMenu,
                      }}>
                      Главная
                    </Text>
                  );
                } else if (route.name === 'categories') {
                  return (
                    <Text
                      style={{
                        ...styles.textTabs,
                        color: focused ? colors.pink : colors.blueMenu,
                      }}>
                      Категории
                    </Text>
                  );
                } else if (route.name === 'basket') {
                  return (
                    <Text
                      style={{
                        ...styles.textTabs,
                        color: focused ? colors.pink : colors.blueMenu,
                      }}>
                      Корзина
                    </Text>
                  );
                } else if (route.name === 'history') {
                  return (
                    <Text
                      style={{
                        ...styles.textTabs,
                        color: focused ? colors.pink : colors.blueMenu,
                      }}>
                      История
                    </Text>
                  );
                } else if (route.name === 'profile') {
                  return (
                    <Text
                      style={{
                        ...styles.textTabs,
                        color: focused ? colors.pink : colors.blueMenu,
                      }}>
                      Профиль
                    </Text>
                  );
                }
              },
            })}
            tabBarOptions={{
              activeTintColor: colors.white,
              inactiveTintColor: colors.white,
            }}>
            <Tab.Screen
              options={{tabBarBadge: true}}
              name={'home'}
              component={ProductsStack}
            />
            <Tab.Screen name={'categories'} component={CategoriesStack} />
            <Tab.Screen name={'basket'} component={BasketStack} />
            <Tab.Screen name={'history'} component={HistoryStack} />
            <Tab.Screen name={'profile'} component={ProfileStack} />
          </Tab.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 25,
    height: 25,
    borderRadius: 25,
  },
  textTabs: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 12,
    color: colors.blueMenu,
  },
});

export default App;
