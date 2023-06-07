import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet, Alert, Platform, SafeAreaView,
  ImageBackground, ScrollView
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { Context as AuthContext } from "../context/AuthContext";
import { AuthSchema } from "./../config/schemas";
import { AuthStyle } from "../theme/AuthStyles";
import { useNavigation } from "@react-navigation/native";
import useHandleOnChangeTextInput from "./../hooks/useHandleOnChangeTextInput";
import Login from "../components/LoginComponents/Login";
import Registration from "../components/LoginComponents/Registration";
import Recovery from "../components/LoginComponents/Recovery";
import Images from "@assets/images";
import SimpleNavBar from '../components/SimpleNavBar'

const AuthScreen = () => {
  const navigation = useNavigation();
  const { state, signin, clearState, setStateView } = useContext(AuthContext);
  const [inputState, handleInputChange] = useHandleOnChangeTextInput(AuthSchema);



  const getViewCase = (estado) => {
    switch (estado) {
      case 1:
        return (
          <Login
            id={inputState}
            fetchingData={state.fetchingData}
            signin={() => signin(inputState)}
            onChangeText={(value, typedata) => handleInputChange(value, typedata)}
            stateView={(value) => setStateView(value)} />
        )
      case 2:
        return (
          <Registration
            id={inputState}
            fetchingData={state.fetchingData}
            signin={() => signin(inputState)}
            onChangeText={(value, typedata) => handleInputChange(value, typedata)}
            stateView={(value) => setStateView(value)} />
        )
      case 3:
        return (
          <Recovery
            id={inputState}
            fetchingData={state.fetchingData}
            signin={() => signin(inputState)}
            onChangeText={(value, typedata) => handleInputChange(value, typedata)}
            stateView={(value) => setStateView(value)} />
        )
      default:
        return (
          <Login
            id={inputState}
            fetchingData={state.fetchingData}
            signin={() => signin(inputState)}
            onChangeText={(value, typedata) => handleInputChange(value, typedata)}
            stateView={(value) => setStateView(value)} />
        )
    }
  };

  return (

    <SafeAreaView style={AuthStyle.container}>
      {
        Platform.OS === "android" ? <SimpleNavBar /> : null
      }
      <ImageBackground
        source={Images.garciaBackgraund}
        style={AuthStyle.ImageBackGraund}>
        <ScrollView
          nestedScrollEnabled
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={tw`items-center`}
          style={[AuthStyle.ContainerWhite, state.stateView === 1 || state.stateView === 2 ? { height: '80%' } : { flex: 1 }]}>
          {getViewCase(state.stateView)}
        </ScrollView>
      </ImageBackground>
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

    </SafeAreaView>

  )
}

export default AuthScreen

const styles = StyleSheet.create({})
