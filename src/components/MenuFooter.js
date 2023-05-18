import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames'
import { Icon } from 'react-native-elements'

const MenuFooter = () => {

    const navigation = useNavigation();

    return (
        <View style={[tw`flex-row pl-6  items-center justify-between`,{width: "100%"}]}>
            <TouchableOpacity
                style={tw`flex-row p-2`}
                onPress={() => navigation.navigate('HomeScreen')}>
                <Icon
                    size={30}
                    name='bars'
                    type='font-awesome'
                    color='#002443' />
            </TouchableOpacity>
            <TouchableOpacity
                style={tw`flex-row p-2 `}
                onPress={() => navigation.navigate('HomeScreen')}>
                <Icon
                    size={35}
                    name='house'
                    type='font-awesome-5Free-Regular'
                    color='#002443' />
            </TouchableOpacity>
            <TouchableOpacity
                style={tw`flex-row p-2 mr-10 `}
                onPress={() => navigation.navigate('HomeScreen')}>
                <Icon
                    size={30}
                    name='caret-left'
                    type='font-awesome'
                    color='#002443' />
            </TouchableOpacity>
        </View>
    )
}

export default MenuFooter

const styles = StyleSheet.create({})
