import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View, Modal, Pressable, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Context as RegistrationContext } from '../../context/RegistrationContext';
import { Icon, Button } from 'react-native-elements'


const { width } = Dimensions.get("window");
const ModalAlert = ({ message }) => {

    const navigation = useNavigation();

    const { state,
        clearState,
        isVisibleModal,
    } = useContext(RegistrationContext);


    return (
        <View style={styles.body}>
            <Modal
                visible={state.isVisibleAlert}
                hardwareAccelerated
                animationType="fade"
                transparent
                presentationStyle="overFullScreen"
                onRequestClose={() =>
                    isVisibleModal('isVisibleAlert')
                }>
                <View style={styles.viewWrapper}>
                    <View style={styles.modalView}>
                        <View style={{ alignSelf: 'flex-end' }}>
                            <Icon
                                size={25}
                                name={'remove'}
                                onPress={() => isVisibleModal('isVisibleAlert')}
                                type='font-awesome'
                                color={'#4267B2'} />
                        </View>
                        <Text style={styles.text}>Error</Text>
                        <Text style={styles.textbody}>{state.message}</Text>
                        <View style={{ alignItems: 'center', }}>
                            <Button
                                onPress={() => {
                                    isVisibleModal('isVisibleAlert')
                                }}
                                titleStyle={{ fontSize: 17 }}
                                title={'Aceptar'}
                                buttonStyle={{ backgroundColor: '#1E0554', borderRadius: 30, paddingHorizontal: 32, paddingVertical: 10 }}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default ModalAlert

const styles = StyleSheet.create({

    text: {
        color: '#393939',
        fontWeight: 'bold',
        fontWeight: '700',
        textAlign: 'center',
        fontSize: 19.36,
    },
    textbody: {
        color: '#1E0554',
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 16.52,
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
        borderRadius: 26,
    },
})
