import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import AuthenticationScreen from './src/screens/AuthenticationScreen';
import EnterOTPScreen from './src/screens/EnterOTPScreen';
import EnterEmailOTPScreen from './src/screens/EnterEmailOTPScreen';
import EnterEmailScreen from './src/screens/EnterEmailScreen';
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Authentication">
        <Stack.Screen name="Home" component={HomeScreen} options={{title:'Home', headerBackTitle:''}} />
        <Stack.Screen name="Authentication" component={AuthenticationScreen} options={{title: '', headerBackTitle: ''}}/>
        <Stack.Screen name="EnterOTP" component={EnterOTPScreen} options={{title: '', headerBackTitle: ''}} />
        <Stack.Screen name="EnterEmail" component={EnterEmailScreen} options={{title: '', headerBackTitle: ''}}/>
        <Stack.Screen name="EnterEmailOTP" component={EnterEmailOTPScreen} options={{title: '', headerBackTitle: ''}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
