import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as AuthProvider } from './src/context/AuthContext'
import { Provider as RegistrationProvider } from './src/context/RegistrationContext'
import { navigationRef } from './src/helpers/rootNavigation'
import AuthScreen from './src/screens/AuthScreen';
import PhotoScreen from './src/screens/PhotoScreen';
import LoadingScreen from './src/screens/LoadingScreen';
import WrapperInnerScreens from './src/screens/WrapperInnerScreens';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer  ref={navigationRef} theme={{ colors: { background: 'white' } }} >
      <AuthProvider>
        <RegistrationProvider>
          <Stack.Navigator
            initialRouteName="LoadingScreen"
            screenOptions={{ headerShown: false, gestureEnabled: false }}>
            <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
            <Stack.Screen name="WrapperInnerScreens" component={WrapperInnerScreens} options={{ animation: 'slide_from_right', gestureEnabled: false }} />
            <Stack.Screen name="AuthScreen" component={AuthScreen} />
            <Stack.Screen name="PhotoScreen" component={PhotoScreen} />
          </Stack.Navigator>
        </RegistrationProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
