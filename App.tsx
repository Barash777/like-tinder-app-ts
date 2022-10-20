// import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    FlatList,
    ListRenderItem,
    Dimensions
} from 'react-native';
import {useEffect, useState} from "react";
import {userAPI} from "./api/api";

const {width} = Dimensions.get('screen')
const WIDTH = width
const PADDING = 20
const COLUMNS_NUMBER = 1

export type User = {
    id: number;
    firstName: string;
    lastName: string;
    maidenName: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    username: string;
    password: string;
    birthDate: string;
    image: string;
    bloodGroup: string;
    height: number;
    weight: number;
    eyeColor: string;
    hair: UserHair;
    domain: string;
    ip: string;
    address: UserAddress;
    macAddress: string;
    university: string;
    bank: UserBank;
    company: UserCompany;
    ein: string;
    ssn: string;
    userAgent: string;
}
export type UserHair = {
    color: string;
    type: string;
}
export type UserAddressCoordinates = {
    lat: number;
    lng: number;
}
export type UserAddress = {
    address: string;
    city: string;
    coordinates: UserAddressCoordinates;
    postalCode: string;
    state: string;
}
export type UserBank = {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
}
export type UserCompanyAddressCoordinates = {
    lat: number;
    lng: number;
}
export type UserCompanyAddress = {
    address: string;
    city: string;
    coordinates: UserCompanyAddressCoordinates;
    postalCode: string;
    state: string;
}
export type UserCompany = {
    address: UserCompanyAddress;
    department: string;
    name: string;
    title: string;
}

type InitType = 'loading' | 'success' | 'failed'

export default function App() {
    const [init, setInit] = useState<InitType>('loading');
    const [users, setUsers] = useState<User[]>([]);
    const [showUsers, setShowUsers] = useState(false);

    useEffect(() => {
        // setTimeout(() => {
        userAPI
            .getUsers()
            .then(users => {
                setUsers(users)
                setInit('success')
            })
            .catch(e => setInit('failed'))
        // }, 2000)
    }, []);

    // button click handler
    const onPress = () => {
        setShowUsers(prev => !prev)
    }

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

    const render: ListRenderItem<User> = ({item}) => {
        return <View key={item.id} style={styles.item}>
            <Text>{item.username}</Text>
        </View>
    }

    return (
        <View style={styles.container}>
            {showUsers
                ? <FlatList
                    numColumns={COLUMNS_NUMBER}
                    // columnWrapperStyle={{justifyContent: 'space-between'}}
                    data={users}
                    renderItem={render}
                    ListEmptyComponent={() => {
                        return <View><Text>List is empty</Text></View>
                    }}
                />
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
    tinyLogo: {
        width: 50,
        height: 50,
    },
    item: {
        backgroundColor: 'pink',
        width: (WIDTH - PADDING * 2) / COLUMNS_NUMBER - 5,
        height: (WIDTH - PADDING * 2) / COLUMNS_NUMBER - 40,
        marginVertical: 10,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    }
});