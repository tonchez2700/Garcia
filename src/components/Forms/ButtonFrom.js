import React from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-elements'

const ButtonFrom = ({ handleSubmit, ...otherProps }) => {
    return (
        <View style={{ flexDirection: 'row', zIndex: -1, elevation: -1 }}>
            <View style={{ flex: 1, marginBottom: 15 }}>
                <Button buttonStyle={{ backgroundColor: '#2D5DA0', borderRadius: 23 }} onPress={handleSubmit} title="Iniciar Sesión" {...otherProps} />
            </View>
        </View>
    )
}

export default ButtonFrom
