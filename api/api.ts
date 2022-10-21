export const userAPI = {
    getUsers() {
        return fetch('https://dummyjson.com/users?limit=100')
            .then(res => res.json())
            .then(json => json.users)
    }
}

export type UserType = {
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
    hair: UserHairType;
    domain: string;
    ip: string;
    address: UserAddressType;
    macAddress: string;
    university: string;
    bank: UserBankType;
    company: UserCompanyType;
    ein: string;
    ssn: string;
    userAgent: string;
}
export type UserHairType = {
    color: string;
    type: string;
}
export type UserAddressCoordinatesType = {
    lat: number;
    lng: number;
}
export type UserAddressType = {
    address: string;
    city: string;
    coordinates: UserAddressCoordinatesType;
    postalCode: string;
    state: string;
}
export type UserBankType = {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
}
export type UserCompanyAddressCoordinatesType = {
    lat: number;
    lng: number;
}
export type UserCompanyAddressType = {
    address: string;
    city: string;
    coordinates: UserCompanyAddressCoordinatesType;
    postalCode: string;
    state: string;
}
export type UserCompanyType = {
    address: UserCompanyAddressType;
    department: string;
    name: string;
    title: string;
}

/*
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
*/