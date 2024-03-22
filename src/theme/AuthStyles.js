import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get("window");

export const AuthStyle = StyleSheet.create({
    container: {
        flex: 1,
    },
    ImageBackGraund: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height + 50,
    },
    ContainerWhite: {
        position: "absolute",
        top: "20%",
        left: "50%",
        elevation: 5,
        transform: [{ translateX: -(width * 0.4) },
        { translateY: -90 }],
        width: width * 0.8,
        borderWidth: 1,
        borderColor: "#707070B3",
        backgroundColor: "rgba(255, 255, 255, .8)",
        borderRadius: 20,
        paddingVertical: 28,
        paddingHorizontal: 15,
    },
    ImagenLogo: {
        height: 60,
        width: 245,
        marginBottom: 30,
        alignSelf: 'center'
    },
    TextAuth: {
        fontSize: 18,
        fontWeight: '700',
        color: '#393939',
        marginBottom: 27,
        textAlign: 'center',
    },
    input: {
        backgroundColor: "#FFFFFF",
        borderWidth: 0.2,
        borderColor: "#707070B3",
        borderBottomWidth: 0,
        paddingLeft: 15,
        borderRadius: 40
    },
    inputR: {
        backgroundColor: "#FFFFFF",
        borderWidth: 0.2,
        borderColor: "#707070B3",
        borderBottomWidth: 0,
        paddingLeft: 15,
        paddingVertical: 8,
        borderRadius: 40,
        marginBottom: 22
    },
    containerRegister: {
        flex: 1,
        width: '100%'
    },
    textSession: {
        color: "#2A2929",
        fontSize: 20,
        fontWeight: "500",
        textAlign: 'center',
        marginBottom: 10
    },
    dividerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 5
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