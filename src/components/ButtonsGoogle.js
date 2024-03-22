import React, { useState, useContext, useEffect } from "react";
import { Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Images from "../components/assets/images";
const ButtonsGoogle = ({ onPress }) => {


    return (
        <TouchableOpacity
            style={{ ...styles.googleStyle }}
            onPress={() => onPress('Google')} >
            <Image
                source={Images.iconGoogle}
                style={{ ...styles.imageIconStyle }}
            />
            <Text style={{ ...styles.textStyle }}>
                Continuar con Google
            </Text>
        </TouchableOpacity>
    )
}

export default ButtonsGoogle
const styles = StyleSheet.create({
    googleStyle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff",
        borderWidth: 0.5,
        borderColor: "#fff",
        height: 50,
        borderRadius: 28,
        margin: 5
    },
    imageIconStyle: {
        marginLeft: 10,
        height: 35,
        width: 35,
        resizeMode: "stretch"
    },
    textStyle: {
        color: "#575757",
        marginLeft: 15,
        marginRight: 20
    }
});