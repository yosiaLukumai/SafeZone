import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { customStyles } from '../styles/style'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { router } from 'expo-router'

const checkout = () => {
  const payNow = (): void => {
    router.push("charging")
  }
  return (
    <View style={styles.container}>
      <View style={[customStyles.FormOne]}>
        <View style={styles.gapped}>
          <View style={styles.padALLbOX}>
            <View style={styles.textMain}>
              <Text style={[styles.shadoded]}>
                Charging Station
              </Text>
              <Text style={[styles.upfrontSize, { fontWeight: "800" }]}>
                Mikocheni
              </Text>
            </View>
          </View>
          <View style={styles.padALLbOX}>
            <View style={styles.textMain}>
              <Text style={[styles.shadoded]}>
                Rating@ 1 unit
              </Text>
              <Text style={[styles.upfrontSize, { fontWeight: "800" }]}>
                500 Tsh
              </Text>
            </View>
          </View>
          <View style={styles.padALLbOX}>
            <View style={styles.textMain}>
              <Text style={[styles.shadoded]}>
                Units
              </Text>
              <Text style={[styles.upfrontSize, { fontWeight: "800" }]}>
                2.1 Kw
              </Text>
            </View>
          </View>
          <View style={styles.padALLbOX}>
            <View style={styles.textMain2}>
              <Text style={[styles.shadoded, { fontSize: 21 }]}>
                Total
              </Text>
              <Text style={[styles.upfrontSize, { fontWeight: "800", color: "#04c401", fontSize: 24 }]}>
                5000 TZS
              </Text>
            </View>
          </View>

          <View style={[styles.padALLbOX, { paddingTop: 20 }]}>
            <View style={[customStyles.submitButton, { opacity: 1 }]}>
              <TouchableOpacity onPress={() => payNow()}>
                <Text style={customStyles.submitText}>
                  Pay Now
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default checkout

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#111827"
  },
  textMain: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 0.8,
    borderBottomColor: "#0077b6"
  },
  textMain2: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  upfrontSize: {
    fontSize: 18,
    color: "white"
  },
  padALLbOX: {
    paddingHorizontal: 12,
  },
  gapped: {
    rowGap: 25,
  },
  shadoded: {
    opacity: 0.5,
    fontSize: 17,
    color: "white",
    fontWeight: '400'
  }
})