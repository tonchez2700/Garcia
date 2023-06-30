import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from "react-native";
import { Button, SocialIcon, } from "react-native-elements";
import { AuthStyle } from "../../theme/AuthStyles";
import { useNavigation } from "@react-navigation/native";
import Images from "@assets/images";
import ButtonFrom from "../Forms/ButtonFrom";
import InputForm from "../Forms/InputForm";
import ButtonsGoogle from "../ButtonsGoogle";
import * as AuthSession from 'expo-auth-session';
import * as Facebook from 'expo-auth-session/providers/facebook';
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();
const Login = ({ onChangeText, signin, fetchingData, id, stateView, authFacebook, authGoogle }) => {

    const [request, response, promptAsync] = Facebook.useAuthRequest({ clientId: "605649451337245", });
    const [requestG, responseG, promptAsyncG] = Google.useAuthRequest({
        clientId: '898724339858-fjg9pblpifmcc4f1q2a1nc17s0616qol.apps.googleusercontent.com',
        androidClientId: "898724339858-pv8prlium7ga3o3kg204emc9ftmbvq6h.apps.googleusercontent.com",
        iosClientId: "898724339858-lkm2u5h93u6em3b0869og5lq85e1i2tp.apps.googleusercontent.com",
    });
    const navigation = useNavigation();
    const [showPassword, setShowPassword] = useState(false);
    const [typeAuth, settypeAuth] = useState()

    useEffect(() => {
        if (typeAuth == "Facebook") {
            if (response && response.type === "success" && response.authentication) {
                (async () => {
                    const userInfoResponse = await fetch(
                        `https://graph.facebook.com/me?access_token=${response.authentication.accessToken}&fields=id,name,picture.type(large)`
                    );
                    const userInfo = await userInfoResponse.json();
                    authFacebook(userInfo)
                })();
            }
        } else {
            if (responseG?.type === "success") {
                (async () => {
                    const userInfoResponseG = await fetch(
                        "https://www.googleapis.com/userinfo/v2/me",
                        {
                            headers: { Authorization: `Bearer ${responseG.authentication.accessToken}` },
                        }
                    );
                    const userInfoG = await userInfoResponseG.json();
                    authGoogle(userInfoG)
                })();
            }
        }
    }, [response, responseG]);

    const handlePressAsync = async (type) => {
        settypeAuth(type)
        if (type == 'Facebook') {
            const result = await promptAsync();
            if (result.type !== "success") {
                alert("Uh oh, something went wrong");
                return;
            }
        } else {
            promptAsyncG()
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
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <View style={{ backgroundColor: 'black', height: 1, flex: 1, alignSelf: 'center' }} />
                <Text style={{ alignSelf: 'center', paddingHorizontal: 5, fontWeight: '700', fontSize: 14 }}>o</Text>
                <View style={{ backgroundColor: 'black', height: 1, flex: 1, alignSelf: 'center' }} />
            </View>

            <SocialIcon title="Continuar con Facebook" button type="facebook" onPress={async () => handlePressAsync('Facebook')} />
            <ButtonsGoogle onPress={() => handlePressAsync('Google')} />
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