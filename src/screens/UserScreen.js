import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet, View, Text, TextInput, ScrollView,
  Image, TouchableOpacity, Platform,
} from "react-native";
import { Icon } from "react-native-elements";
import ImagenPerfil from "../components/ImagenPerfil";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Context as RegistrationContext } from "../context/RegistrationContext";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { UserSytles } from "../theme/UserSytles";
import Images from "../components/assets/images";


const UserScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState('');
  const [image, setImage] = useState(null);
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


  const handleSaveChanges = async () => {
    const changedData = {};

    for (const key in editedData) {
      if (editedData.hasOwnProperty(key) && editedData[key] !== user[key]) {
        changedData[key] = editedData[key];
      }
    }

    if (Object.keys(changedData).length > 0) {
      await PutUSerProfile(changedData);
    }
  };
 

  return (
    <ScrollView
      nestedScrollEnabled
      persistentScrollbar={true}
      keyboardDismissMode="on-drag"
      style={UserSytles.container}
      contentInsetAdjustmentBehavior="automatic">
      <View style={{ alignSelf: 'flex-end' }}>
        <Icon
          size={25}
          name={'remove'}
          onPress={() => navigation.navigate('Mapa')}
          type='font-awesome'
          color={'#FFFFFF'} />
      </View>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <ImagenPerfil
          picture={user.picture?.startsWith('http')
            ? user.picture
            : `https://www.appalaorden.garcia.gob.mx/garcia/${user.picture}`}
          onChangeText={(value, typedata) => handleInputChange(value, typedata)} />
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
            placeholder="Primer apellido"
            value={editedData.paternal_surname}
            onChangeText={(value) => handleInputChange("paternal_surname", value)}
          />
          <Text style={UserSytles.textInput}>Segundo apellido</Text>
          <TextInput
            style={UserSytles.input}
            placeholder="Segundo apellido"
            value={editedData.maternal_surname}
            onChangeText={(value) => handleInputChange("maternal_surname", value)}
          />

          <Text style={UserSytles.textInput}>Teléfono</Text>
          <TextInput
            maxLength={10}
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
          <Text style={UserSytles.textInput}>Código postal</Text>
          <TextInput
            maxLength={5}
            style={UserSytles.input}
            placeholder="Código postal"
            value={editedData.postal_code}
            onChangeText={(value) => handleInputChange("postal_code", value)}
          />
          <Text style={UserSytles.textInput}>Contraseña</Text>
          <TextInput
            style={UserSytles.input}
            placeholder="Contraseña"
            value={editedData.password}
            onChangeText={(value) => handleInputChange("password", value)}
          />
          <Button
            title="Guardar cambios"
            containerStyle={UserSytles.button}
            loading={state.fetchingData ? true : false}
            onPress={() => handleSaveChanges()}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default UserScreen;

const styles = StyleSheet.create({

  container: {
    elevation: 2,
    height: 200,
    width: 200,
    backgroundColor: '#efefef',
    position: 'relative',
    borderRadius: 999,
    overflow: 'hidden',
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: 'lightgrey',
    width: '100%',
    height: '25%',
  },
  uploadBtn: {
    display: 'flex',
    alignItems: "center",
    justifyContent: 'center'
  }
});
