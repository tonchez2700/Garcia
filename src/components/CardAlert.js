import React, { useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, TextInput, Platform} from 'react-native'
import { Input, Icon } from 'react-native-elements'

const CardAlert = () => {
    const leftValue = Platform.OS === 'android' ? '5%' : '10%';

    return (
        <View style={[styles.container, { left: leftValue }]}>
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
        width: '80%',
        top: "2%",
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        paddingHorizontal: 8,
        elevation: 8,
    },

    text: {
        color: '#424242',
        textAlign: 'center',
        lineHeight: 15,
        fontSize: 14,
        fontWeight: '500',
    }
})
