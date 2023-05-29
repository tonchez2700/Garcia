import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  TextInput,
  Image,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Context as RegistrationContext } from "../context/RegistrationContext";
import { general } from "../theme/customTheme";
import { Icon, Button, Slider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import tw from "tailwind-react-native-classnames";
import MenuItem from "../components/MenuItem";
import moment from "moment";
import InputForm from "../components/Forms/InputForm";
import InputProfile from "../components/Forms/ImputProfile";

const UserScreen = () => {
  const navigation = useNavigation();
  const { state, handleInputChange } = useContext(RegistrationContext);
  const imageUser = {
    uri: "https://www.fakepersongenerator.com/Face/female/female20161025132706268.jpg",
  };

  // useEffect(() => {
  //     const unsubscribe = navigation.addListener('blur', () => {
  //
  //     });
  //     return unsubscribe;
  // }, [navigation]);

  const renderContent = () => {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.secundaryContainer}>
            <Text style={styles.textName}>Sharon T Lett</Text>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                width: "100%",
                alignItems: "center",
                backgroundColor: "red",
                padding: 10,
              }}
            >
              <View
                style={{
                  paddingTop: 10,
                  width: "100%",
                  height: 120,
                  alignItems: "center",
                  alignContent: "center",
                  backgroundColor: "blue",
                }}
              >
                <Image
                  source={imageUser}
                  style={{
                    width: "42%",
                    height: "100%",
                    paddingTop: 10,
                    borderRadius: 100,
                  }}
                />
              </View>
              <View
                style={{
                  paddingTop: 20,
                  alignItems: "center",
                  width: "100%",
                  height: 80,
                  backgroundColor: "green",
                }}
              >
                <Text style={styles.textName}>Nombre</Text>
                <Text style={styles.textNameUser}>Sharon T Lett</Text>
              </View>
              <View
                style={{
                  width: "100%",
                  height: "55%",
                  backgroundColor: "yellow",
                }}
              >
                
                  <View style={{ width: "100%", height: "50%" }}>
                    <Text style={styles.textInput}>Nombre</Text>
                    <InputForm
                      maxLength={50}
                      name="Contraseña"
                      placeholder="Contraseña"
                      inputContainerStyle={styles.input}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      onChangeText={(value) =>
                        handleInputChange(value, "email")
                      }
                    />
                    <Text style={styles.textInput}>Correo</Text>
                    <InputForm
                      maxLength={50}
                      name="Contraseña"
                      placeholder="Contraseña"
                      inputContainerStyle={styles.input}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      onChangeText={(value) =>
                        handleInputChange(value, "email")
                      }
                    />
                    <Text style={styles.textInput}>Contraseña</Text>
                    <InputForm
                      maxLength={50}
                      name="Contraseña"
                      placeholder="Contraseña"
                      inputContainerStyle={styles.input}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      onChangeText={(value) =>
                        handleInputChange(value, "email")
                      }
                    />
                  </View>
             
              </View>
            </View>
          </View>
          <View
            style={{
              backgroundColor: "orange",
              width: "100%",
              height: 50,
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <TouchableOpacity style={styles.saveButton}>
              <Text style={styles.textNameUser}>Guardar cambios</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return !state.fetchingData ? (
    !state.error ? (
      renderContent()
    ) : (
      <View style={tw`flex-1 p-5 justify-center items-center`}>
        <Text style={tw`text-center text-lg mb-3`}>{state.message}</Text>
        <Button
          containerStyle={{ width: 120 }}
          buttonStyle={[{ backgroundColor: "#118ea6" }]}
          title="Actualizar"
          onPress={() => navigation.navigate("HomeScreen")}
        />
      </View>
    )
  ) : (
    <ActivityIndicator size="large" color="#118EA6" style={tw`mt-5`} />
  );
};
export default UserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E0554",
    padding: 30,
  },
  secundaryContainer: {
    width: "100%",
    height: 580,
    padding: 20,
    backgroundColor: "#468123",
    borderRadius: 10,
    alignItems: "center",
  },
  input: {
    backgroundColor: "white",
    padding: 2,
    paddingLeft: 15,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "#707070B3",
  },
  textName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
  textNameUser: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
  },
  textInput: {
    paddingLeft: 32,
    fontSize: 14,
    color: "#fff",
  },
  buttonContainer: {},
  saveButton: {
    width: "92%",
    height: 30,
    backgroundColor: "#629DF6",
    borderRadius: 30,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    // borderColor: "#000", borderWidth: 1
  },
});
