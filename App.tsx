// import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert,
} from 'react-native';
import {useState} from "react";
import Users from "./components/Users/Users";

// const {width} = Dimensions.get('screen')
// const WIDTH = width
// const PADDING = 20
// const COLUMNS_NUMBER = 1


export default function App() {
    const [showUsers, setShowUsers] = useState(false);

    // button click handler
    const onPress = () => {
        setShowUsers(prev => !prev)
    }

    return (
        <View style={styles.container}>
            {showUsers
                ? <Users/>
                : <TouchableOpacity
                    style={styles.button}
                    onPress={onPress}
                    activeOpacity={0.4}
                    onLongPress={() => Alert.alert('Just touch it, don\'t hold!')}
                    delayLongPress={1000}
                >
                    <Text style={styles.buttonText}>Let's make your night</Text>
                </TouchableOpacity>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    button: {
        alignItems: "center",
        color: '#910303',
        backgroundColor: "#fa785c",
        padding: 10,
        margin: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#000000',
        fontWeight: 'bold'
    },
});