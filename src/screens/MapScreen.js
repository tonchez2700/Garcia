import React, { useState, useEffect, useContext } from 'react'
import {
    StyleSheet, View, ScrollView,
    Text, ActivityIndicator, TextInput
} from 'react-native';
import MapView, { PROVIDER_DEFAULT, Marker } from 'react-native-maps';
import * as Location from 'expo-location';


const MapScreen = () => {


    const [location, setLocation] = useState(null);
    const [currentCoords, setCurrentCoords] = useState(null);

    const markers = [
        {
            id: 0,
            amount: 99,
            coordinate: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
            },
        },
        {
            id: 1,
            amount: 199,
            coordinate: {
                latitude: LATITUDE + 0.004,
                longitude: LONGITUDE - 0.004,
            },
        },
        {
            id: 2,
            amount: 285,
            coordinate: {
                latitude: LATITUDE - 0.004,
                longitude: LONGITUDE - 0.004,
            },
        },
    ];
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

    const handleMapPress = (e) => {
        setCurrentCoords(e.nativeEvent.coordinate);
    };
    return (
        <View style={styles.container}>
            {location && (
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    onPress={handleMapPress}
                >
                    {currentCoords && (
                        <Marker coordinate={currentCoords}>
                            <View style={styles.marker}>
                                <Text style={styles.markerText}>
                                    Lat: {currentCoords.latitude.toFixed(6)}
                                </Text>
                                <Text style={styles.markerText}>
                                    Lng: {currentCoords.longitude.toFixed(6)}
                                </Text>
                            </View>
                        </Marker>
                    )}
                </MapView>
            )}
        </View>
    );
}


export default MapScreen
const styles = StyleSheet.create({})
