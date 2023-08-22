import React, { useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, TextInput } from 'react-native'
import { Input, Icon } from 'react-native-elements'

const CardAlert = () => {


    return (
        <View style={styles.container}>
            <Text style={styles.text}>Haz clic sobre el área que deseas reportar</Text>
        </View >
    )
}

export default CardAlert

const styles = StyleSheet.create({

    container: {
        flex: 1,
        position: 'absolute',
        borderRadius: 3,
        backgroundColor: '#FFF',
        height: '5.3%',
        width: '80%',
        left: "5%",
        top: "2%",
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
    },

    text: {
        color: '#424242',
        lineHeight: 15,
        fontSize: 15,
        fontWeight: '500',
    }
})
