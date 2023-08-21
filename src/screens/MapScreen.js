import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as RegistrationContext } from '../context/RegistrationContext';
import { Context as LocationContext } from '../context/LocationContext';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { MapsStyles } from '../theme/MapsStyles';
import CardAlert from '../components/CardAlert';
import { Icon, Button, Card } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import PermissionWarningDenied from '../components/PermissionWarningDenied';
import ModalList from '../components/Modal/ModalList';
import ModalAddIncident from '../components/Modal/ModalAddIncident';
import ModalAlert from '../components/Modal/ModalAlert';
import CardIncident from '../components/CardIncident';
import * as Location from 'expo-location';
import Images from '@assets/images';r

const MapScreen = () => {
    const navigation = useNavigation();
    const {
        state,
        clearStateFrom,
        isVisibleModal,
        getReports,
        getReportList,
        locationRevers,
        store,
    } = useContext(RegistrationContext);
    const { state: stateLocation, requestForegroundPermissions } = useContext(LocationContext)
    const { signout } = useContext(AuthContext);
    const [markCard, setmarkCard] = useState('');
    const [location, setLocation] = useState(null);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            requestForegroundPermissions()
            getReports();
            getReportList();
        });
        return unsubscribe;
    }, [navigation]);

    const getRandomColor = () => {
        const colors = ['#FF0000', '#FFFF00', '#00FF00'];
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    }


    return (
        <View style={MapsStyles.container}>
            {!stateLocation.hasPermission ?
                <PermissionWarningDenied
                    message={stateLocation.message}
                    requestForegroundPermissions={requestForegroundPermissions} />
                :
                <View style={{ flex: 1 }}>


                    {
                        stateLocation.location != ''
                            ?
                            <MapView
                                style={MapsStyles.Map}
                                provider={PROVIDER_GOOGLE}
                                showsUserLocation={true}
                                showsPointsOfInterest={false}
                                showsIndoors={false}
                                onPress={(e) => { locationRevers(e.nativeEvent.coordinate), setLocation(e.nativeEvent.coordinate) }}
                                initialRegion={{
                                    latitude: stateLocation.location.latitude,
                                    longitude: stateLocation.location.longitude,
                                    latitudeDelta: 0.005,
                                    longitudeDelta: 0.005,
                                }}
                            >
                                {location && (
                                    <Marker
                                        draggable
                                        coordinate={location} >
                                    </Marker>
                                )}

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
                            :
                            null
                    }
                </View>
            }
            <CardAlert />
            {
                markCard != ''
                    ?
                    <CardIncident data={markCard} fun={(value) => setmarkCard(value)} />
                    : null
            }
            <View style={MapsStyles.containerBottonNavBar}>
                <TouchableOpacity style={MapsStyles.buttonNavBar}
                    onPress={() => { signout(); }} >
                    <Image source={Images.iconSalida} style={MapsStyles.imagenNarBar} />
                    <Text style={MapsStyles.textNavBar}>Salir{'\n'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={MapsStyles.buttonNavBar} onPress={() => { isVisibleModal('isVisible') }} >
                    <Image source={Images.iconMisReportes} style={MapsStyles.imagenNarBar} />
                    <Text style={MapsStyles.textNavBar}>Mis{'\n'}Reportes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={MapsStyles.buttonNavBar} onPress={() => {
                    isVisibleModal('isVisibleIncident');
                }}>
                    <Image source={Images.iconAddReportes} style={MapsStyles.imagenNarBar} />
                    <Text style={MapsStyles.textNavBar}>Nuevo{'\n'}Reporte</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 0 }}>
                <ModalList />
                <ModalAddIncident />
                <ModalAlert />
            </View>
        </View >
    );
};

export default MapScreen;