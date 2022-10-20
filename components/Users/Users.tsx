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
import {userAPI} from "../../api/api";

const {width, height} = Dimensions.get('screen')
const WIDTH = width
const HEIGHT = height
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

type GirlsType = {
    description: string
    "image-url": string
}
const girls: GirlsType[] = [{
    "description": "Lady with a Teddy",
    "image-url": "https://images.pexels.com/photos/3348748/pexels-photo-3348748.jpeg"
},
    {
        "description": "Girl with camera",
        "image-url": "https://images.pexels.com/photos/3812944/pexels-photo-3812944.jpeg"
    },
    {
        "description": "Beautiful Girl with Glasses",
        "image-url": "https://images.pexels.com/photos/2100063/pexels-photo-2100063.jpeg"
    },
    {
        "description": "Redhead with frackles",
        "image-url": "https://images.pexels.com/photos/3228213/pexels-photo-3228213.jpeg"
    },
    {
        "description": "Girl in black dress",
        "image-url": "https://images.pexels.com/photos/1385472/pexels-photo-1385472.jpeg"
    },
    {
        "description": "Girl Sitting on Chair",
        "image-url": "https://images.pexels.com/photos/4725133/pexels-photo-4725133.jpeg"
    }
]

export default function Users() {
    const [init, setInit] = useState<InitType>('loading');
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        // setTimeout(() => {
        userAPI
            .getUsers()
            .then(users => {
                setUsers(users)
                // setUsers(girls)
                setInit('success')
            })
            .catch(e => setInit('failed'))
        // }, 3000)
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

    const render: ListRenderItem<User> = ({item}) => {
        return <View key={item.id} style={styles.item}>
            <ImageBackground
                source={{uri: item.image}}
                resizeMode="cover"
                style={styles.image}
                // onProgress={() => <ActivityIndicator size="large"/>}
                // onPartialLoad={() => <ActivityIndicator size="large"/>}
                borderRadius={10}
            >
                <Text style={styles.text}>{item.firstName} {item.lastName}, {item.age}</Text>
            </ImageBackground>

        </View>
    }

    const renderGirls: ListRenderItem<GirlsType> = ({item}) => {
        return <View key={item.description} style={styles.item}>
            <ImageBackground
                source={{uri: item["image-url"]}}
                resizeMode="cover"
                style={styles.image}
                borderRadius={10}
                // onProgress={() => <ActivityIndicator size="large"/>}
                // onPartialLoad={() => <ActivityIndicator size="large"/>}
            >
                <Text style={styles.text}>{item.description}</Text>
            </ImageBackground>

        </View>
    }


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
        // backgroundColor: 'pink',
        width: (WIDTH - PADDING * 2) / COLUMNS_NUMBER,
        height: (HEIGHT * 0.75),
        marginVertical: 10,
        borderWidth: 1,
        borderRadius: 10,
        // padding: 10,
        // shadowColor: 'black',
        // shadowOpacity: 0.7,
        // shadowOffset: {width: 5, height: -5},
    },
    image: {
        flex: 1,
        justifyContent: "flex-end",
        // background: transparent,
        // background: (to bottom, rgba(255,255,255,1) 30%,rgba(0,0,0,0) 100%);
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
        // borderBottomLeftRadius: 20,
        // borderBottomRightRadius: 20,
        // borderTopEndRadius: 20,
    }
});