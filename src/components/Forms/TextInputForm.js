import { Text, View, TextInput, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import tw from 'tailwind-react-native-classnames';
import { Input, Icon } from 'react-native-elements';

const TextInputForm = ({ data, type,  }) => {


    return (
        <View style={[tw`p-2 pl-5 my-1`, { borderColor:'#00000029', elevation: 8  ,borderWidth: 1, padding: 5, backgroundColor: 'white', borderRadius: 8 }]}>
            <Text style={[tw `text-base`,{ color: '#002443', }]}> {type} </Text>
            <Text style={[tw `text-lg`,{ color: 'black' }]}> {data} </Text>
        </View>

    )
}

export default TextInputForm

const styles = StyleSheet.create({
    //Text input style

});
