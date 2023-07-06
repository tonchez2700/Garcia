import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get("window");

export const MapsStyles = StyleSheet.create({
    container: {
        flex: 1,
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