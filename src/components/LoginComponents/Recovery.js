import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import tw from "tailwind-react-native-classnames";
import { Icon, Button, SocialIcon, Divider } from "react-native-elements";
import { AuthStyle } from "../../theme/AuthStyles";
import { useNavigation } from "@react-navigation/native";

const Recovery = ({ onChangeText, signin, fetchingData, id, stateView }) => {

    const navigation = useNavigation();
    const [showPassword, setShowPassword] = useState(false);
    return (
        <View style={{ width: "100%" }}>
            <Text style={AuthStyle.textSession}>Recuperar contraseña</Text>
            <TextInput
                maxLength={15}
                style={AuthStyle.inputR}
                placeholder="Introduce tu correo"
                onChangeText={(value) => onChangeText(value, "password")}
            />
            <Button
                title={'Enviar'}
                titleStyle={{ color: '#FFF' }}
                buttonStyle={{ backgroundColor: '#629DF6', borderRadius: 23 }}
                onPress={() => stateView(1)} />
            <Text style={AuthStyle.textDonAccount}>Volver a inicio de sesión</Text>
            <View style={{ marginBottom: 15 }}>
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
