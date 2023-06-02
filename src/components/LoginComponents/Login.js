import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Button, SocialIcon, } from "react-native-elements";
import { AuthStyle } from "../../theme/AuthStyles";
import { useNavigation } from "@react-navigation/native";
import Images from "@assets/images";
import ButtonFrom from "../Forms/ButtonFrom";
import InputForm from "../Forms/InputForm";
import * as AuthSession from 'expo-auth-session';
import * as Facebook from 'expo-auth-session/providers/facebook';
import * as WebBrowser from 'expo-web-browser';


const Login = ({ onChangeText, signin, fetchingData, id, stateView, Accordion }) => {

    const [request, response, promptAsync] = Facebook.useAuthRequest({ clientId: "605649451337245", });
    const [user, setUser] = useState(null);
    const navigation = useNavigation();
    const [showPassword, setShowPassword] = useState(false);

    if (request) {
        console.log(
            "You need to add this url to your authorized redirect urls on your Facebook app: " +
            request.redirectUri
        );
    }

    useEffect(() => {
        if (response && response.type === "success" && response.authentication) {
            (async () => {
                const userInfoResponse = await fetch(
                    `https://graph.facebook.com/me?access_token=${response.authentication.accessToken}&fields=id,name,picture.type(large)`
                );
                const userInfo = await userInfoResponse.json();
                setUser(userInfo);
            })();
        }
    }, [response]);
    const handlePressAsync = async () => {
        const result = await promptAsync();
        if (result.type !== "success") {
            alert("Uh oh, something went wrong");
            return;
        }
    };
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
            <View style={{ flexDirection: 'row' }}>
                <View style={{ backgroundColor: 'black', height: 1, flex: 1, alignSelf: 'center' }} />
                <Text style={{ alignSelf: 'center', paddingHorizontal: 5, fontWeight: '700', fontSize: 14 }}>o</Text>
                <View style={{ backgroundColor: 'black', height: 1, flex: 1, alignSelf: 'center' }} />
            </View>

            <SocialIcon title="Continuar con Facebook" button type="facebook" onPress={async () => handlePressAsync()} />
            <SocialIcon title="Continuar con Google" button type="google" light />
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
