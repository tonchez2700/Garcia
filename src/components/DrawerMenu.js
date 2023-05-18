import React, { useContext } from 'react'
import { TouchableOpacity, StatusBar, View } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import { Context as AuthContext } from '../context/AuthContext';
import tw from 'tailwind-react-native-classnames';

const DrawerMenu = (data) => {
    const { signout } = useContext(AuthContext);
    const navigation = useNavigation();
    const openDrawer = () => {
        data.data.navigation.closeDrawer();
    }
    return (

        <View style={[tw`flex-1`, { backgroundColor: '#ECECEC' }]}>
            <Header
                backgroundColor={'#004480'}
                barStyle="light-content"
                rightContainerStyle={{ justifyContent: 'center' }}
                rightComponent={
                    <TouchableOpacity
                        onPress={() => signout()}
                        style={{ position: 'absolute', }}
                    >
                        <Icon
                            size={25}
                            name='sign-out'
                            type='font-awesome'
                            color='white' />
                    </TouchableOpacity>

                }
                leftComponent={
                    <TouchableOpacity
                        onPress={() => openDrawer()}
                        style={{ position: 'absolute', }}>
                        <Icon
                            name='cube'
                            size={25}
                            type='font-awesome'
                            color='white' />
                    </TouchableOpacity>

                }
            />
            <DrawerContentScrollView 
                style={{ paddingVertical: 0, marginTop: -5, backgroundColor: '#ECECEC' }}>
                <DrawerItem
                    label="Inicio"
                    onPress={() => data.data.navigation.navigate('Inicio')}
                />
                <DrawerItem
                    label="Pagos"
                    onPress={() => data.data.navigation.navigate('PaymentsScreen')}
                />
                <DrawerItem
                    label="Estado de Cuenta"
                    onPress={() => data.data.navigation.navigate('AccountStatementScreen')}
                />
                <DrawerItem
                    label="Salir"
                    onPress={() => signout()}
                />

            </DrawerContentScrollView>
        </View>

    )
}

export default DrawerMenu
