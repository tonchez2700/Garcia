import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import { Button } from "react-native-elements";
import { AuthStyle } from "../../theme/AuthStyles";
import { useNavigation } from "@react-navigation/native";
import Images from "@assets/images";
import ButtonFrom from "../Forms/ButtonFrom";

const Registration = ({ onChangeText, signin, fetchingData, id, stateView }) => {

    const navigation = useNavigation();
    const [showPassword, setShowPassword] = useState(false);
    return (
        <View style={AuthStyle.containerRegister}>
            <Image source={Images.garciaLogo} style={AuthStyle.ImagenLogo} />
            <Text style={[AuthStyle.TextAuth, { fontSize: 18, marginBottom: 20 }]}>Crea tu cuenta</Text>

            <TextInput
                maxLength={50}
                placeholder="Correo"
                style={AuthStyle.inputR}
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={(value) => onChangeText(value, "email")}
            />
            <TextInput
                maxLength={15}
                style={AuthStyle.inputR}
                placeholder="Nombre"
                onChangeText={(value) => onChangeText(value, "password")}
            />
            <TextInput
                maxLength={50}
                placeholder="Contraseña"
                style={AuthStyle.inputR}
                secureTextEntry={true}
                onChangeText={(value) => onChangeText(value, "email")}
            />
            <TextInput
                maxLength={15}
                style={AuthStyle.inputR}
                placeholder="Contraseña"
                secureTextEntry={true}
                onChangeText={(value) => onChangeText(value, "password")}
            />
            <View style={{ marginBottom: 15, padding: 10 }}>
                <Button
                    title={'Crea tu cuenta'}
                    titleStyle={{ color: '#FFF' }}
                    buttonStyle={{ backgroundColor: '#629DF6', borderRadius: 23 }}
                    onPress={() => stateView(1)} />
            </View>
            <Text style={{ fontSize: 16, fontWeight: "600", textAlign: 'center' }}>
                ¿Tienes una cuenta?, Inicia sesión
            </Text>
            <View style={{ marginBottom: 15, padding: 10 }}>
                <Button
                    title={'Inicia sesión'}
                    titleStyle={{ color: 'black' }}
                    buttonStyle={{ backgroundColor: '#FFF', borderRadius: 23 }}
                    onPress={() => stateView(1)} />
            </View>
        </View>
    )
}

export default Registration
