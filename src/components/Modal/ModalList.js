import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View, Modal, ScrollView, Dimensions, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Context as RegistrationContext } from '../../context/RegistrationContext';
import * as Location from 'expo-location';
import { Icon, Button, Input } from 'react-native-elements'
import Images from "@assets/images";


const { width } = Dimensions.get("window");
const ModalList = () => {

    const navigation = useNavigation();
    const { state, isVisibleModal, getReports } = useContext(RegistrationContext);
    const [street, setStreet] = useState('');


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getReports()
        });
        return unsubscribe;
    }, [navigation]);

    const getColorState = (estado) => {
        let textColor;
        let numeroTexto;
        let icon;
        switch (estado) {
            case 1:
                textColor = '#008E00';
                numeroTexto = 'Completado';
                icon = 'check-circle';
                break;
            case 2:
                textColor = '#FFC700';
                numeroTexto = 'En proceso';
                icon = 'cog';
                break;
            case 3:
                textColor = '#8E0000';
                numeroTexto = 'Con retraso';
                icon = 'warning';
                break;
            default:
                textColor = 'black';
                numeroTexto = 'En proceso';
                icon = 'warning';
        }
        return { color: textColor, numeroTexto, icon };

    };

    return (
        <View style={styles.body}>
            <Modal
                visible={state.isVisible}
                hardwareAccelerated
                animationType="slide"
                transparent
                presentationStyle="overFullScreen"
                onRequestClose={() =>
                    isVisibleModal('isVisible')
                }>
                <View style={styles.viewWrapper}>
                    <View style={styles.modalView}>
                        <View style={{ alignSelf: 'flex-end' }}>
                            <Icon
                                size={25}
                                name={'remove'}
                                onPress={() => isVisibleModal('isVisible')}
                                type='font-awesome'
                                color={'#4267B2'} />
                        </View>
                        <Text style={styles.text}>Mis Reportes</Text>
                        <ScrollView style={{ flex: 1, width: '100%', marginBottom: 10 }}>
                            {
                                state.reportList.map((e) => (
                                    <View key={e.id} style={{
                                        flex: 1, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', borderWidth: .3,
                                        borderColor: 'gray', marginBottom: 20, borderRadius: 5, elevation: 5
                                    }}>
                                        <View style={{ flexDirection: 'column', alignItems: 'flex-start', width: '60%', padding: 10 }}>
                                            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{e?.report?.incident.name}</Text>
                                            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>32423423</Text>
                                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                                <Icon
                                                    size={25}
                                                    name={getColorState(e?.report_status.id).icon}
                                                    type='font-awesome'
                                                    color={getColorState(e.report_status.id).color} />
                                                <Text style={[{ color: getColorState(e.report_status.id).color, fontWeight: 'bold', marginLeft: 5 }]}>{getColorState(e.report_status.id).numeroTexto}</Text>
                                            </View>

                                        </View>
                                        <Image
                                            style={{
                                                flex: 1,
                                                width: '20%',
                                                height: '100%',
                                                borderTopRightRadius: 5,
                                                borderBottomRightRadius: 5,
                                                resizeMode: 'stretch',
                                            }}
                                            source={{
                                                uri: `https://cpxproject.com/garcia/${e?.resources[0].url}`,
                                            }}
                                        />
                                    </View>
                                ))
                            }
                        </ScrollView>
                    </View>
                </View>
            </Modal >
        </View >
    )
}

export default ModalList

const styles = StyleSheet.create({

    text: {
        color: '#393939',
        fontWeight: 'bold',
        fontSize: 17,
        marginBottom: 10,
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
})
