import { useEffect, useRef, useState, useContext } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import { useNavigation, } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import { Video } from 'expo-av';
import { shareAsync } from 'expo-sharing';
import { Context as RegistrationContext } from '../context/RegistrationContext';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';

const PhotoScreen = () => {

    let cameraRef = useRef();
    const [hasCameraPermission, setHasCameraPermission] = useState();
    const [hasMicrophonePermission, setHasMicrophonePermission] = useState();
    const [isRecording, setIsRecording] = useState(false);
    const [video, setVideo] = useState();
    const navigation = useNavigation();
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
    const { state, isVisibleModal } = useContext(RegistrationContext);
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
    const [photo, setPhoto] = useState();
    const [imagenSeleccionada, setImagenSeleccionada] = useState(null);


    useEffect(() => {
        (async () => {
            const cameraPermission = await Camera.requestCameraPermissionsAsync();
            const microphonePermission = await Camera.requestMicrophonePermissionsAsync();
            const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
            setHasCameraPermission(cameraPermission.status === "granted");
            setHasMicrophonePermission(microphonePermission.status === "granted");
            setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
        })();
    }, []);

    if (hasCameraPermission === undefined || hasMicrophonePermission === undefined) {
        return <Text>Requestion permissions...</Text>
    } else if (!hasCameraPermission) {
        return <Text>Permission for camera not granted.</Text>
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
            // ScanIdCard(`${base64}`)
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
                            buttonStyle={{ backgroundColor: '#1E0554' }}
                            onPress={() => savePhoto()} />
                        :
                        undefined
                    }
                </View>
            </SafeAreaView>
        );
    }
    let recordVideo = () => {
        setIsRecording(true);
        let options = {
            quality: "1080p",
            base64: true,
            maxDuration: 60,
            mute: false
        };

        cameraRef.current.recordAsync(options).then((recordedVideo) => {
            setVideo(recordedVideo);
            setIsRecording(false);
        });
    };
    let stopRecording = () => {
        setIsRecording(false);
        cameraRef.current.stopRecording();
    };
    if (video) {
        let shareVideo = () => {
            shareAsync(video.uri).then(() => {
                setVideo(undefined);
            });
        };

        let saveVideo = () => {
            MediaLibrary.saveToLibraryAsync(video.uri).then(() => {
                setVideo(undefined);
            });
        };

        return (
            <SafeAreaView style={styles.container}>
                <Video
                    style={styles.video}
                    source={{ uri: video.uri, overrideFileExtensionAndroid: 'mp4' }}
                    useNativeControls
                    resizeMode='cover'
                    isLooping
                />
                <View style={[{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: '3%' }]}>
                    {hasMediaLibraryPermission
                        ?
                        <Button
                            title="Cancelar"
                            titleStyle={{ fontSize: 24 }}
                            containerStyle={{ width: '45%' }}
                            buttonStyle={{ backgroundColor: '#848484' }}
                            onPress={saveVideo} />
                        :
                        undefined
                    }
                    <Button
                        title="Guardar"
                        titleStyle={{ fontSize: 24 }}
                        containerStyle={{ width: '45%' }}
                        buttonStyle={{ backgroundColor: '#1E0554' }}
                        onPress={() => setVideo(undefined)} />
                </View>
            </SafeAreaView>
        );
    }
    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={type} flashMode={flashMode} ref={cameraRef}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => pickImage()}>
                        <Icon
                            name="md-images"
                            size={30}
                            type='ionicon'
                            color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => toggleFlashMode()}>
                        <Icon
                            size={30}
                            name={flashMode === Camera.Constants.FlashMode.on ? 'flash' : 'flash-off'}
                            type='ionicon'
                            color={'white'} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={isRecording ? stopRecording : recordVideo}>
                        <Icon
                            size={30}
                            name={isRecording ? 'videocam-off' : 'videocam'}
                            type='MaterialIcons'
                            color={isRecording ? 'red' : 'white'} />
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                        <Icon
                            name={isFrontCamera ? 'camera-reverse' : 'camera'}
                            size={30}
                            type='ionicon'
                            color="white" />
                    </TouchableOpacity> */}
                    <TouchableOpacity style={styles.button} onPress={() => takePic()}>
                        <Icon
                            name="camera"
                            size={30}
                            type='ionicon'
                            color="white" />
                    </TouchableOpacity>
                </View>
            </Camera >
            {/* Resto del código */}
        </View >
    );
}

export default PhotoScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
    },
    preview: {
        alignSelf: 'stretch',
        flex: 1
    },
    video: {
        flex: 1,
        alignSelf: "stretch"
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 20,
    },
    button: {
        padding: 10,
    },
});