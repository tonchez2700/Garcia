import React, { useState, useEffect, useContext } from "react";
import {
    StyleSheet, View, Text, TextInput, ScrollView,
    Image, TouchableOpacity, Platform,
} from "react-native";
import { Input, Button } from 'react-native-elements'
import Images from "../components/assets/images";
import * as ImagePicker from 'expo-image-picker';
import { UserSytles } from "../theme/UserSytles";

const ImagenPerfil = ({ picture, onChangeText }) => {

    const [image, setImage] = useState(null);
    const [imageChanged, setImageChanged] = useState(false);

    useEffect(() => {
        setImage(picture);
    }, [picture]);

    const checkForCameraRollPermission = async () => {
        const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            console.log("Please grant camera roll permissions inside your system's settings");
        } else {
            console.log('Media Permissions are granted')
        }
    }
    const addImage = async () => {
        let _image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            base64: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!_image.canceled) {
            onChangeText('picture', `data:image/jpeg;base64,${_image.assets[0].base64}`);
            setImage('data:image/jpeg;base64,' + _image.assets[0].base64);
        }
    };

    useEffect(() => {
        checkForCameraRollPermission()
    }, []);


    return (
        <View>
            {
                image != null && image != '' ?
                    <View style={styles.container}>
                        {
                            <Image style={UserSytles.userImage} source={{ uri: image }} />
                        }
                        <View style={styles.uploadBtnContainer}>
                            <TouchableOpacity onPress={() => addImage()} style={styles.uploadBtn} >
                                <Text>Editar Imagen</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    :
                    <View style={styles.container}>
                        {
                            <Image style={UserSytles.userImage} source={Images.perfil} />
                        }
                        <View style={styles.uploadBtnContainer}>
                            <TouchableOpacity onPress={() => addImage()} style={styles.uploadBtn} >
                                <Text>Editar Imagen</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
            }
        </View>

    )
}

export default ImagenPerfil

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
})
