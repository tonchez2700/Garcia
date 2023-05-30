import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet, Text, View, Alert,
  ImageBackground, TouchableOpacity, Image, ScrollView
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { Icon, Button, SocialIcon, Divider } from "react-native-elements";
import InputForm from "../components/Forms/InputForm";
import { Context as AuthContext } from "../context/AuthContext";
import { AuthSchema } from "./../config/schemas";
import { AuthStyle } from "../theme/AuthStyles";
import { useNavigation } from "@react-navigation/native";
import useHandleOnChangeTextInput from "./../hooks/useHandleOnChangeTextInput";
import Images from "@assets/images";
import ButtonFrom from "../components/Forms/ButtonFrom";
import * as AuthSession from 'expo-auth-session';
import * as Facebook from 'expo-auth-session/providers/facebook';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();
const AuthScreen = () => {

  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: "790514239377006",
  });
  const { state, signin, clearState } = useContext(AuthContext);
  const [inputState, handleInputChange] =
    useHandleOnChangeTextInput(AuthSchema);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

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

  console.log(user);

  const handlePressAsync = async () => {
    const result = await promptAsync();
    if (result.type !== "success") {
      alert("Uh oh, something went wrong");
      return;
    }
  };
  const renderSignInForm = () => (
    <View style={{ width: "100%", flex: 1 }}>
      <Text style={AuthStyle.textSession}>Iniciar sesión</Text>
      <InputForm
        maxLength={50}
        name="username"
        placeholder="Correo"
        inputContainerStyle={AuthStyle.input}
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={(value) => handleInputChange(value, "email")}
      />
      <InputForm
        maxLength={15}
        name="password"
        inputContainerStyle={AuthStyle.input}
        placeholder="Contraseña"
        secureTextEntry={true}
        onChangeText={(value) => handleInputChange(value, "password")}
      />
      <ButtonFrom
        handleSubmit={() => {
          signin(inputState);
        }}
        title="Iniciar"
        color="#629DF6"
        loading={state.fetchingData ? true : false}
      />
      <View style={AuthStyle.dividerContainer}>
        <View style={AuthStyle.divider}></View>
        <Text> o </Text>
        <View style={AuthStyle.divider}></View>
      </View>
      <View style={{ width: "100%" }}>
        <SocialIcon title="Continuar con Facebook" button type="facebook" onPress={async () => handlePressAsync()} />
        <SocialIcon title="Continuar con Google" button type="google" light />
      </View>
      <Text style={AuthStyle.textDonAccount}>¿No tienes una cuenta?</Text>
      <View style={{ marginBottom: 15, padding: 10 }}>
        <Button
          onPress={() => setIsSignUp(true)}
          buttonStyle={{ backgroundColor: '#FFFFFF', borderRadius: 23 }}
          titleStyle={{ color: 'black' }}
          title={'Crea una cuenta'} />
      </View>
      <TouchableOpacity onPress={() => setIsForgotPassword(true)}>
        <Text style={{ textAlign: 'center' }}>¿No recuerdas tu contraseña?</Text>
      </TouchableOpacity>
    </View>
  );

  const renderSignUpForm = () => (
    <View style={AuthStyle.containerRegister}>
      {/* Aquí va tu formulario de registro */}
      <Text style={{ fontWeight: "bold", fontSize: 20, textAlign: 'center' }}>Crea tu cuenta</Text>
      <View style={{ width: "100%" }}>
        <InputForm
          maxLength={50}
          name="username"
          placeholder="Correo"
          inputContainerStyle={AuthStyle.input}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(value) => handleInputChange(value, "email")}
        />
        <InputForm
          maxLength={15}
          name="Nombre"
          inputContainerStyle={AuthStyle.input}
          placeholder="Nombre"
          secureTextEntry={true}
          onChangeText={(value) => handleInputChange(value, "password")}
        />
        <InputForm
          maxLength={50}
          name="Contraseña"
          placeholder="Contraseña"
          inputContainerStyle={AuthStyle.input}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(value) => handleInputChange(value, "email")}
        />
        <InputForm
          maxLength={15}
          name="Contraseña"
          inputContainerStyle={AuthStyle.input}
          placeholder="Contraseña"
          secureTextEntry={true}
          onChangeText={(value) => handleInputChange(value, "password")}
        />
      </View>
      <View style={{ marginBottom: 15, padding: 10 }}>
        <Button
          title={'Crea tu cuenta'}
          titleStyle={{ color: '#FFF' }}
          buttonStyle={{ backgroundColor: '#629DF6', borderRadius: 23 }}
          onPress={() => signin(inputState)} />
      </View>
      <Text style={{ fontSize: 16, fontWeight: "600", textAlign: 'center' }}>
        ¿Tienes una cuenta?, Inicia sesión
      </Text>
      <View style={{ marginBottom: 15, padding: 10 }}>
        <Button
          title={'Inicia sesión'}
          titleStyle={{ color: 'black' }}
          buttonStyle={{ backgroundColor: '#FFF', borderRadius: 23 }}
          onPress={() => setIsSignUp(false)} />
      </View>
    </View>
  );

  const renderForgotPasswordForm = () => (
    <View style={{ width: "100%" }}>
      <Text style={AuthStyle.textSession}>Recuperar contraseña</Text>
      <InputForm
        maxLength={50}
        name="email"
        placeholder="Correo"
        inputContainerStyle={AuthStyle.input}
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={(value) => handleInputChange(value, "email")}
      />
      <View style={{ marginBottom: 15, padding: 10 }}>
        <Button
          title={'Enviar'}
          titleStyle={{ color: '#FFF' }}
          buttonStyle={{ backgroundColor: '#629DF6', borderRadius: 23 }}
          onPress={() => setIsSignUp(true)} />
      </View>
      <Text style={AuthStyle.textDonAccount}>¿Recordaste tu contraseña?</Text>
      <View style={{ marginBottom: 15, padding: 10 }}>
        <Button
          title={'Volver a inicio de sesión'}
          titleStyle={{ color: 'black' }}
          buttonStyle={{ backgroundColor: '#FFF', borderRadius: 23 }}
          onPress={() => setIsForgotPassword(false)} />
      </View>
    </View>
  );

  return (
    <View style={AuthStyle.container}>
      <ImageBackground
        source={Images.garciaBackgraund}
        resizeMode="cover"
        style={AuthStyle.imageBackGraund}
      >
        <ScrollView style={AuthStyle.containerSecundary}>
          <View style={{ alignContent: "center", alignItems: "center", paddingVertical: 10, with: "95%", }}>
            <Image source={Images.garciaLogo} />
          </View>

          {isSignUp
            ? renderSignUpForm()
            : isForgotPassword
              ? renderForgotPasswordForm()
              : renderSignInForm()}
        </ScrollView>
      </ImageBackground>

      {state.error === true
        ? Alert.alert("Error de Autentificacion", state.message, [
          {
            text: "OK",
            onPress: clearState,
          },
        ])
        : null}
    </View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({});
