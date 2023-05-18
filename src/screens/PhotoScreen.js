import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import { useNavigation, } from '@react-navigation/native';
import { useEffect, useRef, useState, useContext } from 'react';
import { Camera } from 'expo-camera';
import { Context as RegistrationContext } from '../context/RegistrationContext';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import tw from 'tailwind-react-native-classnames';

const PhotoScreen = () => {

    let cameraRef = useRef();
    const navigation = useNavigation();
    const { state, ScanIdCard, isVisibleModal } = useContext(RegistrationContext);
    const [hasCameraPermission, setHasCameraPermission] = useState();
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
    const [photo, setPhoto] = useState();
    const [imagenSeleccionada, setImagenSeleccionada] = useState(null);


    useEffect(() => {
        (async () => {
            const cameraPermission = await Camera.requestCameraPermissionsAsync();
            const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
            setHasCameraPermission(cameraPermission.status === "granted");
            setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
        })();
    }, []);

    if (hasCameraPermission === undefined) {
        return <Text>Requesting permissions...</Text>
    } else if (!hasCameraPermission) {
        return <Text>Permisos de la camara no permitido. Por favor de cambiar la configuracion.</Text>
    }
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const base64 = await FileSystem.readAsStringAsync(result.assets, {
                encoding: FileSystem.EncodingType.Base64,
            });
            ScanIdCard(`${base64}`)
            isVisibleModal();
            navigation.goBack();
        }
    };
    let takePic = async () => {
        let options = {
            quality: 1,
            base64: true,
            exif: false
        };

        let newPhoto = await cameraRef.current.takePictureAsync(options);
        setPhoto(newPhoto);

    };

    if (photo) {

        let savePhoto = () => {
            ScanIdCard(`${photo.base64}`)
            isVisibleModal();
            MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
                setPhoto(undefined);

            });


        };

        return (
            <SafeAreaView style={styles.container}>
                <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />

                <View style={[{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: '3%' }]}>
                    <Button
                        title="Cancelar"
                        titleStyle={{ fontSize: 24 }}
                        containerStyle={{ width: '45%' }}
                        buttonStyle={{ backgroundColor: '#848484' }}
                        onPress={() => setPhoto(undefined)} />
                    {hasMediaLibraryPermission
                        ?
                        <Button
                            title="Guardar"
                            titleStyle={{ fontSize: 24 }}
                            containerStyle={{ width: '45%' }}
                            buttonStyle={{ backgroundColor: '#004480' }}
                            onPress={() => savePhoto()} />
                        :
                        undefined
                    }
                </View>
            </SafeAreaView>
        );
    }

    return (
        <Camera style={styles.container} ref={cameraRef}>
            <View style={styles.buttonContainer}>
                <View style={[{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: '3%' }]}>
                    <Button
                        title="Galeria"
                        titleStyle={{ fontSize: 24 }}
                        containerStyle={{ width: '45%' }}
                        buttonStyle={{ backgroundColor: '#004480' }}
                        onPress={() => pickImage()} />
                    <Button
                        title="Tomar Fotografia"
                        titleStyle={{ fontSize: 24 }}
                        containerStyle={{ width: '45%' }}
                        buttonStyle={{ backgroundColor: '#848484' }}
                        onPress={() => takePic()} />
                </View>
            </View>
        </Camera>
    );
}

export default PhotoScreen
const styles = StyleSheet.create({
    container: {
        height: '100%',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: 'black'
    },
    buttonContainer: {
        top: '40%',
        alignSelf: 'center'
    },
    preview: {
        alignSelf: 'stretch',
        flex: 1
    }
});