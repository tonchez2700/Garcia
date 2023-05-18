import React, { useState, useEffect, useContext } from 'react'
import {
    StyleSheet, View, ScrollView, TouchableOpacity,
    Text, ActivityIndicator, TextInput
} from 'react-native';
import { Context as RegistrationContext } from '../../context/RegistrationContext';
import { SurgeryStyle } from '../../theme/customTheme';
import { Icon, Button, Slider } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import MaskInput, { Masks, createNumberMask } from 'react-native-mask-input';
import AnimetedText from '../../components/AnimetedText';
import tw from 'tailwind-react-native-classnames'
import MenuItem from '../../components/MenuItem';
import moment from 'moment';

const SurgeryScreen = () => {


    const navigation = useNavigation();
    const { state, } = useContext(RegistrationContext);
    const [text, setText] = useState('');
    const [height, setHeight] = useState(35);
    const [birthdateMask, setbirthdate] = useState('');
    const date = new Date()
    const initial_date = moment(date).format('DD-MM-YYYY')
    const initial_hours = moment(date).format('hh:mm')


    const renderContent = () => {

        return (
            <ScrollView style={SurgeryStyle.container}>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', }}>
                    <View style={[SurgeryStyle.ViewBoder, { flex: 1 }]}>
                        <Text style={SurgeryStyle.TextBoder}>Expediente / Nombre / Apellidos</Text>
                        <TextInput
                            style={SurgeryStyle.Input}
                            value={text}
                            onChangeText={setText}
                        />
                    </View>
                </View>
                <AnimetedText title="PACIENTE" content={
                    <View style={{ flex: 1, padding: 10, }}>
                        <View style={{ flex: 1, marginTop: 20 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={[SurgeryStyle.ViewBoder, { flex: 1, marginRight: 20, backgroundColor: '#f2f2f2' }]}>
                                    <Text style={SurgeryStyle.TextBoder}>Nombre<Text style={{ color: 'red' }}> * </Text></Text>
                                    <TextInput
                                        fontSize={24}
                                        editable={false}
                                        placeholder="Fecha de admisión"
                                        style={SurgeryStyle.Input}
                                    // value={initial_date}
                                    />
                                </View>
                                <View style={[SurgeryStyle.ViewBoder, { flex: 1, backgroundColor: '#f2f2f2' }]}>
                                    <Text style={SurgeryStyle.TextBoder}>Número de expediente</Text>
                                    <TextInput
                                        fontSize={24}
                                        editable={false}
                                        placeholder="Hora"
                                        style={SurgeryStyle.Input}
                                    // value={initial_hours}
                                    />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={[SurgeryStyle.ViewBoder, { flex: 1, marginRight: 20, backgroundColor: '#f2f2f2' }]}>
                                    <Text style={SurgeryStyle.TextBoder}>Edad</Text>
                                    <TextInput
                                        fontSize={24}
                                        editable={false}
                                        placeholder="53 Años"
                                        style={SurgeryStyle.Input}
                                    // value={initial_date}
                                    />
                                </View>
                                <View style={[SurgeryStyle.ViewBoder, { flex: 1, backgroundColor: '#f2f2f2' }]}>
                                    <Text style={SurgeryStyle.TextBoder}>Fecha de nacimiento</Text>
                                    <TextInput
                                        fontSize={24}
                                        editable={false}
                                        placeholder="13/Abril/2023"
                                        style={SurgeryStyle.Input}
                                    // value={initial_hours}
                                    />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={[SurgeryStyle.ViewBoder, { flex: 1, backgroundColor: '#f2f2f2' }]}>
                                    <Text style={SurgeryStyle.TextBoder}>Genero</Text>
                                    <TextInput
                                        fontSize={24}
                                        placeholder="Genero"
                                        maxLength={3}
                                        keyboardType="number-pad"
                                        style={SurgeryStyle.Input}
                                    // value={data?.patient?.age}
                                    // onChangeText={(value) => onChangeText(value, 'age', 'patient')}
                                    />
                                </View>
                                <View style={[SurgeryStyle.ViewBoder, { flex: 1, marginRight: 20 }]}>
                                    <Text style={SurgeryStyle.TextBoder}>Fecha de nacimiento<Text style={{ color: 'red' }}> * </Text></Text>
                                    <MaskInput
                                        fontSize={24}
                                        maxLength={10}
                                        placeholder="Fecha de nacimiento"
                                        style={SurgeryStyle.Input}
                                        mask={[/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                        keyboardType="numeric"
                                        value={birthdateMask}
                                        onChangeText={(masked, unmasked) => {
                                            if (masked.length == 10) {
                                                const [dia, mes, anio] = masked.split("-");
                                                const fecha = new Date(anio, mes - 1, dia);
                                                // onChangeText(moment(fecha).format('YYYY-MM-DD'), 'birthdate', 'patient')
                                            } else {
                                                null
                                            }
                                            setbirthdate(masked)
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                } />
                <AnimetedText title="PACIENTE" content={
                    <View style={{ flex: 1, padding: 10, }}>
                        <View style={{ flex: 1, marginTop: 20 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={[SurgeryStyle.ViewBoder, { flex: 1, marginRight: 20 }]}>
                                    <Text style={SurgeryStyle.TextBoder}>Buscar</Text>
                                    <TextInput
                                        fontSize={24}
                                        editable={false}
                                        placeholder="Fecha de admisión"
                                        style={SurgeryStyle.Input}
                                    // value={initial_date}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                } />
            </ScrollView >

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
export default SurgeryScreen

const styles = StyleSheet.create({})

