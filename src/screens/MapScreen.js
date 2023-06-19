import React, { useState, useEffect, useContext } from 'react'
import {
    StyleSheet, View, Image,
    Text, TouchableOpacity,
} from 'react-native';
import MapView, { PROVIDER_DEFAULT, Marker, } from 'react-native-maps';
import { Icon } from 'react-native-elements';
import { Context as RegistrationContext } from '../context/RegistrationContext';
import ModalList from '../components/Modal/ModalList';
import ModalAddIncident from '../components/Modal/ModalAddIncident';
import * as Location from 'expo-location';
import Images from "@assets/images";



const MapScreen = () => {

    const { state, isVisibleModal } = useContext(RegistrationContext);
    const [location, setLocation] = useState(null);
    const [currentCoords, setCurrentCoords] = useState(null);
    const [currentAddress, setCurrentAddress] = useState(null);
    let initial = {
        latitude: 25.659832,
        longitude: -100.250516,
        latitudeDelta: 0.09,
        longitudeDelta: 0.035
    }
    // 25.660026, -100.248864
    // 25.662250, -100.250495
    // 25.660161, -100.252705
    // 25.664822, -100.251503





    let points = [
        { latitude: 25.660026, longitude: -100.248864, weight: 1 },
        { latitude: 25.662250, longitude: -100.250495, weight: 1 },
        { latitude: 25.660161, longitude: -100.252705, weight: 1 },
        { latitude: 25.664822, longitude: -100.251503, weight: 1 },
    ]

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            setCurrentCoords(location.coords);
        })();
    }, []);

    const handleMapPress = async (e) => {
        setCurrentCoords(e.nativeEvent.coordinate);
        const reverseGeocode = await Location.reverseGeocodeAsync({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude
        });

        if (reverseGeocode && reverseGeocode.length > 0) {
            const address = reverseGeocode[0].street;
            console.log(JSON.stringify(reverseGeocode, null, 2));
            setCurrentAddress(address);
        } else {
            setCurrentAddress(null);
        }

    };

    return (
        <View style={styles.container}>
            {location && (
                <View style={{ flex: 1 }}>
                    <MapView
                        style={styles.map}
                        initialRegion={initial}
                        onPress={(e) => handleMapPress(e)} >
                        {
                            currentCoords && (
                                points.map((e) => (
                                    <Marker
                                        key={e.latitude}
                                        draggable
                                        coordinate={{ latitude: e.latitude, longitude: e.longitude }}>
                                    </Marker>
                                ))
                            )
                        }
                    </MapView>
                    <View style={{ backgroundColor: '#1E0554', flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 14, paddingBottom: 14 }}>
                        <TouchableOpacity style={{ flex: 1, flexDirection: 'column', alignItems: 'center', marginLeft: 2 }}
                            onPress={() => { console.log('peluche'); }} >
                            <Image source={Images.iconSalida} style={{ width: 39, height: 41 }} />
                            <Text style={{ color: 'white', textAlign: 'center' }}>Salir{'\n'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flex: 1, flexDirection: 'column', alignItems: 'center', marginLeft: 2 }} onPress={() => { isVisibleModal('isVisible') }} >
                            <Image source={Images.iconMisReportes} style={{ width: 39, height: 41 }} />
                            <Text style={{ color: 'white', textAlign: 'center' }}>Mis{'\n'}Reportes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flex: 1, flexDirection: 'column', alignItems: 'center', marginLeft: 2 }} onPress={() => { isVisibleModal('isVisibleIncident') }} >
                            <Image source={Images.iconAddReportes} style={{ width: 39, height: 41 }} />
                            <Text style={{ color: 'white', textAlign: 'center' }}>Nuevo{'\n'}Reporte</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
            }
            <View style={{ flex: 0 }}>
                <ModalList />
                <ModalAddIncident />
            </View>
        </View >
    );
}


export default MapScreen
const styles = StyleSheet.create({

    container: {
        flex: 2,
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
