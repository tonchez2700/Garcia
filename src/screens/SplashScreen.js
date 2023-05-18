import React from 'react'
import { View, Text, ImageBackground, ActivityIndicator } from 'react-native'
import Images from '@assets/images';
import Logo from './../components/Logo';
import tw from 'tailwind-react-native-classnames';

const SplashScreen = () => {
    return (
        <View style={tw`flex-1 bg-white items-center justify-center`}>    
            <Logo size='md' style={tw`pt-8 mb-8`} />
            <ActivityIndicator size="large" color="#118EA6" />
        </View>
    )
}

export default SplashScreen
