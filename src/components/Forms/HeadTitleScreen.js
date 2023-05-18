import React from 'react'
import { Text, View } from 'react-native'
import tw from 'tailwind-react-native-classnames'

const HeadTitleScreen = ({ title }) => {
    return (
        <View>
            <Text style={[tw`text-black uppercase font-bold text-lg text-center my-5`,{color:'#2D5DA0'}]}>{title}</Text>
        </View>
    )
}

export default HeadTitleScreen

