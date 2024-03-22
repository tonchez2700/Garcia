import React from 'react'
import { StatusBar } from "react-native";
import { Icon } from 'react-native-elements';
import Logo from './Logo';
import Images from '../components/assets/images';

const SimpleNavBar = () => {
    return (
        <StatusBar
            style="auto"
            backgroundColor="#1E0554" // Cambia el color de fondo de la barra de estado
            barStyle="light-content" // Cambia el estilo de los iconos y texto de la barra de estado a claro (para fondos oscuros)
        />

    )
}

export default SimpleNavBar
