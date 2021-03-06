import React from 'react';
import {Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Categories from './src/screens/Categories';
import Basket from './src/screens/Basket';
import Payment from './src/screens/Payment';
import Products from './src/screens/Products';
import Product from './src/screens/Product';
import {Provider} from 'mobx-react/src/Provider';
import {NavigationContainer} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EStyleSheet from 'react-native-extended-stylesheet';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

Ionicons.loadFont();

const stories = {};

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

const App = () => {
  return (
    <Provider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName={'categories'}
          tabBarOptions={{
            activeTinColor: '#42f44b',
          }}>
          <Tab.Screen
            name={'??????????????'}
            component={CategoriesStack}
            option={{
              tabBarLabel: '??????????????',
              tabBarIcon: ({color, size}) => <Text>??????????????</Text>,
            }}
          />
          <Tab.Screen
            name={'??????????????'}
            component={BasketStack}
            option={{
              tabBarLabel: '??????????????',
              tabBarIcon: ({color, size}) => <Text>??????????????</Text>,
            }}
          />
          <Tab.Screen
            name={'????????????'}
            component={PaymentStack}
            option={{
              tabBarLabel: '????????????',
              tabBarIcon: ({color, size}) => <Text>????????????</Text>,
            }}
          />
          <Tab.Screen
            name={'????????????'}
            component={ProductsStack}
            option={{
              tabBarLabel: '????????????',
              tabBarIcon: ({color, size}) => (
                <Ionicons name="cog" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name={'??????????'}
            component={ProductStack}
            option={{
              tabBarLabel: '??????????',
              tabBarIcon: ({color, size}) => (
                <Ionicons name="cog" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
