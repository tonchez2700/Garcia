import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Context as RegistrationContext } from "../context/RegistrationContext";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import InputForm from "../components/Forms/InputForm";

const UserScreen = () => {
  const navigation = useNavigation();
  const { state, handleInputChange } = useContext(RegistrationContext);
  const imageUser = {
    uri: "https://www.fakepersongenerator.com/Face/female/female20161025132706268.jpg",
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={{ alignItems: "center", padding: 20 }}>
        <Text style={styles.nameHighlight}>Sharon T Lett</Text>
        <Image style={styles.userImage} source={imageUser} />
        <Text style={styles.label}>Nombre</Text>
        <Text style={styles.userInfo}>Sharon T Lett</Text>
      </View>
      <View style={{ width: "100%", height: "40%", }}>
        <Text style={styles.textInput}>Nombre</Text>
        <InputForm
          maxLength={50}
          name="Name"
          placeholder="Nombre"
          inputContainerStyle={styles.input}
        />
        <Text style={styles.textInput}>Correo</Text>
        <InputForm
          maxLength={50}
          name="correo"
          placeholder="Correo"
          inputContainerStyle={styles.input}
          keyboardType="email-address"
        />
        <Text style={styles.textInput}>Contraseña</Text>
        <InputForm
          maxLength={15}
          name="password"
          inputContainerStyle={styles.input}
          placeholder="Contraseña"
          secureTextEntry={true}
        />

        <View
          style={{
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
    </KeyboardAvoidingView>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#1E0554",
  },
  nameHighlight: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    margin: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  userInfo: {
    fontSize: 16,
    color: "#fff",
  },
  input: {
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
  },
  textInput: {
    paddingLeft: 32,
    fontSize: 14,
    color: "#fff",
  },
  input: {
    backgroundColor: "white",
    paddingLeft: 15,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "#707070B3",
  },
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
