import React, { useContext } from 'react'
import { StyleSheet, Text, View, Alert, ScrollView, Image } from 'react-native'
import tw from 'tailwind-react-native-classnames';
import { Icon, Input } from 'react-native-elements'
import InputForm from '../components/Forms/InputForm';
import ButtonFrom from '../components/Forms/ButtonFrom';
import { Context as AuthContext } from '../context/AuthContext';
import { AuthSchema } from './../config/schemas';
import useHandleOnChangeTextInput from './../hooks/useHandleOnChangeTextInput';
import SimpleNavBar from '../components/SimpleNavBar'
import { useNavigation } from '@react-navigation/native';
import Images from '@assets/images';

const AuthScreen = () => {
    const navigation = useNavigation();
    const { state, signin, clearState } = useContext(AuthContext);
    const [inputState, handleInputChange] = useHandleOnChangeTextInput(AuthSchema);

    return (


        <View style={tw`h-full items-center`}>
            <ScrollView contentContainerStyle={tw`items-center`}>

                <SimpleNavBar />
                
                <Text style={[tw`text-3xl mt-10 font-bold`, { color: '#004480' }]}>Iniciar Sesión</Text>
                <View style={tw`w-4/5 mt-8`}>
                    <InputForm
                        maxLength={50}
                        name='username'
                        placeholder='Correo electrónico'
                        leftIcon={<Icon type='font-awesome' name='envelope' size={25} color='black' style={{ marginRight: 15 }} />}
                        inputContainerStyle={styles.input} keyboardType='email-address'
                        autoCapitalize='none'
                        onChangeText={(value) => handleInputChange(value, 'email')} />
                    <InputForm
                        maxLength={15}
                        name='password'
                        leftIcon={<Icon type='font-awesome' name='lock' size={25} color='black' style={{ marginRight: 15 }} />}
                        inputContainerStyle={styles.input}
                        placeholder='Contraseña'
                        secureTextEntry={true}
                        onChangeText={(value) => handleInputChange(value, 'password')} />

                    <ButtonFrom
                        handleSubmit={() => {
                            signin(inputState);
                        }}
                        loading={state.fetchingData ? true : false}
                    />
                    <View style={tw`items-center`}>
                        <Text style={[tw`text-xs mb-10 font-bold `, { color: '#707070' }]}>Al crear tu cuenta estas aceptando nuestros Términos de uso y Política de privacidad.</Text>
                    </View>
                </View>
                {
                    state.error === true
                        ?
                        Alert.alert(
                            "Error de Autentificacion",
                            state.message,
                            [{
                                text: "OK",
                                onPress: clearState
                            }]
                        )
                        :
                        null
                }

            </ScrollView>
        </View>


    )
}

export default AuthScreen

const styles = StyleSheet.create({
    container: {
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
    }

})
