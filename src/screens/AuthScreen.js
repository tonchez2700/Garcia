import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { Icon, Button, SocialIcon, Divider } from "react-native-elements";
import { FAB } from "react-native-paper";
import InputForm from "../components/Forms/InputForm";
import ButtonFrom from "../components/Forms/ButtonFrom";
import { Context as AuthContext } from "../context/AuthContext";
import { AuthSchema } from "./../config/schemas";
import useHandleOnChangeTextInput from "./../hooks/useHandleOnChangeTextInput";
import { useNavigation } from "@react-navigation/native";
import Images from "@assets/images";
import { general } from "../theme/customTheme";

const AuthScreen = () => {
  const navigation = useNavigation();
  const { state, signin, clearState } = useContext(AuthContext);
  const [inputState, handleInputChange] = useHandleOnChangeTextInput(AuthSchema);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const renderSignInForm = () => (

    <View style={{ alignItems: "center", width: "100%", }}>
      <Text style={styles.textSession}>Iniciar sesión</Text>

      <InputForm
        maxLength={50}
        name="username"
        placeholder="Correo"
        inputContainerStyle={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={(value) => handleInputChange(value, "email")}
      />
      <InputForm
        maxLength={15}
        name="password"
        inputContainerStyle={styles.input}
        placeholder="Contraseña"
        secureTextEntry={true}
        onChangeText={(value) => handleInputChange(value, "password")}
      />

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


      <View style={{ width: 340 }}>
        <View style={{ width: "100%", height: 120 }}>
          <SocialIcon title="Continuar con Facebook" button type="facebook" />
          <SocialIcon title="Continuar con Google" button type="google" light />
        </View>
      </View>


      <Text style={styles.textDonAccount}>¿No tienes una cuenta?</Text>

      <View style={{ width: "100%", height: 60, alignItems: "center", width: 340, }}>
        <TouchableOpacity
          style={styles.createAccount}
          onPress={() => setIsSignUp(true)}
        >
          <Text style={styles.textCreate}>Crear una cuenta</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => setIsForgotPassword(true)}>
        <Text>¿No recuerdas tu contraseña?</Text>
      </TouchableOpacity>
    </View>
  );

  const renderSignUpForm = () => (
    <View style={styles.containerRegister}>
      {/* Aquí va tu formulario de registro */}
      <Text style={{ fontWeight: "bold", fontSize: 20 }}>Crea tu cuenta</Text>
      <View style={{ width: "100%", alignItems: "center" }}>
        <InputForm
          maxLength={50}
          name="username"
          placeholder="Correo"
          inputContainerStyle={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(value) => handleInputChange(value, "email")}
        />
        <InputForm
          maxLength={15}
          name="Nombre"
          inputContainerStyle={styles.input}
          placeholder="Nombre"
          secureTextEntry={true}
          onChangeText={(value) => handleInputChange(value, "password")}
        />
        <InputForm
          maxLength={50}
          name="Contraseña"
          placeholder="Contraseña"
          inputContainerStyle={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(value) => handleInputChange(value, "email")}
        />
        <InputForm
          maxLength={15}
          name="Contraseña"
          inputContainerStyle={styles.input}
          placeholder="Contraseña"
          secureTextEntry={true}
          onChangeText={(value) => handleInputChange(value, "password")}
        />
        <View style={styles.buttonContainer}>
          <ButtonFrom
            handleSubmit={() => {
              signin(inputState);
            }}
            loading={state.fetchingData ? true : false}
          />
        </View>

      </View>
      <View style={{ width: 300, alignItems: "center", marginTop: 10, paddingBottom: 20, }}>
        <Text style={{ fontSize: 16, fontWeight: "600" }}>¿Tienes una cuenta?, Inicia sesión</Text>
        <TouchableOpacity
          style={styles.createAccount}
          onPress={() => setIsSignUp(false)}
        >
          <Text style={styles.textCreate}>Inicia sesión</Text>
        </TouchableOpacity>
      </View>
    </View>

  );

  const renderForgotPasswordForm = () => (
    <View style={{ alignItems: "center", width: "100%", }}>
      <Text style={styles.textSession}>Recuperar contraseña</Text>
      <InputForm
        maxLength={50}
        name="email"
        placeholder="Correo"
        inputContainerStyle={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={(value) => handleInputChange(value, "email")}
      />
      <View style={styles.buttonContainer}>
        <ButtonFrom
          handleSubmit={() => {

          }}
          loading={state.fetchingData ? true : false}
        />
      </View>
      <Text style={styles.textDonAccount}>¿Recordaste tu contraseña?</Text>
      <View style={{ width: "100%", height: 60, alignItems: "center", width: 340, }}>
        <TouchableOpacity
          style={styles.createAccount}
          onPress={() => setIsForgotPassword(false)}
        >
          <Text style={styles.textCreate}>Inicia sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={Images.garciaBackgraund}
        resizeMode="cover"
        style={styles.imageBackGraund}
      >
        <View style={styles.containerSecundary}>
          <View
            style={{
              alignContent: "center",
              alignItems: "center",
              paddingBottom: 5,
              with: "95%"
            }}
          >
            <Text style={[tw`text-2xl mt-10 font-bold`, { color: "#2A2929" }]}>
              !Hola!, bienvenido
            </Text>
            <Image source={Images.garciaLogo} />
          </View>

          {isSignUp ? renderSignUpForm() : (isForgotPassword ? renderForgotPasswordForm() : renderSignInForm())}
        </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  containerSecundary: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "#707070B3",
    backgroundColor: "rgba(255, 255, 255, .8)",
    borderRadius: 40,
    paddingTop: 10,
  },
  containerRegister: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
  },
  textSession: {
    color: "#2A2929",
    fontSize: 20,
    fontWeight: "500",
    paddingTop: 8,
    paddingBottom: 20,
  },
  input: {
    backgroundColor: "white",
    padding: 5,
    paddingLeft: 20,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "#707070B3",
  },
  imageBackGraund: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    padding: 20
  },
  dividerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    height: 30,
  },
  divider: {
    height: 1,
    width: "45%",
    backgroundColor: "black",
  },
  buttonContainer: {
    width: "90%",
    height: 60,
    alignItems: "center",
    opacity: 1,
  },
  createAccount: {
    width: "100%",
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 30,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    // borderColor: "#000", borderWidth: 1
  },
  textCreate: {
    fontSize: 16,
    fontWeight: "500",
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textDonAccount: {
    paddingTop: 15,
    fontSize: 16,
    fontWeight: "500",
    paddingBottom: 16,
  },
});
