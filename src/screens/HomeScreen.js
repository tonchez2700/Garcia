import React, { useState, useEffect, useContext } from 'react'
import {
    StyleSheet, View, ScrollView,
    Text, ActivityIndicator, TextInput
} from 'react-native';
import { Context as RegistrationContext } from '../context/RegistrationContext';
import { general } from '../theme/customTheme';
import { Icon, Button, Slider } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames'
import MenuItem from '../components/MenuItem';
import moment from 'moment';

const HomeScreen = () => {
   
    const navigation = useNavigation();
    const { state, handleInputChange } = useContext(RegistrationContext);

    // useEffect(() => {
    //     const unsubscribe = navigation.addListener('blur', () => {
    //   
    //     });
    //     return unsubscribe;
    // }, [navigation]);

    const renderContent = () => {

        return (
            <View style={{ flex: 1, backgroundColor: '#F7F8FAF', padding: 20, }}>
                <View style={{ flex: 1, backgroundColor: '#FFFFFF', padding: 20, borderWidth: 1, borderColor: '#7F7F7F', borderRadius: 10, alignItems: 'center' }}>
                    <View style={{ flex: 1, flexDirection: 'column', width: '100%' }}>
                        <MenuItem
                            title='MAPA'
                            icon='map'
                            color='#24104F'
                            fontFamily='font-awesome-5'
                            navigateScreen='MapsSCreen' />
                        <MenuItem
                            title='MIS CONTRIBUCIONES'
                            icon='list'
                            color='#24104F'
                            fontFamily='font-awesome-5'
                            navigateScreen='RegisterHomeScreen' />
                        <MenuItem
                            title='NUEVA CONTRIBUCION'
                            icon='plus'
                            color='#24104F'
                            fontFamily='font-awesome-5'
                            navigateScreen='ExpedienteRegistrationScreen' />
                    </View>
                </View >
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
                <View style={tw`flex-1 p-5 justify-center items-center`}>
                    <Text style={tw`text-center text-lg mb-3`}>
                        {state.message}
                    </Text>
                    <Button
                        containerStyle={{ width: 120 }}
                        buttonStyle={[{ backgroundColor: '#118ea6' }]}
                        title="Actualizar"
                        onPress={() => navigation.navigate("HomeScreen")}
                    />
                </View>
            :
            <ActivityIndicator size="large" color="#118EA6" style={tw`mt-5`} />
    )
}
export default HomeScreen

const styles = StyleSheet.create({})
