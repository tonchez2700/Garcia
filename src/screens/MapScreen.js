import React, { useState, useEffect, useContext } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Icon, Button } from 'react-native-elements';
import { Context as RegistrationContext } from '../context/RegistrationContext';
import { Context as AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import ModalList from '../components/Modal/ModalList';
import ModalAddIncident from '../components/Modal/ModalAddIncident';
import ModalAlert from '../components/Modal/ModalAlert';
import CardIncident from '../components/CardIncident';
import * as Location from 'expo-location';
import Images from '@assets/images';

const MapScreen = () => {
    const navigation = useNavigation();
    const {
        state,
        clearStateFrom,
        isVisibleModal,
        getReports,
        getReportList,
        setReportInfo,
        store,
    } = useContext(RegistrationContext);
    const { signout } = useContext(AuthContext);
    const [location, setLocation] = useState('');
    const [markCard, setmarkCard] = useState('');
    const [locationAddress, setLocationAddress] = useState('');

    useEffect(() => {
        const unsubscribe = navigation.addListener('state', () => {
            getLocationAsync();
            // getReports();
            // getReportList();
        });
        return unsubscribe;
    }, [navigation, location]);

    const getRandomColor = () => {
        const colors = ['#FF0000', '#FFFF00', '#00FF00'];
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    }

    const getLocationAsync = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
        }
        const locationData = await Location.getCurrentPositionAsync();
        setLocation(locationData.coords);

        try {
            const address = await Location.reverseGeocodeAsync(locationData.coords);
            if (address.length > 0) {
                const locationAddress = `${address[0].street}, ${address[0].district}, ${address[0].postalCode}, ${address[0].city}`;
                setLocationAddress(locationAddress);
                setReportInfo(locationData.coords, 'coords');
                setReportInfo(locationAddress, 'address');
            }
        } catch (error) {
            console.log('Error fetching address: ', error);
        }

        const locationSubscription = Location.watchPositionAsync(
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
                        setReportInfo(coords, 'coords');
                        setReportInfo(locationAddress, 'adresse');
                    }
                } catch (error) {
                    console.log('Error fetching address: ', error);
                }
            }
        );
        return () => {
            if (locationSubscription) {
                locationSubscription.remove();
            }
        };
    };
    return (
        <View style={styles.container}>
            {location ? (
                <View style={{ flex: 1 }}>
                    <MapView
                        style={styles.map}
                        showsUserLocation={true}
                        showsPointsOfInterest={false}
                        showsIndoors={false}
                        initialRegion={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.005,
                        }}
                    >
                        {state.reportList !== [] &&
                            state.reportList.map((marker) => (

                                <Marker
                                    title={marker.incident.name}
                                    key={marker.id}
                                    pinColor={getRandomColor()}
                                    coordinate={{
                                        latitude: parseFloat(marker.latitude),
                                        longitude: parseFloat(marker.longitude),
                                    }}
                                    onPress={() => setmarkCard(marker)}
                                />
                            ))}
                    </MapView>
                    <View
                        style={{
                            backgroundColor: '#1E0554',
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingTop: 14,
                            paddingBottom: 14,
                        }}
                    >
                        <View style={{ backgroundColor: '#1E0554', flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 14, paddingBottom: 14 }}>
                            <TouchableOpacity style={{ flex: 1, flexDirection: 'column', alignItems: 'center', marginLeft: 2 }}
                                onPress={() => { signout(); }} >
                                <Image source={Images.iconSalida} style={{ width: 39, height: 41 }} />
                                <Text style={{ color: 'white', textAlign: 'center' }}>Salir{'\n'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flex: 1, flexDirection: 'column', alignItems: 'center', marginLeft: 2 }} onPress={() => { isVisibleModal('isVisible') }} >
                                <Image source={Images.iconMisReportes} style={{ width: 39, height: 41 }} />
                                <Text style={{ color: 'white', textAlign: 'center' }}>Mis{'\n'}Reportes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flex: 1, flexDirection: 'column', alignItems: 'center', marginLeft: 2 }} onPress={() => {
                                clearStateFrom();
                                isVisibleModal('isVisibleIncident');
                                getLocationAsync();
                            }}>
                                <Image source={Images.iconAddReportes} style={{ width: 39, height: 41 }} />
                                <Text style={{ color: 'white', textAlign: 'center' }}>Nuevo{'\n'}Reporte</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            ) : (
                <Text style={styles.loadingText}>Cargando mapa...</Text>
            )}
            {
                markCard != ''
                    ?
                    <CardIncident data={markCard} fun={(value) => setmarkCard(value)} />
                    : null
            }
            <View style={{ flex: 0 }}>
                {/* <ModalList />
                <ModalAddIncident fun={(value) => store(value)} />
                <ModalAlert /> */}
            </View>
        </View>
    );
};

export default MapScreen;

const styles = StyleSheet.create({
    container: {
        flex: 2,
        position: 'relative',
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
});
