import React from 'react'
import { View, Text } from 'react-native'
import { Icon } from 'react-native-elements'
import tw from 'tailwind-react-native-classnames';

const MainMenuOption = ({ icon, title, size }) => {
    return (
        <View style={[ tw`p-8 mb-5 flex-row items-center rounded-2xl border border-gray-300		` ]}>
            <Icon type='font-awesome' name={icon} size={size ? size : 50} color='#ee8920' />
            <Text style={tw`pl-5 text-base font-bold text-gray-700`}>{title}</Text>
        </View>
    )
}

export default MainMenuOption
