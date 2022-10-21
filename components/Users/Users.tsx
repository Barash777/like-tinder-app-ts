import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    ImageBackground,
    ListRenderItem,
    StyleSheet,
    Text,
    View
} from "react-native";
import {useEffect, useState} from "react";
import {userAPI, UserType} from "../../api/api";
import User from "./User/User";

const {width, height} = Dimensions.get('screen')
const WIDTH = width
const HEIGHT = height
const PADDING = 20
const COLUMNS_NUMBER = 1

type InitType = 'loading' | 'success' | 'failed'


export default function Users() {
    const [init, setInit] = useState<InitType>('loading');
    const [users, setUsers] = useState<UserType[]>([]);
    const [userNumber, setUserNumber] = useState(0);

    useEffect(() => {
        userAPI
            .getUsers()
            .then(users => {
                setUsers(users)
                // setUsers(girls)
                setInit('success')
            })
            .catch(e => setInit('failed'))
    }, []);

    // check for INIT loading
    if (init === 'loading') {
        return <View style={styles.container}>
            <ActivityIndicator size="large"/>
        </View>
    }

    // check for INIT failed
    if (init === 'failed') {
        return <View style={styles.container}>
            <Text>Something went wrong! Please, try to reset app!</Text>
        </View>
    }

    // const usersJSX = users.map(u => <User key={u.id} user={u}/>)
    // return usersJSX
    if (users) {
        return <User user={users[0]}/>
    }

    return <View>
        <Text>There are not suitable user</Text>
    </View>
}


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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20
    },
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