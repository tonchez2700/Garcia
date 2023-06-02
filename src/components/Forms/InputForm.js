import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Input } from 'react-native-elements'


const InputForm = ({ name, placeholder, ...otherProps }) => {

    return (
        <Input
            color='#133C60'
            labelStyle={{ color: '#133C60' }}
            placeholder={placeholder}
            placeholderTextColor={'#A5A5A5'}
            name={name}
            autoautoCapitalize='characters'
            inputStyle={{ fontSize: 13, lineHeight: 12 }}
            {...otherProps}
        />
    )
}


export default InputForm
