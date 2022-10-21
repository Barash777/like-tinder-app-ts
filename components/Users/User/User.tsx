import {ImageBackground, StyleSheet, Text} from "react-native";
import {UserType} from "../../../api/api";


type UserPropsType = {
    user: UserType
}

export default function User({user}: UserPropsType) {

    return (
        <>
            <ImageBackground
                source={{uri: user?.image}}
                resizeMode="cover"
                style={styles.image}
                // onProgress={() => <ActivityIndicator size="large"/>}
                // onPartialLoad={() => <ActivityIndicator size="large"/>}
                borderRadius={10}
            >
                <Text style={styles.text}>{user?.firstName} {user?.lastName}</Text>
                <Text style={styles.text}>{user?.gender}, {user?.age}</Text>
                <Text style={styles.text}>weight: {user?.weight}, height: {user?.height}</Text>
            </ImageBackground>

        </>
    )
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        justifyContent: "flex-end",
    },
    text: {
        color: "white",
        fontSize: 20,
        lineHeight: 40,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#000000c0",
        paddingHorizontal: 10,
        marginHorizontal: 10,
        borderRadius: 10
    }
});