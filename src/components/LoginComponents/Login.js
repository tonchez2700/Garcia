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
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();
const Login = ({ onChangeText, signin, fetchingData, id, stateView, Accordion }) => {

    const [request, response, promptAsync] = Facebook.useAuthRequest({ clientId: "605649451337245", });
    const [requestG, responseG, promptAsyncG] = Google.useAuthRequest({
        androidClientId: "898724339858-pv8prlium7ga3o3kg204emc9ftmbvq6h.apps.googleusercontent.com",
        iosClientId: "898724339858-lkm2u5h93u6em3b0869og5lq85e1i2tp.apps.googleusercontent.com",

    });
    const [user, setUser] = useState(null);
    const navigation = useNavigation();
    const [showPassword, setShowPassword] = useState(false);
    const [typeAuth, settypeAuth] = useState()
    if (request) {
        console.log(
            "You need to add this url to your authorized redirect urls on your Facebook app: " +
            request.redirectUri
        );
    }
    const getUserInfo = async () => {
        try {
            const response = await fetch(
                "https://www.googleapis.com/userinfo/v2/me",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const user = await response.json();
            setUser(user);
        } catch (error) {
            // Add your own error handler here
        }
    };
    useEffect(() => {
        if (typeAuth == "Facebook") {
            if (response && response.type === "success" && response.authentication) {
                (async () => {
                    const userInfoResponse = await fetch(
                        `https://graph.facebook.com/me?access_token=${response.authentication.accessToken}&fields=id,name,picture.type(large)`
                    );
                    const userInfo = await userInfoResponse.json();
                    setUser(userInfo);
                })();
            }
        } else {
            if (responseG?.type === "success") {
                setToken(responseG.authentication.accessToken);
                getUserInfo();
            }
        }

    }, [response, responseG]);

    const Profile = ({ user }) => (
        <View style={styles.profile}>
            <Image source={{ uri: user.picture.data.url }} style={styles.image} />
            <Text style={styles.name}>{user.name}</Text>
            {/* <Text>ID: {responseG.authentication.accessToken}</Text> */}
        </View>
    );

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
            {user ? (
                <Profile user={user} />
            ) : null}
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

            <SocialIcon title="Continuar con Facebook" button type="facebook" onPress={async () => handlePressAsync('Facebook')} />
            <SocialIcon title="Continuar con Google" button type="google" light onPress={async () => handlePressAsync('Google')} />
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
