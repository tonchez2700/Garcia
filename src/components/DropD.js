import React, { useContext, useState, useEffect } from 'react'
import { Text, TouchableOpacity, StyleSheet, Dimensions, ViewBase } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements'
import tw from 'tailwind-react-native-classnames'
import { Dropdown } from 'react-native-element-dropdown';
import { general } from '../theme/customTheme';
import { View } from 'react-native-web';

const { width } = Dimensions.get('window');


const DropD = ({ data, type, value, fun }) => {
    const navigation = useNavigation();
    return (

        <Dropdown
            style={styles.dropdown}
            selectedTextProps
            search={true}
            searchPlaceholder="Buscar..."
            placeholderStyle={{ color: 'gray' }}
            selectedTextStyle={{ color: 'black' }}
            placeholder={type}
            valueField="id"
            labelField="name"
            value={value}
            data={data}
            onChange={item => {
                fun(item.id)
            }}
        />
    )
}

export default DropD

const styles = StyleSheet.create({


    dropdown: {
        backgroundColor: "#FFFFFF",
        borderWidth: 0.2,
        borderColor: "#707070B3",
        borderBottomWidth: 0,
        paddingLeft: 15,
        paddingVertical: 6,
        borderRadius: 40,
        marginBottom: 22,
    },
});
