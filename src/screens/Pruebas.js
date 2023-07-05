import React, { useRef } from 'react';
import { View, Animated, StyleSheet, TouchableOpacity, Image } from 'react-native';

const Pruebas = () => {
    const rotation = useRef(new Animated.Value(0)).current;

    const startAnimation = () => {
        Animated.timing(rotation, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    };

    const interpolatedRotation = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={startAnimation} style={styles.button}>
                <Animated.View
                    style={[
                        styles.planetContainer,
                        {
                            transform: [{ rotate: interpolatedRotation }],
                        },
                    ]}
                >
                 
                </Animated.View>
            </TouchableOpacity>
        </View>
    );
};
export default Pruebas;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    planetContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        overflow: 'hidden',
    },
    planetImage: {
        width: '100%',
        height: '100%',
    },
});