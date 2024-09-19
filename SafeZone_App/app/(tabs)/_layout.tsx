import { Entypo } from '@expo/vector-icons';
import { router, Tabs } from 'expo-router';
import { Button, Modal, Platform, Pressable, StyleSheet, Text, TextInput, View, ActivityIndicator } from "react-native"
import { useEffect, useState } from 'react';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { useSession, SessionProvider } from "./../../context/contex"

export default function TabLayout() {
    const BgColor = "#0e1a25"
    const VeryActive = "#04c401"
    const [modalVisible, setModalVisible] = useState(false);

    const { session, isLoading } = useSession();
    useEffect(() => {
        if (!isLoading && !session) {
            router.push("/sign-in");
        }
    }, [isLoading, session]);

    if (isLoading) {
        return <View style={styles.container}>

            <View>
                <ActivityIndicator size="large" />
            </View>
            <View style={{ paddingVertical: 12 }}>
                <Text style={{ fontSize: 16, color: "#fff", textAlign: "center" }}>Loading..</Text>
            </View>
        </View>;
    }

    if (!session) {
        // Render nothing while waiting for the redirect
        return null;
    }

    const handleTabPress = (e: any, routeName: any) => {
        if (routeName === 'Charge') {
            // console.log("clicked modal setup...");
            e.preventDefault();
            setModalVisible(true);
        }
    };
    return (
        <View style={{ flex: 1, backgroundColor: "#111827", }}>
            <StatusBar style='dark' animated={true} />
            <SafeAreaView style={{ flex: 1 }}>
                <Tabs screenOptions={{
                    tabBarActiveTintColor: '#fff',
                    tabBarHideOnKeyboard: true,
                    tabBarItemStyle: {
                        paddingVertical: 4
                    },
                    tabBarStyle: {
                        backgroundColor: BgColor,
                        height: 62,
                        elevation: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        position: "absolute",
                    },
                    tabBarLabelStyle: {
                        fontSize: 14,
                        fontWeight: "500"
                    },

                }}>
                    <Tabs.Screen
                        name="index"
                        options={{
                            title: 'Home',

                            headerShown: false,
                            tabBarIcon: ({ color }) => <Entypo name="home" size={30} color={color} />,
                        }}
                    />
                    <Tabs.Screen
                        name="statistics"
                        options={{
                            headerShown: false,
                            title: "Statistics",
                            tabBarIcon: ({ color }) => <Entypo name="line-graph" size={30} color={color} />,
                        }}
                    />
                    <Tabs.Screen
                        name="charge"
                        options={{
                            headerShown: false,
                            tabBarLabel: () => null,
                            tabBarIcon: ({ focused }) => {
                                return (
                                    <View style={styles.ChargeButton}>
                                        <FontAwesome6 name="add" size={30} color="#fff" />
                                        {/* <MaterialIcons name="electric-bolt" size={30} color="#fff" /> */}
                                    </View>
                                )
                            }
                        }}

                    />
                    <Tabs.Screen
                        name="device"
                        options={{
                            headerShown: false,
                            title: "Devices",
                            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="safe-square" size={30} color={color}  />,
                        }}
                    />
                    <Tabs.Screen
                        name="profile"
                        options={{
                            title: 'Profile',
                            headerShown: false,
                            tabBarIcon: ({ color }) => <Entypo name="user" size={30} color={color} />,
                        }}
                    />
                </Tabs>

            </SafeAreaView>

        </View>

    );
}


const styles = StyleSheet.create({
    ChargeButton: {
        top: Platform.OS == "ios" ? -10 : -20,
        width: Platform.OS == "ios" ? 50 : 60,
        height: Platform.OS == "ios" ? 50 : 60,
        borderRadius: Platform.OS == "ios" ? 25 : 30,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#04c401",
        fontSize: 0,
        elevation: 2,
        shadowOpacity: 1
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: "#f0f1f3",
        justifyContent: "center",
        alignContent: "center"
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    TopModalBar: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    fielIput: {
        height: 40,
        margin: 12,
        padding: 10,
        borderWidth: 2,
        borderColor: "white"
    }
})