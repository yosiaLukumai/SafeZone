import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Platform, Button, useWindowDimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { router } from 'expo-router';
import { BarcodeScanningResult, CameraView, useCameraPermissions } from 'expo-camera';

export default function Tab() {
  const [chargerID, setChargerID] = useState('');
  const [isFocused, setIsFocused] = useState<string | null>(null);
  const [amount, setAmount] = useState('');
  const [dataAmount, setDataAmount] = useState(0)
  const [disable, setDisable] = useState(true);
  const [fetchingData, setFetchingData] = useState(false)
  const [permission, requestPermission] = useCameraPermissions();
  const [askQr, setAskQr] = useState(false)
  const width = useWindowDimensions()
  const height = Math.round((width.width * 16) / 9)

  const onChanges = (text: string, value: string): void => {
    if (text === "input1") {
      setChargerID(value);
    }
    if (text === "input2") {
      setAmount(value);
    }
  };

  const submitPayment = (): void => {
    router.push('/checkout')
  }

  const GetQRResult = (results: BarcodeScanningResult): void => {
    if (results.data) {
      setChargerID(results.data)
    }
    setAskQr(false)
  }

  const HandleQrCodeScanningCalling = (): any => {
    if (!fetchingData) {
      setAskQr(true)
      HandleQrCodeScanning()
    }
  }
  const HandleQrCodeScanning = (): any => {
    if (!permission) {
      return <View />;
    }

    if (!permission.granted) {
      return (
        <View style={styles.containerCam}>
          <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
          <Button onPress={requestPermission} title="grant permission" />
        </View>
      );
    }

    return (
      <View style={{ flex: 1, marginTop: 40 }}>
        <CameraView style={[styles.camera, { height: height }]} onBarcodeScanned={(result) => setChargerID(result.data)} barcodeScannerSettings={{
          barcodeTypes: ["qr", "codabar", "aztec", "ean13", "upc_e", "code128", "code39", "pdf417"],
        }} >
          <View style={{ flex: 1, justifyContent: "flex-end", paddingHorizontal: 32, paddingBottom: 12 }}>
            <Button title='SCAN' />
          </View>
        </CameraView>

      </View>
    )

  }

  useEffect(() => {
    setDisable(chargerID.length < 3 || amount.length < 3);
  }, [chargerID, amount]);

  return (
    <View style={styles.container}>
      <View style={styles.MainCont}>
        {
          !askQr && <View>
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
              <Text style={{ color: "#04c301", fontSize: 29, fontWeight: "700" }}>
                Add
              </Text>
              <Text style={{ color: "#f9c647", fontSize: 29, fontWeight: "700", marginLeft: 5 }}>
                Device
              </Text>
            </View>
            <View style={[styles.FormOne, styles.littleGap]}>
              <View style={[styles.LittlePad]}>
                <View>
                  <Text style={styles.LabelInputs}>ID Number</Text>
                  <View style={styles.firstInput}>
                    <TextInput
                      onFocus={() => setIsFocused("input1")}
                      onBlur={() => setIsFocused(null)}
                      keyboardType='numeric'
                      style={[styles.input, styles.gapped, { borderColor: isFocused === "input1" ? '#0077b6' : 'white' }]}
                      onChangeText={(val) => onChanges("input1", val)}
                      value={chargerID}
                    />
                    <View style={styles.barCode}>
                      <TouchableOpacity onPress={() => HandleQrCodeScanningCalling()}>
                        <MaterialIcons style={{}} name="qr-code-scanner" size={38} color="white" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View>
                  <Text style={styles.LabelInputs}>Phone</Text>
                  <TextInput
                    keyboardType='numeric'
                    placeholder='e.g 0762127425'
                    onFocus={() => setIsFocused("input2")}
                    onBlur={() => setIsFocused(null)}
                    style={[styles.input, { borderColor: isFocused === "input2" ? '#0077b6' : 'white' }]}
                    onChangeText={(val) => onChanges("input2", val)}
                    value={amount}
                  />
                </View>
                <View>
                  <Text style={styles.LabelInputs}>Data</Text>
                  <TextInput
                    keyboardType='numeric'
                    placeholder='e.g 50 Mbs'
                    onFocus={(id) => console.log(id.target.refs)}
                    onBlur={() => setIsFocused(null)}
                    style={[styles.input, { borderColor: isFocused === "input2" ? '#0077b6' : 'white' }]}
                    onChangeText={(val) => setAmount(val)}
                    value={amount}
                  />
                </View>
                {
                  disable && <View style={[styles.submitButton, { opacity: 0.8 }]}>
                    <TouchableOpacity disabled style={{ opacity: 0.3 }} onPress={() => alert("Help")}>
                      <Text style={styles.submitText}>
                        Submit
                      </Text>
                    </TouchableOpacity>
                  </View>
                }
                {disable == false && <View style={[styles.submitButton, { opacity: 1 }]}>
                  <TouchableOpacity onPress={() => submitPayment()}>
                    <Text style={styles.submitText}>
                      Submit
                    </Text>
                  </TouchableOpacity>
                </View>
                }

              </View>
            </View>
          </View>
        }
        {
          askQr && HandleQrCodeScanning()
        }

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#111827"
  },
  containerCam: {
    flex: 1,
    justifyContent: 'center',
  },
  MainCont: {
    paddingTop: Platform.OS === "ios" ? 0 : 10,
    flex: 1
  },
  FormOne: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 12,
    marginTop: 10,
    borderRadius: 12,
    paddingVertical: 60,
  },
  LabelInputs: {
    fontSize: 15,
    fontWeight: "500",
    color: "white"
  },
  LittlePad: {
    paddingHorizontal: 12,
    gap: 22
  },
  littleGap: {
    rowGap: 22,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 6,
    fontSize: 16,
    borderRadius: 12,
    marginVertical: 5,
    fontWeight: '400',
    borderColor: "white",
    color: "#758694",
  },
  firstInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    columnGap: 12,
    alignContent: "center",
    alignItems: "center"
  },
  gapped: {
    flexGrow: 1
  },
  barCode: {
    borderWidth: 0.3,
    height: 50,
    justifyContent: "center",
    borderColor: "whitesmoke",
    paddingHorizontal: 4,
    borderRadius: 7,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  submitButton: {
    backgroundColor: "#f9c647",
    height: 45,
    justifyContent: 'center',
    borderRadius: 15,
  },
  submitText: {
    textAlign: "center",
    fontWeight: "500",
    color: "black",
    fontSize: 22
  },
  camera: {
    flex: 0.6,
  },
});

