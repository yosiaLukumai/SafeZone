import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ItSafe = ({ safe = false }) => {
    return (
        <View style={[styles.mainDiv, styles.neon]}>
            <View style={styles.glass}>
                <Text style={styles.percentageSize}> Safe
                </Text>
            </View>
        </View>
    )
}

export default ItSafe

const styles = StyleSheet.create({
    mainDiv: {
        width: 256,
        height: 256,
        borderWidth: 11,
        borderColor: "#04c401",
        borderRadius: 128,
        justifyContent: "center",
        alignItems: "center",
        elevation: 100,
        shadowColor: "#2962ff",
        position: 'relative',
        marginTop: 30,
        backgroundColor: "#fdf0d5",

        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.7,
        shadowRadius: 50, // approximating the overall spread of the shadow
    },
    percentageSize: {
        fontSize: 40,
        fontWeight: "bold",
        color: "#04c301"
    },
    neon: {
        shadowOpacity: 0.1,
    },
    glass: {
        // borderRadius: 20,
        // padding: 20,
        // borderWidth: 1,
        // shadowRadius: 20,
        // paddingHorizontal: 8,
        // borderRadius: 12,
        // elevation: 10,
        // flexShrink: 2
    },
})