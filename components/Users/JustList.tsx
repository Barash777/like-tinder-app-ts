import {FlatList, ImageBackground, ListRenderItem, StyleSheet, Text, View} from "react-native";
import {UserType} from "../../api/api";
import {HEIGHT, PADDING, WIDTH} from "../../App";

const COLUMNS_NUMBER = 1

type JustListPropsType = {
    users: UserType[]
}
const JustList = ({users}: JustListPropsType) => {
    const render: ListRenderItem<UserType> = ({item}) => {
        return <View key={item.id} style={styles.item}>
            <ImageBackground
                source={{uri: item.image}}
                resizeMode="cover"
                style={styles.image}
                // onProgress={() => <ActivityIndicator />}
                borderRadius={10}
            >
                <Text style={styles.text}>{item.firstName} {item.lastName}</Text>
                <Text style={styles.text}>{item.gender}, {item.age}</Text>
            </ImageBackground>

        </View>
    }

    // show just list
    return (
        <FlatList
            numColumns={COLUMNS_NUMBER}
            // columnWrapperStyle={{justifyContent: 'space-between'}}
            data={users}
            renderItem={render}
            ListEmptyComponent={() => {
                return <View><Text>List is empty</Text></View>
            }}
        />
    )
}

export default JustList

// styles
const styles = StyleSheet.create({
    item: {
        flex: 1,
        width: (WIDTH - PADDING * 2) / COLUMNS_NUMBER,
        height: (HEIGHT * 0.75),
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