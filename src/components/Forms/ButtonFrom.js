import React from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-elements'

const ButtonFrom = ({ title, color, handleSubmit, ...otherProps }) => {
    return (
        <View style={{ marginBottom: 15, padding: 10 }}>
            <Button
                buttonStyle={{ backgroundColor: color, borderRadius: 23 }}
                onPress={handleSubmit}
                title={title}
                {...otherProps} />
        </View>
    )
}

export default ButtonFrom
