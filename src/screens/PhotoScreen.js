import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import { useNavigation, } from '@react-navigation/native';
import CameraRoll from '@react-native-community/cameraroll';
import { useEffect, useRef, useState, useContext } from 'react';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { Context as RegistrationContext } from '../context/RegistrationContext';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import tw from 'tailwind-react-native-classnames';

const PhotoScreen = () => {

    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
    const [capturedPhotos, setCapturedPhotos] = useState([]);
    const [isRecording, setIsRecording] = useState(false);
    const [recording, setRecording] = useState(null);

    const cameraRef = useRef(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(status === 'granted');
        })();
    }, []);

    const takePicture = async () => {
        if (cameraRef.current) {
            const { uri } = await cameraRef.current.takePictureAsync();
            saveMedia(uri, 'photo');
        }
    };

    const startRecording = async () => {
        if (cameraRef.current) {
            const { uri, codec = 'mp4' } = await cameraRef.current.recordAsync();
            setRecording({ uri, codec });
            setIsRecording(true);
        }
    };

    const stopRecording = () => {
        if (cameraRef.current && isRecording) {
            cameraRef.current.stopRecording();
            setIsRecording(false);
        }
    };

    const saveMedia = async (mediaUri, mediaType) => {
        try {
            await CameraRoll.save(mediaUri, mediaType);
            if (mediaType === 'photo') {
                setCapturedPhotos((prevPhotos) => [...prevPhotos, mediaUri]);
            }
        } catch (error) {
            console.log('Error saving media: ', error);
        }
    };

    const toggleCameraType = () => {
        setType((prevType) =>
            prevType === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
        );
    };

    const toggleFlashMode = () => {
        setFlashMode((prevMode) =>
            prevMode === Camera.Constants.FlashMode.off
                ? Camera.Constants.FlashMode.on
                : Camera.Constants.FlashMode.off
        );
    };

    if (hasCameraPermission === null) {
        return <View />;
    } else if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={type} flashMode={flashMode} ref={cameraRef}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={toggleFlashMode}>
                        <Ionicons
                            name={flashMode === Camera.Constants.FlashMode.on ? 'flash' : 'flash-off'}
                            size={30}
                            color="white"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={isRecording ? stopRecording : startRecording}>
                        <Ionicons
                            name={isRecording ? 'videocam-off' : 'videocam'}
                            size={30}
                            color={isRecording ? 'red' : 'white'}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={takePicture}>
                        <Ionicons name="camera" size={30} color="white" />
                    </TouchableOpacity>
                </View>
            </Camera>
            {/* Resto del código */}
        </View>
    );
};

export default PhotoScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
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