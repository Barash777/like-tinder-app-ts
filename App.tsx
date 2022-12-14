import {
    Alert,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useState} from "react";
import Users from "./components/Users/Users";


// type GenderType = 'male' | 'female' | 'both'
export type SearchParametersType = {
    gender: string | undefined
    minAge: number
    maxAge: number
    minHeight: number
    maxHeight: number
    minWeight: number
    maxWeight: number
}

export default function App() {
    const [isShowUsers, setIsShowUsers] = useState(false);
    const [isShowSettings, setIsShowSettings] = useState(false);
    const [searchParameters, setSearchParameters] = useState<SearchParametersType>({
        gender: 'both',
        minAge: 0,
        maxAge: 0,
        minHeight: 0,
        maxHeight: 0,
        minWeight: 0,
        maxWeight: 0
    } as SearchParametersType);

    const toggleSwitch = () => setIsShowSettings(prev => !prev);
    const onChangeGender = (value: string | undefined) => setSearchParameters(prev => ({...prev, gender: value}))
    // const onChangeMinAge = (value: string) => setSearchParameters(prev => ({...prev, minAge: +value}))
    // const onChangeMaxAge = (value: string) => setSearchParameters(prev => ({...prev, maxAge: +value}))
    const onChangeProperty = (prop: string, value: string) => setSearchParameters(prev => ({...prev, [prop]: +value}))


    // button click handler
    const onPress = () => {
        setIsShowUsers(prev => !prev)
    }

    return (
        <View style={styles.container}>
            {isShowUsers
                ? <Users searchParams={searchParameters}/>
                : <>
                    <View style={styles.inOneRow}>
                        <Switch
                            trackColor={{false: "#767577", true: "#fa785c"}}
                            // thumbColor={"#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isShowSettings}
                        />
                        {!isShowSettings && <Text>Show settings for search</Text>}
                    </View>
                    {isShowSettings && <ScrollView style={{marginTop: 50}}>
                        <Text>gender are you looking for</Text>
                        <Picker
                            selectedValue={searchParameters.gender}
                            numberOfLines={1}
                            mode={'dropdown'}
                            onValueChange={(itemValue) =>
                                onChangeGender(itemValue)
                            }>
                            <Picker.Item label="Female" value="female"/>
                            <Picker.Item label="Male" value="male"/>
                            <Picker.Item label="Both" value="both"/>
                        </Picker>

                        <Text>Min age</Text>
                        <TextInput
                            style={styles.input}
                            // onChangeText={(value) => onChangeMinAge(value)}
                            onChangeText={(value) => onChangeProperty('minAge', value)}
                            value={searchParameters.minAge.toString()}
                            keyboardType="numeric"
                            placeholder={'Min age'}
                        />

                        <Text>Max age</Text>
                        <TextInput
                            style={styles.input}
                            // onChangeText={(value) => onChangeMaxAge(value)}
                            onChangeText={(value) => onChangeProperty('maxAge', value)}
                            value={searchParameters.maxAge.toString()}
                            keyboardType="numeric"
                            placeholder={'Max age'}
                        />


                        <Text>Min weight</Text>
                        <TextInput
                            style={styles.input}
                            // onChangeText={(value) => onChangeMinAge(value)}
                            onChangeText={(value) => onChangeProperty('minWeight', value)}
                            value={searchParameters.minWeight.toString()}
                            keyboardType="numeric"
                            placeholder={'Min weight'}
                        />

                        <Text>Max weight</Text>
                        <TextInput
                            style={styles.input}
                            // onChangeText={(value) => onChangeMaxAge(value)}
                            onChangeText={(value) => onChangeProperty('maxWeight', value)}
                            value={searchParameters.maxWeight.toString()}
                            keyboardType="numeric"
                            placeholder={'Max weight'}
                        />


                        <Text>Min height</Text>
                        <TextInput
                            style={styles.input}
                            // onChangeText={(value) => onChangeMinAge(value)}
                            onChangeText={(value) => onChangeProperty('minHeight', value)}
                            value={searchParameters.minHeight.toString()}
                            keyboardType="numeric"
                            placeholder={'Min height'}
                        />

                        <Text>Max height</Text>
                        <TextInput
                            style={styles.input}
                            // onChangeText={(value) => onChangeMaxAge(value)}
                            onChangeText={(value) => onChangeProperty('maxHeight', value)}
                            value={searchParameters.maxHeight.toString()}
                            keyboardType="numeric"
                            placeholder={'Max height'}
                        />
                    </ScrollView>}

                    <TouchableOpacity
                        style={styles.button}
                        onPress={onPress}
                        activeOpacity={0.4}
                        onLongPress={() => Alert.alert('Just touch it, don\'t hold!')}
                        delayLongPress={1000}
                    >
                        <Text style={styles.buttonText}>Let's make your night</Text>
                    </TouchableOpacity>
                </>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 30,
        // alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20
    },
    button: {
        alignItems: "center",
        backgroundColor: "#fa785c",
        padding: 10,
        margin: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#000000',
        fontWeight: 'bold'
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },

    inputs: {
        // flex: 1,
        justifyContent: 'space-between',
        // alignItems: 'flex-end'
    },

    inOneRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'flex-end'
    },

    iconButton: {
        backgroundColor: "#fa785c",
        width: 80,
        height: 80
    }
});