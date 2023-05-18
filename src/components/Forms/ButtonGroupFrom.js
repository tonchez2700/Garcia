import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import { Icon } from 'react-native-elements'
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';


const ButtonGroupFrom = ({ data }) => {
    const [selectedButton, setSelectedButton] = useState(null);
    return (
        <View style={{ marginVertical: 35 }}>
            {
                data.map((e) => (
                    <TouchableOpacity
                        key={e.id}
                        style={[styles.button, selectedButton === e.id && styles.selectedButton]}
                        onPress={() => { setSelectedButton(e.id) }}
                    >
                        <Text style={[styles.buttonText, selectedButton === e.id && styles.selectedText]}>{e.description}</Text>
                    </TouchableOpacity>
                ))}
        </View>
    )
}

export default ButtonGroupFrom


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    button: {
        width: '100%',
        alignItems: 'center',
        padding: 20,
        marginBottom: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#B7B7B7',
        backgroundColor: 'white',
    },
    selectedButton: {
        backgroundColor: '#012B54',
    },
    selectedText: {
        color: 'white',
    },
    buttonText: {
        fontSize: 20,
        fontWeight: '400'
    },
});