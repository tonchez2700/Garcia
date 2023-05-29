import React from 'react'
import { StyleSheet,View } from 'react-native'
import { Input } from 'react-native-elements'


const InputProfile = ({ name, placeholder, ...otherProps }) => {

    return (    
        <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
                <Input
                    color='#133C60'
                    labelStyle={{ color: '#133C60' }}
                    placeholder={placeholder}
                    name={name}
                    autoautoCapitalize='characters'
                    inputStyle={{fontSize: 14}}
                    {...otherProps}
                />

            </View>
        </View>
    )
}       


export default InputProfile
