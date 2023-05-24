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
            style={[tw`bg-white shadow-md rounded-md `, { borderColor: '#24104F', borderWidth: 2, flexDirection: 'row', padding: 20, justifyContent: 'space-between', marginBottom: 20 }]}>
            <Text style={{ fontSize: 20 }}>{title}</Text>
            <Icon
                size={26}
                name={icon}
                type={fontFamily}
                color={color} />

        </TouchableOpacity>
    )
}

export default MenuItem
