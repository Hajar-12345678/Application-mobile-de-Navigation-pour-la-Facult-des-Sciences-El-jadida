
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Accueil from './pages/Accueil';
import Login from './pages/Login';
import Mapconfig from './pages/Mapconfig';
import Lieux from './pages/lieux';

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Accueil" component={Accueil} />
        <Stack.Screen name="Login">
          {(props) => <Login {...props} setIsAuth={setIsLoggedIn} />}
        </Stack.Screen>
        <Stack.Screen name="Map" component={Mapconfig} />
        <Stack.Screen name="Lieux" component={Lieux} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}