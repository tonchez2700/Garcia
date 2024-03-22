import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView } from "react-native";
import { Button } from "react-native-elements";
import { AuthStyle } from "../../theme/AuthStyles";
import { useNavigation } from "@react-navigation/native";
import { Context as AuthContext } from "../../context/AuthContext";
import { RegistrationSchema } from "../../config/schemas";
import useHandleOnChangeTextInput from "../../hooks/useHandleOnChangeTextInput";
import Images from "../../components/assets/images";
import ButtonFrom from "../Forms/ButtonFrom";

const Registration = ({ fetchingData, id, stateView }) => {

    const { state, register } = useContext(AuthContext);
    const [inputState, handleInputChange] = useHandleOnChangeTextInput(RegistrationSchema);
    const navigation = useNavigation();
    const [showPassword, setShowPassword] = useState(false);
    return (
            <View style={{ flex: 1, width: '100%' }}>
                <Image source={Images.garciaLogo} style={AuthStyle.ImagenLogo} />
                <Text style={[AuthStyle.TextAuth, { fontSize: 18, marginBottom: 20 }]}>Crea tu cuenta</Text>
                <TextInput
                    maxLength={15}
                    value={inputState.name}
                    style={AuthStyle.inputR}
                    placeholder="Nombre(s)"
                    onChangeText={(value) => handleInputChange(value, "name")}
                />
                <TextInput
                    maxLength={15}
                    value={inputState.paternal_surname}
                    style={AuthStyle.inputR}
                    placeholder="Primer apellido"
                    onChangeText={(value) => handleInputChange(value, "paternal_surname")}
                />
                <TextInput
                    maxLength={15}
                    value={inputState.maternal_surname}
                    style={AuthStyle.inputR}
                    placeholder="Segundo apellido"
                    onChangeText={(value) => handleInputChange(value, "maternal_surname")}
                />
                <TextInput
                    maxLength={50}
                    value={inputState.postal_code}
                    placeholder="Código postal"
                    style={AuthStyle.inputR}
                    keyboardType="number-pad"
                    autoCapitalize="none"
                    onChangeText={(value) => handleInputChange(value, "postal_code")}
                />
                <TextInput
                    maxLength={50}
                    value={inputState.email}
                    placeholder="Correo"
                    style={AuthStyle.inputR}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={(value) => handleInputChange(value, "email")}
                />
                <TextInput
                    maxLength={50}
                    value={inputState.phone}
                    placeholder="Teléfono "
                    style={AuthStyle.inputR}
                    keyboardType="number-pad"
                    autoCapitalize="none"
                    onChangeText={(value) => handleInputChange(value, "phone")}
                />
                <TextInput
                    maxLength={50}
                    value={inputState.password}
                    placeholder="Contraseña"
                    style={AuthStyle.inputR}
                    secureTextEntry={true}
                    onChangeText={(value) => handleInputChange(value, "password")}
                />
                <TextInput
                     maxLength={50}
                    value={inputState.password_confirmation}
                    style={AuthStyle.inputR}
                    placeholder="Confirmar contraseña"
                    secureTextEntry={true}
                    onChangeText={(value) => handleInputChange(value, "password_confirmation")}
                />
                <View style={{ marginBottom: 15, padding: 10 }}>
                    <Button
                        title={'Crea tu cuenta'}
                        titleStyle={{ color: '#FFF' }}
                        buttonStyle={{ backgroundColor: '#629DF6', borderRadius: 23 }}
                        onPress={() => { register(inputState) }} />
                </View>
                <Text style={{ fontSize: 16, fontWeight: "600", textAlign: 'center' }}>
                    ¿Tienes una cuenta?
                </Text>
                <View style={{ marginBottom: 40, padding: 10 }}>
                    <Button
                        title={'Inicia sesión'}
                        titleStyle={{ color: 'black' }}
                        buttonStyle={{ backgroundColor: '#FFF', borderRadius: 23 }}
                        loading={fetchingData ? true : false}
                        onPress={() => stateView(1)} />
                </View>
            </View>
    )
}

export default Registration
