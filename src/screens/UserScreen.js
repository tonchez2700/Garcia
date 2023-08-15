import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet, View, Text, TextInput, ScrollView,
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
    <ScrollView
      nestedScrollEnabled
      persistentScrollbar={true}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
      contentInsetAdjustmentBehavior="automatic">
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
          <Text style={UserSytles.textInput}>Nombre(s)</Text>
          <TextInput
            style={UserSytles.input}
            placeholder="Nombre"
            value={editedData.name}
            onChangeText={(value) => handleInputChange("name", value)}
          />
          <Text style={UserSytles.textInput}>Primer apellido</Text>
          <TextInput
            style={UserSytles.input}
            placeholder="Nombre"
            value={editedData.paternal_surname}
            onChangeText={(value) => handleInputChange("paternal_surname", value)}
          />
          <Text style={UserSytles.textInput}>Segundo apellido</Text>
          <TextInput
            style={UserSytles.input}
            placeholder="Nombre"
            value={editedData.maternal_surname}
            onChangeText={(value) => handleInputChange("maternal_surname", value)}
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
          <Text style={UserSytles.textInput}>Dirección</Text>
          <TextInput
            style={UserSytles.input}
            placeholder="Dirección"
            value={editedData.address}
            onChangeText={(value) => handleInputChange("address", value)}
          />
          <Text style={UserSytles.textInput}>Código postal</Text>
          <TextInput
            style={UserSytles.input}
            placeholder="Código postal"
            value={editedData.postal_code}
            onChangeText={(value) => handleInputChange("postal_code", value)}
          />
          <Button
            title="Guardar cambios"
            containerStyle={UserSytles.button}
            loading={state.fetchingData ? true : false}
            onPress={() => PutUSerProfile(editedData)}
          />
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
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
