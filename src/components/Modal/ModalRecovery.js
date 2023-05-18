import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View, Modal, Pressable, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Context as AuthContext } from '../../context/AuthContext';
import tw from 'tailwind-react-native-classnames'
import { Icon, Button, Input } from 'react-native-elements'


const { width } = Dimensions.get("window");
const ModalRecovery = () => {

    const navigation = useNavigation();
    const { state, clearState, isVisibleModal, recoveryUser, handleInputChange } = useContext(AuthContext);


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            clearState()
        });
        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.body}>
            <Modal
                visible={state.isVisible}
                hardwareAccelerated
                animationType="slide"
                transparent
                presentationStyle="overFullScreen"
                onRequestClose={() =>
                    isVisibleModal()
                }>
                <View style={styles.viewWrapper}>
                    <View style={styles.modalView}>
                        <Text style={styles.text}>Necesitamos verificar su identidad</Text>
                        <Input
                            value=''
                            inputContainerStyle={styles.input}
                            placeholder={'USUARIO'}
                            onChangeText={(value) => handleInputChange(value, 'email')}
                        />
                        <View style={[tw`flex-row`, { justifyContent: 'space-between', width: '100%' }]}>
                            <Button
                                title="Cancelar"
                                buttonStyle={{ marginLeft: 5, width: '80%', backgroundColor: '#848484' }}
                                onPress={() => { recoveryUser(state.email), isVisibleModal() }} />

                            <Button
                                title="Enviar"
                                buttonStyle={{ width: '80%', backgroundColor: '#004480' }}
                                onPress={() => { isVisibleModal() }} />
                        </View>
                    </View>
                </View>
            </Modal >
        </View >
    )
}

export default ModalRecovery

const styles = StyleSheet.create({

    text: {
        color: '#004480',
        fontWeight: 'bold',
        fontSize: 17,
    },
    input: {
        backgroundColor: 'white',
        padding: 9,
        borderBottomColor: 'gray',
        paddingLeft: 20,
        borderRadius: 5,
        elevation: 5,
        backgroundColor: 'white',
        borderBottomColor: 'white'
    },
    textbody: {
        color: 'black',
        textAlign: 'center',
        fontWeight: '400',
        fontSize: 17,
    },
    body: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
    },

    screen: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    viewWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
    modalView: {
        padding: 10,
        alignItems: "center",
        justifyContent: "space-between",
        position: "absolute",
        top: "40%",
        left: "50%",
        elevation: 5,
        transform: [{ translateX: -(width * 0.4) },
        { translateY: -90 }],
        height: 200,
        width: width * 0.8,
        backgroundColor: "#fff",
        borderRadius: 7,
    },
})
