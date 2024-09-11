import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StatusDonut from '@/components/StatusDonut'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { LinearGradient } from 'expo-linear-gradient'
import { MaterialIcons } from '@expo/vector-icons';

const charging = () => {

    const stopCharging = (): void => {

    }
    return (
        <View style={styles.container}>

            <View style={styles.statusBa}>
                <StatusDonut />
            </View>

            <View style={{ paddingTop: 30 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                    <View style={{ rowGap: 9, borderWidth: 1, borderTopColor: "rgba(255, 255, 255, 0.1)", borderBottomColor: "rgba(255, 255, 255, 0.1)", borderRightColor: "#111827", borderLeftColor: "#111827", flexGrow: 1 }}>
                        <Text style={[styles.fonted, { fontWeight: "600", textAlign: "center" }]}>
                            Tsh 5000
                        </Text>
                        <Text style={[styles.fonted, { opacity: 0.5, textAlign: "center" }]}>
                            Total Cost
                        </Text>
                    </View>
                    <View style={{ rowGap: 9, borderWidth: 1, borderTopColor: "rgba(255, 255, 255, 0.1)", borderLeftColor: "rgba(255, 255, 255, 0.1)", borderBottomColor: "rgba(255, 255, 255, 0.1)", borderRightColor: "#111827", flexGrow: 1 }}>
                        <Text style={[styles.fonted, { fontWeight: "600", textAlign: "center" }]}>
                            2.1 Kwh
                        </Text>
                        <Text style={[styles.fonted, { opacity: 0.5, textAlign: "center" }]}>
                            Energy
                        </Text>
                    </View>
                </View>
            </View>
            <LinearGradient colors={['#df342c', '#e73e28', '#ee552c']} style={[styles.submitButton, { marginTop: 40 }]}>
                <TouchableOpacity onPress={() => stopCharging()}>
                    <View style={{ flexDirection: "row", justifyContent:"center", alignItems:"center" }}>
                        <MaterialIcons name="power-settings-new" size={22} color="white" />
                        <Text style={[styles.submitText, {paddingLeft: 12}]}>
                            Stop Charging
                        </Text>
                    </View>

                </TouchableOpacity>
            </LinearGradient>
        </View>
    )
}

export default charging

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: "#111827"
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