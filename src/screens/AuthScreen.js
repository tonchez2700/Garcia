import React, { useContext } from 'react'
import { StyleSheet, Text, View, Alert, ScrollView, Image, ImageBackground, TouchableOpacity } from 'react-native'
import tw from 'tailwind-react-native-classnames';
import { Icon, Button } from 'react-native-elements'
import InputForm from '../components/Forms/InputForm';
import ButtonFrom from '../components/Forms/ButtonFrom';
import { Context as AuthContext } from '../context/AuthContext';
import { AuthSchema } from './../config/schemas';
import useHandleOnChangeTextInput from './../hooks/useHandleOnChangeTextInput';
import SimpleNavBar from '../components/SimpleNavBar'
import { useNavigation } from '@react-navigation/native';
import Images from '@assets/images';
import { general } from '../theme/customTheme';
import { SocialIcon, Divider  } from 'react-native-elements'


const AuthScreen = () => {
    const navigation = useNavigation();
    const { state, signin, clearState } = useContext(AuthContext);
    const [inputState, handleInputChange] = useHandleOnChangeTextInput(AuthSchema);
    const imageBackG = { uri: 'https://cdn.discordapp.com/attachments/1088505678416584796/1110605397825429565/Enmascarar_grupo_12.png'};

    return (

        <View style={styles.container}>
            <ImageBackground 
                source={Images.garciaBackgraund}
                resizeMode='cover'
                style={styles.imageBackGraund}
            >
                <View style={styles.containerSecundary}>
                    <View style={{alignContent: "center", alignItems: "center", paddingBottom: 20}}>
                        <Text style={[tw`text-2xl mt-10 font-bold`, { color: '#2A2929' }]}>!Hola!, bienvenido</Text>
                        <Image 
                            source={Images.garciaLogo}
                        />
                    </View>
                        <Text style={styles.textSession}>Iniciar sesión</Text>
                        
                            <InputForm
                                maxLength={50}
                                name='username'
                                placeholder='Correo' 
                                inputContainerStyle={styles.input} keyboardType='email-address'
                                autoCapitalize='none'
                                onChangeText={(value) => handleInputChange(value, 'email')} />
                            <InputForm
                                maxLength={15}
                                name='password'
                                inputContainerStyle={styles.input}
                                placeholder='Contraseña'
                                secureTextEntry={true}
                                onChangeText={(value) => handleInputChange(value, 'password')} />
                        

                        <View style={styles.buttonContainer}>
                            <ButtonFrom
                            handleSubmit={() => {
                                signin(inputState);
                            }}
                            loading={state.fetchingData ? true : false}
                            />
                        </View>

                    <View style={styles.dividerContainer}>
                        <View style={styles.divider}></View>
                        <Text> o </Text>
                        <View style={styles.divider}></View>
                    </View>

                    <View style={styles.socialContainer}>
                            <SocialIcon
                                type='facebook'
                                />
                            <SocialIcon
                                type='google'
                                />
                    </View>

                    <Text style={styles.textDonAccount}>¿No tienes una cuenta?</Text>
                    
                    <View style={{width: '90%', height: 60, alignItems: "center",}}>
                            <TouchableOpacity 
                                style={styles.createAccount}>
                                <Text style={styles.textCreate}>Crear una cuenta</Text>
                            </TouchableOpacity>
                    </View>

                    <TouchableOpacity>
                        <Text>¿No recuerdas tu contraseña?</Text>
                    </TouchableOpacity>


                    

                </View>
                    



            </ImageBackground>
            {/* 
                
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

                <Button
                    onPress={() => { navigation.navigate('RegisterScreen') }}
                    titleStyle={{ fontSize: 16 }}
                    title={'Aceptar'}
                    buttonStyle={{ backgroundColor: '#003C71', borderRadius: 4, alignItems: 'center', padding: 10 }}
                />
                <Button
                    onPress={() => { navigation.navigate('RegisterScreen') }}
                    titleStyle={{ fontSize: 16 }}
                    title={'Aceptar'}
                    buttonStyle={{ backgroundColor: '#003C71', borderRadius: 4, alignItems: 'center', padding: 10 }}
                />
                <View style={tw`items-center`}>
                    <Text style={[tw`text-xs mb-10 font-bold `, { color: '#707070' }]}>Al crear tu cuenta estas aceptando nuestros Términos de uso y Política de privacidad.</Text>
                </View> */}
            
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
        </View>

    )
}

export default AuthScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    containerSecundary: {
        height: '92%',
         width: '90%' ,
         alignContent: "center",
         alignItems: "center",
         borderWidth: 1, 
         borderColor: "#707070B3", 
         backgroundColor: 'rgba(255, 255, 255, .8)',
         //backgroundColor: "",
         borderRadius: 40,
         paddingTop: 10,
         
    },
    textSession: {
        color:"#2A2929", 
        fontSize: 20, 
        fontWeight: '500', 
        paddingTop: 10, 
        paddingBottom: 30
    },
    input: {
        backgroundColor: 'white',
        padding: 9,
        paddingLeft: 20,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: '#707070B3',
    },
    imageBackGraund: {
        flex: 1,
        justifyContent: "center", 
        alignContent: "center", 
        alignItems: "center"
    },
    dividerContainer: {
        flexDirection: "row", 
        justifyContent: "space-between",
        alignItems: "center", 
        alignContent: "center", 
        height: 30
    },
    divider: {
        height: 1, 
        width: "45%", 
        backgroundColor: "black"
    },
    buttonContainer: {
        width: '90%', 
        height: 60,
         alignItems: "center", 
         opacity: 1
    },
    createAccount:{
        width: '95%',
        height: 40,
        backgroundColor: '#fff', 
        borderRadius: 30,
        overflow: 'hidden', 
        justifyContent: 'center',
        alignItems: "center", 
       // borderColor: "#000", borderWidth: 1
    },
    textCreate: {
        fontSize: 16, 
        fontWeight: "500"
    },
    socialContainer: {
        flexDirection: "row", 
        justifyContent: "space-between",
    },
    textDonAccount: {
        paddingTop: 10, 
        fontSize: 16, 
        fontWeight: "500", 
        paddingBottom: 16
    }

})
