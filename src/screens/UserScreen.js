import React, { useContext } from "react";
import {
  StyleSheet, View, Text, TextInput,
  Image, KeyboardAvoidingView, Platform,
} from "react-native";
import { Context as RegistrationContext } from "../context/RegistrationContext";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { UserSytles } from "../theme/UserSytles";

const UserScreen = () => {
  const navigation = useNavigation();
  const { state, handleInputChange } = useContext(RegistrationContext);
  const imageUser = {
    uri: "https://www.fakepersongenerator.com/Face/female/female20161025132706268.jpg",
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={UserSytles.container} >
      <Text style={[UserSytles.text, { fontSize: 24 }]}>Sharon T Lett</Text>
      <Image style={UserSytles.userImage} source={imageUser} />
      <Text style={[UserSytles.text, { fontSize: 20, }]}>Nombre</Text>
      <Text style={[UserSytles.text, { fontSize: 20, }]}>Sharon T Lett</Text>
      <View style={{ width: "100%", flex: 1, padding: 20 }}>
        <Text style={UserSytles.textInput}>Nombre</Text>
        <TextInput
          style={UserSytles.input}
          placeholder="Nombre"
        />
        <Text style={UserSytles.textInput}>Teléfono</Text>
        <TextInput
          style={UserSytles.input}
          placeholder="Teléfono"
        />
        <Text style={UserSytles.textInput}>Correo</Text>
        <TextInput
          style={UserSytles.input}
          placeholder="Correo"
        />
        <Text style={UserSytles.textInput}>Contraseña</Text>
        <TextInput
          style={UserSytles.input}
          placeholder="Contraseña"
        />
        <Button
          title="Guardar cambios"
          containerStyle={UserSytles.button}
          onPress={() => console.log('pato')}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default UserScreen;

const styles = StyleSheet.create({});
