import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useEffect, useState} from "react";
import {userAPI, UserType} from "../../api/api";
import {SearchParametersType} from "../../App";
// import JustList from "./JustList";
import User from "./User/User";
import {HEIGHT, PADDING, WIDTH} from "../../common/screen";
import Icon from "react-native-vector-icons/FontAwesome";


type InitType = 'loading' | 'success' | 'failed'

type UsersPropsType = {
    searchParams: SearchParametersType
}

export default function Users({searchParams}: UsersPropsType) {
    const [init, setInit] = useState<InitType>('loading');
    const [users, setUsers] = useState<UserType[]>([]);
    const [userNumber, setUserNumber] = useState(0);

    const onPressHandler = () => {
        setUserNumber(prev => prev + 1)
    }

    // buttons
    const iconButton = (iconName: string, color: string) => {
        return (
            <TouchableOpacity activeOpacity={0.4} onPress={onPressHandler}>
                <Icon name={iconName} size={30} color={color}/>
            </TouchableOpacity>
        );
    }

    useEffect(() => {
        userAPI
            .getUsers()
            .then(users => {
                setUsers(filterUsers(users, searchParams))
                setInit('success')
            })
            .catch(() => {
                setInit('failed')
            })
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

    // check users length
    if (users.length) {
        // console.log(users)

        // check userNumber
        if (userNumber >= users.length) {
            return <View style={styles.container}>
                <Text>You've already seen all user</Text>
            </View>
        }

        // show 1 user
        return <View style={styles.container}>
            <Text>Look carefully! Maybe it's your destiny</Text>
            <View style={styles.userCard}>
                <User user={users[userNumber]}/>
            </View>
            <View style={styles.inOneRow}>
                <View style={{marginHorizontal: 20}}>{iconButton('ban', 'blue')}</View>
                <View style={{marginHorizontal: 20}}>{iconButton('heart', 'red')}</View>
            </View>
        </View>

        // return <JustList users={users}/>
    }

    return <View style={styles.container}>
        <Text>There are not suitable user</Text>
    </View>
}


// Filter users by search params
const filterUsers = (users: UserType[], searchParams: SearchParametersType) => {
    return users.filter(u => {
        return ((u.gender === searchParams.gender || searchParams.gender === 'both') &&
            (searchParams.minAge === 0 || u.age >= searchParams.minAge) &&
            (searchParams.maxAge === 0 || u.age <= searchParams.maxAge) &&

            (searchParams.minWeight === 0 || u.weight >= searchParams.minWeight) &&
            (searchParams.maxWeight === 0 || u.weight <= searchParams.maxWeight) &&

            (searchParams.minHeight === 0 || u.height >= searchParams.minHeight) &&
            (searchParams.maxHeight === 0 || u.height <= searchParams.maxHeight))
    })
}

// styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20
    },

    userCard: {
        // flex: 1,
        width: (WIDTH - PADDING * 2),
        height: (HEIGHT * 0.75),
        marginVertical: 10,
        borderWidth: 1,
        borderRadius: 10,
        // shadowColor: 'black',
        // shadowOpacity: 0.7,
        // shadowOffset: {width: 5, height: -5},
    },

    inOneRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 40
        // justifyContent: 'space-between',
        // alignItems: 'flex-end'
    },
});