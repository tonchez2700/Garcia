import React, { useState, useEffect, useContext } from 'react'
import {
    StyleSheet, View, ActivityIndicator,
    Text, TouchableOpacity, KeyboardAvoidingView
} from 'react-native';
import MapView, { Marker, } from 'react-native-maps';
import { Icon, Button } from 'react-native-elements';
import { Context as RegistrationContext } from '../context/RegistrationContext';
import { useNavigation } from '@react-navigation/native';
import ModalList from '../components/Modal/ModalList';
import ModalAddIncident from '../components/Modal/ModalAddIncident';
import ModalAlert from '../components/Modal/ModalAlert';
import * as Location from 'expo-location';
import Images from "@assets/images";



const MapScreen = () => {

    const navigation = useNavigation();
    const {
        state,
        clearStateFrom,
        isVisibleModal,
        getReports,
        getReportList,
        setReportInfo,
        store } = useContext(RegistrationContext);
    const [location, setLocation] = useState(null);
    const [locationAddress, setLocationAddress] = useState('');

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getLocationAsync();
            getReports()
            getReportList()
        });
        return unsubscribe
    }, [navigation, location]);

    const getLocationAsync = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
        }
        Location.watchPositionAsync(
            {
                accuracy: Location.Accuracy.High,
                distanceInterval: 10,
            },
            async ({ coords }) => {
                setLocation(coords);
                try {
                    const address = await Location.reverseGeocodeAsync(coords);
                    if (address.length > 0) {
                        const locationAddress = `${address[0].street}, ${address[0].district}, ${address[0].postalCode}, ${address[0].city}`;
                        setLocationAddress(locationAddress);
                        setReportInfo(coords, 'coords')
                        setReportInfo(locationAddress, 'adresse')
                    }
                } catch (error) {
                    console.log('Error fetching address: ', error);
                }
            }
        );
    };

    const renderContent = () => {
        return (
            <View style={styles.container}>
                {location ? (
                    <View style={{ flex: 1 }}>
                        <MapView
                            style={styles.map}
                            showsUserLocation={true}
                            initialRegion={{
                                latitude: location.latitude,
                                longitude: location.longitude,
                                latitudeDelta: 0.005,
                                longitudeDelta: 0.005,
                            }}>
                            {
                                state.reportList != []
                                    ?
                                    state.reportList.map((marker) =>
                                    (
                                        <Marker
                                            title={marker.incident.name}
                                            key={marker.key}
                                            coordinate={{
                                                latitude: parseFloat(marker.latitudmarker),
                                                longitude: parseFloat(marker.longitude),
                                            }}
                                        />
                                    ))
                                    : null
                            }
                        </MapView>
                        <View style={{ backgroundColor: '#1E0554', flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 14, paddingBottom: 14, }}>
                            <TouchableOpacity style={{ flex: 1, flexDirection: 'column', alignItems: 'center', marginLeft: 2 }}
                                onPress={() => { console.log('peluche'); }} >
                                <Icon type='simple-line-icon' name='action-undo' color={'white'} size={35} />
                                <Text style={{ color: 'white', textAlign: 'center', marginTop: 8 }}>Salir{'\n'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flex: 1, flexDirection: 'column', alignItems: 'center', marginLeft: 2 }} onPress={() => { isVisibleModal('isVisible') }} >
                                <Icon type='simple-line-icon' name='docs' color={'white'} size={35} solid={false} />
                                <Text style={{ color: 'white', textAlign: 'center', marginTop: 8 }}>Mis{'\n'}Reportes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flex: 1, flexDirection: 'column', alignItems: 'center', marginLeft: 2 }} onPress={() => { clearStateFrom(), isVisibleModal('isVisibleIncident'), getLocationAsync() }} >
                                <Icon type='simple-line-icon' name='note' color={'white'} size={35} solid={false} />
                                <Text style={{ color: 'white', textAlign: 'center', marginTop: 8 }}>Nuevo{'\n'}Reporte</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <Text style={styles.loadingText}>Cargando mapa...</Text>
                )}
                <View style={{ flex: 0 }}>
                    <ModalList />
                    <ModalAddIncident fun={(value) => store(value)} />
                    <ModalAlert />
                </View>
            </View >
        );
    }
    return (
        !state.fetchingData
            ?
            !state.error
                ?
                renderContent()
                :
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ textAlign: 'center' }}>
                        {state.message}
                    </Text>
                    <Button
                        containerStyle={{ width: 120 }}
                        buttonStyle={[{ backgroundColor: '#1E0554' }]}
                        title="Actualizar"
                        onPress={() => navigation.navigate("AuthScreen")}
                    />
                </View>
            :
            <ActivityIndicator size="large" color="#118EA6" style={{ marginTop: 5 }} />
    )
}

export default MapScreen
const styles = StyleSheet.create({

    container: {
        flex: 2,
        position: 'relative'
    },
    map: {
        flex: 9,
    },
    marker: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
    },
    markerText: {
        fontWeight: 'bold',
    },
})
