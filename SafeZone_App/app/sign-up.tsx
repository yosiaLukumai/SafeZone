import { router, Stack } from 'expo-router';
import { Text, View, TouchableOpacity, StyleSheet, ToastAndroid, ActivityIndicator } from 'react-native';
import { useSession } from './../context/contex';
import { useEffect, useRef, useState } from 'react';

import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ConfigurationsSetting } from '@/constants/Colors';
import UnderGroundProcess from '@/components/UnderGroundProcess';

export default function SignUp() {
    const [email, setEmail] = useState("")
    const [fname, setfname] = useState("")
    const [lname, setlname] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setphone] = useState("")

    const [loader, setLoader] = useState(false)

    const NavigateLogin = (): void => {
        router.push('/sign-in')
    }


    const RegisterUser = async (): Promise<void> => {
        if (
            phone?.trim() !== "" &&
            fname?.trim() !== "" &&
            lname?.trim() !== "" &&
            password?.trim() !== ""
        ) {
            try {
                // Perform registration logic here
                setLoader(true)
                const response = await fetch(`${ConfigurationsSetting.backendURL}/user/register`, {
                    mode: "cors",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify({
                        fullName: fname.trim() + " " + lname.trim(),
                        email: email.trim(),
                        password: password.trim(),
                        phone: phone.trim(),
                        userType: "USER"
                    })
                })

                const result = await response.json()
                if (result?.success) {
                    ToastAndroid.show("User registered..", ToastAndroid.SHORT);
                } else {
                    if (String(result?.body).includes("duplicate")) {
                        ToastAndroid.show("Sorry email taken...", ToastAndroid.SHORT);
                    } else {
                        ToastAndroid.show(result?.body, ToastAndroid.SHORT);
                    }
                }
                setLoader(false)

            } catch (error) {
                setLoader(false)
                ToastAndroid.show('registration failed!', ToastAndroid.SHORT);
            }
        } else {
            // Show a toast if any of the fields are empty
            ToastAndroid.show('fill all required fields!', ToastAndroid.SHORT);
        }
    };


    return (
        <>
            <SafeAreaProvider>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    {loader ? (
                        <UnderGroundProcess loaderColor='yellow' textMSG='Processing...' />
                    ) : (<View style={{ flex: 1 }}>
                        <Stack.Screen options={{ title: "sign-up", headerShown: false }} />
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#0e1a25" }}>
                            <View style={{ justifyContent: "center", alignItems: "center" }}>
                                <View style={{ marginVertical: 16 }}>
                                    <Text style={{ fontSize: 23, fontWeight: "700", color: "white" }}>
                                        SafeZone
                                    </Text>
                                </View>
                                <View>
                                    <Text style={styles.label}>First Name</Text>
                                    <TextInput
                                        placeholder="e.g Nicole"
                                        autoCapitalize="none"
                                        placeholderTextColor="#95a6a8"
                                        nativeID="fname"
                                        onChangeText={setfname}
                                        value={fname}
                                        style={styles.textInput}
                                    />
                                </View>
                                <View>
                                    <Text style={styles.label}>Last Name</Text>
                                    <TextInput
                                        placeholder="e.g Tesla"
                                        autoCapitalize="none"
                                        placeholderTextColor="#95a6a8"
                                        nativeID="fname"
                                        onChangeText={setlname}
                                        value={lname}
                                        style={styles.textInput}
                                    />
                                </View>
                                <View>
                                    <Text style={styles.label}>Email</Text>
                                    <TextInput
                                        placeholder="user@gmail.com"
                                        autoCapitalize="none"
                                        placeholderTextColor="#95a6a8"
                                        nativeID="email"
                                        onChangeText={setEmail}
                                        value={email}
                                        style={styles.textInput}
                                    />
                                </View>
                                <View>
                                    <Text style={styles.label}>Phone</Text>
                                    <TextInput
                                        placeholder="0762127425"
                                        secureTextEntry={false}
                                        placeholderTextColor="#95a6a8"
                                        nativeID="phone"
                                        keyboardType='number-pad'
                                        onChangeText={setphone}
                                        value={phone}
                                        style={styles.textInput}
                                    />
                                </View>
                                <View>
                                    <Text style={styles.label}>Password</Text>
                                    <TextInput
                                        placeholder="password"
                                        secureTextEntry={true}
                                        placeholderTextColor="#95a6a8"
                                        nativeID="phone"
                                        onChangeText={setPassword}
                                        value={password}
                                        style={styles.textInput}
                                    />
                                </View>

                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => RegisterUser()}
                                >
                                    <Text style={styles.buttonText}>Register</Text>
                                </TouchableOpacity>
                                <View style={{ marginTop: 32 }}>
                                    <Text
                                        style={{ fontWeight: "500", color: "white", fontSize: 15 }}
                                        onPress={() => NavigateLogin()}
                                    >
                                        login here
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>)}


                </ScrollView>

            </SafeAreaProvider>
        </>

    );
}


const styles = StyleSheet.create({
    label: {
        marginBottom: 4,
        color: "white",
        fontWeight: "400",
        fontSize: 18,
    },
    textInput: {
        width: 280,
        borderWidth: 0.8,
        borderRadius: 4,
        borderColor: "#04c400",
        paddingHorizontal: 8,
        paddingVertical: 4,
        opacity: 0.8,
        // fontSize: 15,
        marginBottom: 16,
        backgroundColor: "#202938",
        color: "#0abe0a",
    },
    button: {
        backgroundColor: "#1bad50",
        padding: 10,
        width: 280,
        borderRadius: 5,
        marginTop: 16,
        fontWeight: "bold"
    },
    buttonText: {
        color: "white",
        textAlign: "center",
        fontWeight: "700",
        fontSize: 18,
    },

});
