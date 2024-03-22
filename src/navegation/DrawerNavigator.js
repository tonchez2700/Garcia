import React, { useContext, useState, useEffect } from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerItemList, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Context as AuthContext } from './../context/AuthContext';
import Images from "../components/assets/images";
import { NavigationContainer } from '@react-navigation/native';


const DrawerNavigator = props => {

  const { signout } = useContext(AuthContext);
  const [user, setUser] = useState('')

  useEffect(() => {
    async function getLocalUser() {
      const localUser = JSON.parse(await AsyncStorage.getItem('user'))
      setUser(localUser)
    }
    getLocalUser()
  }, [user])

  const filteredState = props.state.routes.filter(
    route => route.name !== 'Pruebas'
  );
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <DrawerContentScrollView
        {...props}>
        <TouchableOpacity
          style={{ alignItems: 'center' }}
          onPress={() => props.navigation.navigate('Perfil')}
        >
          {user != ''
            ?
            <View style={{ alignItems: 'center' }}>
              {
                user?.userData.picture == null
                  ?
                  <Image style={{
                    width: 150, height: 150,
                    borderRadius: 50,
                    margin: 20,
                  }} source={Images.perfil} />
                  :
                  <Image style={{
                    width: 150, height: 150,
                    borderRadius: 50,
                    margin: 20,
                  }}
                    source={{
                      uri: user?.userData.picture.startsWith('http')
                        ? user?.userData.picture
                        : `https://www.appalaorden.garcia.gob.mx/garcia/${user?.userData.picture}`
                    }} />
              }
              <Text style={{ textAlign: 'center', fontWeight: '500' }}> {user?.userData.full_name}</Text>
            </View>
            : null
          }
        </TouchableOpacity>
        <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 }}>
          <DrawerItemList {...props} state={{ ...props.state, routes: filteredState }} />
        </View>
        <DrawerItem
          label="Salir"

          onPress={() => {
            signout()
            props.navigation.closeDrawer()
          }}
        />
      </DrawerContentScrollView>
    </View >
  );
};
export default DrawerNavigator
