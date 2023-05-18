import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Context as AuthContext } from './../context/AuthContext';
import tw from 'tailwind-react-native-classnames';
import HomeScreen from './../screens/HomeScreen'

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const { signout } = useContext(AuthContext);

  const HomeScreen = ({ navigation }) => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          onPress={() => navigation.navigate('Notifications')}
          title="Go to notifications"
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={tw`flex-1 bg-blue-300`}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={HomeScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default DrawerNavigator
