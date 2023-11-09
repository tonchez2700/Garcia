import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get("window");

export const MapsStyles = StyleSheet.create({
    container: {
        flex: 2,
        position: 'relative',
    },
    Map: {
        flex: 1
    },
    seach: {
        textInputContainer: {
        },
        textInput: {
            backgroundColor: "#FFFFFF",
            borderWidth: 0.2,
            borderColor: "#707070B3",
            borderBottomWidth: 0,
            paddingHorizontal: 15,
            paddingVertical: 8,
            borderRadius: 40,
            marginBottom: 22,

        },
        predefinedPlacesDescription: {
            color: '#1faadb',
        },
    },
    containerBottonNavBar: {
        backgroundColor: '#1E0554',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 14,
        paddingBottom: 14,
    },
    textNavBar: {
        color: 'white',
        textAlign: 'center'
    },
    buttonNavBar: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft: 2
    },
    imagenNarBar: {
        width: 39,
        height: 41
    }

})