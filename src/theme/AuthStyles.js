import { StyleSheet } from 'react-native';



export const AuthStyle = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerSecundary: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#707070B3",
        backgroundColor: "rgba(255, 255, 255, .8)",
        borderRadius: 40,
    },
    containerRegister: {
        flex: 1,
        justifyContent: "space-between",
        paddingTop: 10,
    },
    textSession: {
        color: "#2A2929",
        fontSize: 20,
        fontWeight: "500",
        textAlign: 'center',
        marginBottom: 10
    },
    input: {
        backgroundColor: "white",
        padding: 5,
        paddingLeft: 20,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: "#707070B3",
    },
    imageBackGraund: {
        flex: 1,
        padding: 20,
    },
    dividerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 5
    },
    divider: {
        height: 1,
        width: "45%",
        backgroundColor: "black",
    },
    buttonContainer: {
        width: "90%",
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'red'
    },
    createAccount: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    textCreate: {
        fontSize: 16,
        fontWeight: "500",
    },
    textDonAccount: {
        textAlign: 'center',
        paddingTop: 15,
        fontSize: 16,
        fontWeight: "500",
        paddingBottom: 16,
    },
})