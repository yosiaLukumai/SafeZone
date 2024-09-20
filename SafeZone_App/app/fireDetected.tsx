import React, { useState, useEffect, } from 'react';
import { View, Button, Alert, StyleSheet, Text } from 'react-native';
import { Audio } from 'expo-av';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Foundation from '@expo/vector-icons/Foundation';

const fireDetected = () => {

    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const router = useRouter(); // Use the router for navigation
    const { disasterType } = useLocalSearchParams<{ disasterType: string }>();

    async function playSound() {
        try {
            const { sound } = await Audio.Sound.createAsync(
                require('./../assets/fire_alarm.mp3'), // Replace with your sound file path
                { isLooping: true }
            );
            setSound(sound);
            await sound.playAsync();
        } catch (error) {
            console.log('Error playing sound:', error);
        }
    }

    async function stopSound() {
        if (sound) {
            await sound.stopAsync();
            await sound.unloadAsync();
            setSound(null);
        }
    }

    useEffect(() => {
        const playAlarmSound = async () => {
            await playSound();
        };

        playAlarmSound();

        return () => {
            stopSound();
        };
    }, []);

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: "fireDetected", headerShown: false }} />
            <View style={{ paddingTop: 50 }}>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ fontSize: 21, fontWeight: "600" }}>SafeZone </Text>
                    <MaterialIcons onPress={() => {
                        Alert.alert("Cancel Alarm", "There disaster please take Response!", [
                            { text: "Cancel", style: "cancel" },
                            {
                                text: "OK", onPress: () => {
                                    stopSound();
                                    // Navigate back to the main screen
                                    router.push("/");
                                }
                            },
                        ]);
                    }} name="cancel" size={28} color="white" />
                </View>

                <View style={{ paddingTop: 28, paddingBottom: 10, alignContent: "center", alignSelf: "center" }}>
                    <Foundation name="alert" size={90} color="white" />
                </View>
                <View style={{ alignSelf: 'center' }}>
                    <Text style={{ fontSize: 21, fontWeight: "600", textAlign: "center", color: "#fff" }}>{disasterType + "  Detected"}  at Moshono</Text>
                </View>
                <View style={{alignContent: "center"}}>
                    <View><Text style={{color:"#fff", fontSize: 22}}>Call 112</Text></View>
                </View>
            </View>

        </View>
    );
};

export default fireDetected;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: "#ef233c"
    },
    statusBa: {
        alignItems: 'center',
    },
    fonted: {
        fontSize: 19,
        color: "#fff"
    },
    submitButton: {
        backgroundColor: "#df342c",
        height: 45,
        justifyContent: 'center',
        borderRadius: 15,
    },
    submitText: {
        textAlign: "center",
        fontWeight: "500",
        color: "white",
        fontSize: 22
    },
})
