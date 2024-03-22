import React, { useState, useEffect, useContext, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, Image ,Platform} from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as RegistrationContext } from '../context/RegistrationContext';
import { Context as LocationContext } from '../context/LocationContext';
import MapView, { Marker, PROVIDER_GOOGLE, enableLatestRenderer } from 'react-native-maps';
import { MapsStyles } from '../theme/MapsStyles';
import CardAlert from '../components/CardAlert';
import { Icon, Button, Card } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import PermissionWarningDenied from '../components/PermissionWarningDenied';
import ModalList from '../components/Modal/ModalList';
import ModalAddIncident from '../components/Modal/ModalAddIncident';
import ModalAlert from '../components/Modal/ModalAlert';
import CardIncident from '../components/CardIncident';
import Images from '../components/assets/images';


const MapScreen = () => {
    const navigation = useNavigation();
    const {
        state,
        clearStateFrom,
        isVisibleModal,
        getReports,
        getReportList,
        locationRevers,
    } = useContext(RegistrationContext);
    const { state: stateLocation, requestForegroundPermissions } = useContext(LocationContext)
    const { state: stateAuth, signout } = useContext(AuthContext);
    const [markCard, setmarkCard] = useState('');
    const [location, setLocation] = useState(null);
    enableLatestRenderer();
    useEffect(() => {
        requestForegroundPermissions()
        clearStateFrom();
        getReports();
        getReportList();
    }, [navigation]);

    const getRandomColor = () => {
        const colors = ['#FF0000', '#FFFF00', '#00FF00'];
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    }
    const ValueLocation = Platform.OS === 'android' ? false : true;
    
    return (
        <View style={MapsStyles.container}>
            {!stateLocation.hasPermission ?
                <PermissionWarningDenied
                    message={stateLocation.message}
                    requestForegroundPermissions={requestForegroundPermissions} />
                :
                <View style={{ flex: 1 }}>
                    <MapView
                        showsUserLocation={true}  // here is what I thought should show it
                        followsUserLocation={true}
                        showsMyLocationButton={true}
                        zoomControlEnabled={true}
                        style={MapsStyles.Map}
                        provider={PROVIDER_GOOGLE}
                        showsPointsOfInterest={false}
                        showsIndoors={false}
                        showsCompass={true}
                        scrollEnabled={true}
                        zoomEnabled={true}
                        pitchEnabled={true}
                        onPress={(e) => { locationRevers(e.nativeEvent.coordinate), setLocation(e.nativeEvent.coordinate) }}
                        initialRegion={{
                            latitude: 25.67507,
                            longitude: -100.31847,
                            latitudeDelta: 0.05,
                            longitudeDelta: 0.05,
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