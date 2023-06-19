import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, TextInput, View, Modal, ScrollView, Dimensions, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Context as RegistrationContext } from '../../context/RegistrationContext';
import Images from "@assets/images";
import { Icon, Button } from 'react-native-elements'
import { insert } from 'formik';


const { width } = Dimensions.get("window");
const ModalAddIncident = () => {

    const navigation = useNavigation();
    const { state, clearState, isVisibleModal, } = useContext(RegistrationContext);


    let points = [
        { type: 'Semáforo roto', direccion: 'Heberto Castillo Martínez 571, Sin Nombre de Col 1, 66004 García, N.L.', estado: 1 },
        { type: 'Accidente Automovilístico', direccion: 'Heberto Castillo Martínez 571, Sin Nombre de Col 1, 66004 García, N.L.', estado: 2 },
        { type: 'Bache', direccion: 'Heberto Castillo Martínez 571, Sin Nombre de Col 1, 66004 García, N.L.', estado: 2 },
        { type: 'Asalto', direccion: 'Heberto Castillo Martínez 571, Sin Nombre de Col 1, 66004 García, N.L.', estado: 3 },
    ]

    return (
        <View style={styles.body}>
            <Modal
                visible={state.isVisibleIncident}
                hardwareAccelerated
                animationType="slide"
                transparent
                presentationStyle="overFullScreen"
                onRequestClose={() =>
                    isVisibleModal('isVisibleIncident')
                }>
                <View style={styles.viewWrapper}>
                    <View style={styles.modalView}>
                        <View style={{ alignSelf: 'flex-end' }}>
                            <Icon
                                size={25}
                                name={'remove'}
                                onPress={() => isVisibleModal('isVisibleIncident')}
                                type='font-awesome'
                                color={'#4267B2'} />
                        </View>
                        <Text style={styles.text}>Nuevo reporte</Text>
                        <ScrollView style={{ flex: 1, marginBottom: 10, width: '100%' }}>
                            <View style={{ flex: 1, flexDirection: 'column' }}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Ubicación"
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Incidente"
                                />
                                <View style={{ alignItems: 'center', marginBottom: 10 }}>
                                    <Button
                                        buttonStyle={{ borderRadius: 100, width: 50, height: 50, backgroundColor: '#1E0554' }}
                                        loadingProps={{ color: '#000000' }}
                                        onPress={() => { navigation.navigate('PhotoScreen'), isVisibleModal('isVisibleIncident') }}
                                        icon={<Icon size={25} name={'camera'} type='font-awesome' color={'white'} />}
                                        disabled={false}
                                    />
                                </View>
                            </View>
                            <View style={styles.imageContainer}>
                                <Image
                                    style={styles.image}
                                    source={Images.accidente1}
                                />
                                <Image
                                    style={styles.image}
                                    source={Images.accidente2}
                                />
                                <Image
                                    style={styles.image}
                                    source={Images.accidente3}
                                />
                                <Image
                                    style={styles.image}
                                    source={Images.accidente4}
                                />
                            </View>
                            <Button
                                containerStyle={styles.buttonContainer}
                                loadingProps={{ color: '#000000' }}
                                onPress={() => console.log('oato')}
                                title="Enviar"
                                disabled={false} // Agrega la propiedad disabled si deseas deshabilitar el botón
                            />
                        </ScrollView>
                    </View>
                </View>
            </Modal >
        </View >
    )
}

export default ModalAddIncident

const styles = StyleSheet.create({

    text: {
        color: '#393939',
        fontWeight: 'bold',
        fontSize: 17,
        marginBottom: 10,
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
        backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
    modalView: {
        padding: 10,
        alignItems: "center",
        justifyContent: "space-between",
        position: "absolute",
        top: "20%",
        left: "50%",
        elevation: 5,
        transform: [{ translateX: -(width * 0.4) },
        { translateY: -90 }],
        height: '70%',
        width: width * 0.8,
        backgroundColor: "rgba(255, 255, 255, .9)",
        borderRadius: 7,
    },
    input: {
        backgroundColor: "#FFFFFF",
        borderWidth: 0.2,
        borderColor: "#707070B3",
        borderBottomWidth: 0,
        paddingLeft: 15,
        paddingVertical: 8,
        borderRadius: 40,
        marginBottom: 22,

    },
    imageContainer: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20
    },
    image: {
        width: 65,
        height: 65,
        marginLeft: 5,
        resizeMode: 'stretch',
        marginBottom: 8,

    },
    buttonContainer: {
        borderRadius: 20,
    },
})
