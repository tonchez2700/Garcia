import React from 'react'
import { Header, Icon } from 'react-native-elements';
import Logo from './Logo';
import Images from '@assets/images';

const SimpleNavBar = () => {
    return (
        <Header
            backgroundColor="#004480"
            barStyle="default"
            leftContainerStyle={{ justifyContent: 'center' }}
            rightContainerStyle={{ justifyContent: 'center' }}
        />

    )
}

export default SimpleNavBar
