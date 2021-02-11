import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './components/pages/Home'
import Prices from './components/pages/Prices'
import Details from './components/pages/Details'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ title: 'Indicadores' }}/>
        <Stack.Screen name="Prices" component={Prices} options={{ title: 'Precios' }}/>
        <Stack.Screen name="Details" component={Details} options={{ title: 'Details' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
