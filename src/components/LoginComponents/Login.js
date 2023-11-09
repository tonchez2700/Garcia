import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from "react-native";
import { Button, SocialIcon, } from "react-native-elements";
import { AuthStyle } from "../../theme/AuthStyles";
import { useNavigation } from "@react-navigation/native";
import Images from "@assets/images";
import ButtonFrom from "../Forms/ButtonFrom";
import InputForm from "../Forms/InputForm";
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
    offlineAccess: true,
    webClientId: '851474503024-h4eltil6qbffdr4tr99p040ek5ajhg6c.apps.googleusercontent.com',
});

const Login = ({ onChangeText, signin, fetchingData, id, stateView, authFacebook, authGoogle }) => {

    const navigation = useNavigation();
    const [showPassword, setShowPassword] = useState(false);


    const handleGoogleSignIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            authGoogle(userInfo);
            // Aquí puedes usar la información de usuario para iniciar sesión en tu aplicación.
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <View style={{ flex: 1, width: '100%' }}>
            <Text style={[AuthStyle.TextAuth, { fontSize: 18, marginBottom: 27 }]}>¡Hola!, Bienvenido</Text>
            <Image source={Images.garciaLogo} style={AuthStyle.ImagenLogo} />
            <Text style={[AuthStyle.TextAuth, { fontSize: 14, marginBottom: 20 }]}>Iniciar sesión</Text>
            <InputForm
                maxLength={50}
                name='username'
                placeholder='Correo'
                inputContainerStyle={AuthStyle.input}
                keyboardType='email-address'
                autoCapitalize='none'
                onChangeText={(value) => onChangeText(value, 'email')} />
            <InputForm
                maxLength={15}
                name='password'
                inputContainerStyle={AuthStyle.input}
                placeholder='Contraseña'
                secureTextEntry={!showPassword}
                onChangeText={(value) => onChangeText(value, 'password')} />
            <ButtonFrom
                title="Iniciar"
                color="#629DF6"
                handleSubmit={() => signin(id)}
                loading={fetchingData ? true : false}
            />
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <View style={{ backgroundColor: 'black', height: 1, flex: 1, alignSelf: 'center' }} />
                <Text style={{ alignSelf: 'center', paddingHorizontal: 5, fontWeight: '700', fontSize: 14 }}>o</Text>
                <View style={{ backgroundColor: 'black', height: 1, flex: 1, alignSelf: 'center' }} />
            </View>
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                <GoogleSigninButton
                    style={{ width: '90%', height: 40 }}
                    size={GoogleSigninButton.Size.Icon}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={handleGoogleSignIn}
                />
            </View>
            <Text style={AuthStyle.textDonAccount}>¿No tienes una cuenta?</Text>
            <View style={{ marginBottom: 15, padding: 10 }}>
                <Button
                    onPress={() => stateView(2)}
                    buttonStyle={{ backgroundColor: '#FFFFFF', borderRadius: 23 }}
                    titleStyle={{ color: 'black' }}
                    title={'Crea una cuenta'} />
            </View>
            <TouchableOpacity style={{ flex: 1, width: '100%', marginBottom: 50 }} onPress={() => stateView(3)}>
                <Text style={{ textAlign: 'center' }}>¿No recuerdas tu contraseña?</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Login


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    profile: {
        alignItems: "center",
    },
    name: {
        fontSize: 20,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
});