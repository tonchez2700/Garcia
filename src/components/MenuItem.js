import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames'
import { Icon } from 'react-native-elements'

const MenuItem = ({ title, icon, fontFamily, navigateScreen, color }) => {

    const navigation = useNavigation();

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate(navigateScreen)}
            style={[tw`p-7 bg-white shadow-md rounded-md mt-3`, { borderColor: '#2D5DA0', borderWidth: 2, width: '40%' }]}>
            <Icon
                size={36}
                name={icon}
                type={fontFamily}
                color={color} />
            <Text style={tw`text-black uppercase font-bold text-lg text-center mt-3`}>{title}</Text>
        </TouchableOpacity>
    )
}

export default MenuItem
