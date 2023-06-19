import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get("window");

export const UserSytles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 20,
        backgroundColor: "#1E0554",
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
    },
    userImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        margin: 20,
    },
    textInput: {
        paddingLeft: 10,
        fontSize: 14,
        color: "#fff",
        marginTop: 10
    },
    input: {
        backgroundColor: "white",
        paddingLeft: 15,
        borderRadius: 40,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: "#707070B3",
    },
    button: {
        marginVertical: 20,
        borderRadius: 20
    }
})