import React, { useContext, useEffect, useState } from 'react'
import { TouchableOpacity, Image, Text } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import Logo from './Logo';
import Images from '@assets/images';
import { View } from 'react-native-web';

const NavBar = (navigation) => {




    const open = () => {
        navigation.navigation.openDrawer();
    }

    return (
        <Header
            backgroundColor="#1E0554"
            barStyle="default"
            containerStyle={{ height: 110 }}
            leftContainerStyle={{ justifyContent: 'center' }}
            rightContainerStyle={{ justifyContent: 'center' }}
            centerComponent={<Image source={Images.garciaLogoBlanco} style={{
                width: '65%',
                height: 40,
            }} />}
            leftComponent={
                <TouchableOpacity
                    onPress={() => open()}
                    style={{ position: 'absolute' }}>
                    <Icon
                        name='bars'
                        size={25}
                        type='font-awesome'
                        color='white' />
                </TouchableOpacity>
            }
        />

    )
}

export default NavBar
