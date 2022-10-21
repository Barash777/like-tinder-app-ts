import {Dimensions, ImageBackground, StyleSheet, Text, View} from "react-native";
import {UserType} from "../../../api/api";

const {width, height} = Dimensions.get('screen')
const WIDTH = width
const HEIGHT = height
const PADDING = 20
const COLUMNS_NUMBER = 1

type UserPropsType = {
    user: UserType
}

export default function User({user}: UserPropsType) {
    return (
        <View style={styles.userCard}>
            <ImageBackground
                source={{uri: user.image}}
                resizeMode="cover"
                style={styles.image}
                // onProgress={() => <ActivityIndicator size="large"/>}
                // onPartialLoad={() => <ActivityIndicator size="large"/>}
                borderRadius={10}
            >
                <Text style={styles.text}>{user.firstName} {user.lastName}</Text>
                <Text style={styles.text}>{user.gender}, {user.age}</Text>
            </ImageBackground>

        </View>
    )
}

const styles = StyleSheet.create({
    userCard: {
        flex: 1,
        width: (WIDTH - PADDING * 2) / COLUMNS_NUMBER,
        height: (HEIGHT * 0.5),
        marginVertical: 10,
        borderWidth: 1,
        borderRadius: 10,
        // shadowColor: 'black',
        // shadowOpacity: 0.7,
        // shadowOffset: {width: 5, height: -5},
    },
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