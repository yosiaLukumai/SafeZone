import { router, Stack } from 'expo-router';
import { Text, View, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native';
import { useSession } from './../context/contex';
import { useEffect, useRef } from 'react';

import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function SignUp() {
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const phoneRef = useRef("");
    const fname = useRef("")
    const lname = useRef("")


    const NavigateLogin = (): void => {
        router.push('/sign-in')
    }


    return (
        <>
            <SafeAreaProvider>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
                                    onChangeText={(text) => {
                                        fname.current = text;
                                    }}
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
                                    onChangeText={(text) => {
                                        lname.current = text;
                                    }}
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
                                    onChangeText={(text) => {
                                        emailRef.current = text;
                                    }}
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
                                    onChangeText={(text) => {
                                        phoneRef.current = text;
                                    }}
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
                                    onChangeText={(text) => {
                                        passwordRef.current = text;
                                    }}
                                    style={styles.textInput}
                                />
                            </View>

                            <TouchableOpacity
                                style={styles.button}
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
