import { StyleSheet } from 'react-native';



export const CardSytles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        backgroundColor: '#FFF',
        height: '20%',
        width: '90%',
        top: "65%",
        alignSelf: 'center',
        elevation: 8,
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'stretch',
    }
})
