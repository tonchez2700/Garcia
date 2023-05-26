import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, TextInput, View, Modal, ScrollView, Dimensions, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Context as RegistrationContext } from '../../context/RegistrationContext';
import tw from 'tailwind-react-native-classnames'
import { Icon, Button, Input } from 'react-native-elements'
import { color, log } from 'react-native-reanimated';


const { width } = Dimensions.get("window");
const ModalAddIncident = () => {

    const navigation = useNavigation();
    const { state, clearState, isVisibleModal } = useContext(RegistrationContext);


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            clearState()
        });
        return unsubscribe;
    }, [navigation]);
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
                                color={'red'} />
                        </View>
                        <Text style={styles.text}>Mis Reportes</Text>
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
                                <TextInput
                                    style={styles.input}
                                    placeholder="Fotos/video"
                                />
                            </View>
                            <View style={styles.imageContainer}>
                                <Image
                                    style={styles.image}
                                    source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
                                />
                                <Image
                                    style={styles.image}
                                    source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
                                />
                                <Image
                                    style={styles.image}
                                    source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
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
        backgroundColor: "rgba(0, 0, 0, 0.2)",
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
        backgroundColor: "#fff",
        borderRadius: 7,
    },
    input: {
        backgroundColor: '#fff',
        flex: 1,
        borderWidth: 1,
        borderColor: '#A5A5A5',
        borderRadius: 20,
        padding: 9,
        elevation: 2,
        marginBottom: 30,
    },
    imageContainer: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        marginBottom: 20
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    buttonContainer: {
        borderRadius: 20,
    },
})
