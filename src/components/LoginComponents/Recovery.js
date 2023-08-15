import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import tw from "tailwind-react-native-classnames";
import { Icon, Button, SocialIcon, Divider } from "react-native-elements";
import { AuthStyle } from "../../theme/AuthStyles";
import { useNavigation } from "@react-navigation/native";
import { Context as AuthContext } from "../../context/AuthContext";
import { RecoverySchema } from "../../config/schemas";
import useHandleOnChangeTextInput from "../../hooks/useHandleOnChangeTextInput";

const Recovery = ({ signin, fetchingData, id, stateView }) => {

    const navigation = useNavigation();
    const { state, passwordRecovery } = useContext(AuthContext);
    const [inputState, handleInputChange] = useHandleOnChangeTextInput(RecoverySchema);

    return (
        <View style={{ width: "100%" }}>
            <Text style={AuthStyle.textSession}>Recuperar contraseña</Text>
            <TextInput
                value={inputState.email}
                style={AuthStyle.inputR}
                keyboardType="email-address"
                placeholder="Introduce tu correo"
                onChangeText={(value) => handleInputChange(value, "email")}
            />
            <Button
                title={'Enviar'}
                titleStyle={{ color: '#FFF' }}
                loading={fetchingData ? true : false}
                buttonStyle={{ backgroundColor: '#629DF6', borderRadius: 23 }}
                onPress={() => passwordRecovery(inputState.email)} />

            <Text style={AuthStyle.textDonAccount}>Volver a inicio de sesión</Text>
            <View style={{ marginBottom: 15, marginTop: 45 }}>
                <Text style={AuthStyle.textDonAccount}>¿No tienes una cuenta?</Text>
                <Button
                    title={'Crea una cuenta'}
                    titleStyle={{ color: 'black' }}
                    buttonStyle={{ backgroundColor: '#FFF', borderRadius: 23 }}
                    onPress={() => stateView(2)} />
            </View>
        </View>
    )
}

export default Recovery
