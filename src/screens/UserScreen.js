import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet, View, Text, TextInput,
  Image, KeyboardAvoidingView, Platform,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Context as RegistrationContext } from "../context/RegistrationContext";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { UserSytles } from "../theme/UserSytles";
import Images from "@assets/images";

const UserScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState('');
  const [editedData, setEditedData] = useState({});
  const { state, PutUSerProfile } = useContext(RegistrationContext);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser.userData);
          setEditedData(parsedUser.userData);
        }
      } catch (error) {
        console.log("Error al obtener los datos del usuario:", error);
      }
    };
    fetchUserData();
  }, []);

  const handleInputChange = (fieldName, value) => {
    setEditedData((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={UserSytles.container} >
      {user.picture != null ?
        <Image style={UserSytles.userImage} source={{ uri: user.picture }} />
        : <Image style={UserSytles.userImage} source={Images.perfil} />}
      <Text style={[UserSytles.text, { fontSize: 20, }]}>Nombre</Text>
      <Text style={[UserSytles.text, { fontSize: 20, }]}>
        {user && user.full_name ? user.full_name : ''}
      </Text>
      <View style={{ width: "100%", flex: 1, padding: 20 }}>
        <Text style={UserSytles.textInput}>Nombre</Text>
        <TextInput
          style={UserSytles.input}
          placeholder="Nombre"
          value={editedData.full_name}
          onChangeText={(value) => handleInputChange("full_name", value)}
        />
        <Text style={UserSytles.textInput}>Teléfono</Text>
        <TextInput
          style={UserSytles.input}
          placeholder="Teléfono"
          value={editedData.phone}
          onChangeText={(value) => handleInputChange("phone", value)}
        />
        <Text style={UserSytles.textInput}>Correo</Text>
        <TextInput
          style={UserSytles.input}
          placeholder="Correo"
          value={editedData.email}
          onChangeText={(value) => handleInputChange("email", value)}
        />
        <Button
          title="Guardar cambios"
          disabled={JSON.stringify(user) === JSON.stringify(editedData)}
          containerStyle={UserSytles.button}
          loading={state.fetchingData ? true : false}
          onPress={() => PutUSerProfile(editedData)}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default UserScreen;

const styles = StyleSheet.create({

  defaultInput: {
    color: "#333",
    backgroundColor: "#f2f2f2",
  },
  editedInput: {
    color: "blue",
    backgroundColor: "#f2f2f2",
  },
});
