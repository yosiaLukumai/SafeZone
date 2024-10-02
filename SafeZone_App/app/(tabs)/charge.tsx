import { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Platform, Button, useWindowDimensions, ToastAndroid } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { router } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import { BarcodeScanningResult, CameraView, useCameraPermissions } from 'expo-camera';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { UserLocationContext } from '../context/UserLocationContext';
import TobeNotified from '@/components/TobeNotified';
import { useStorageState } from '@/context/useStorage';
import { ConfigurationsSetting } from '@/constants/Colors';
import UnderGroundProcess from '@/components/UnderGroundProcess';
interface Row {
  phone: string;
  name: string;
  MNO: string;
}

export default function Tab() {
  const [[isLoading, session], setSession] = useStorageState('session');
  const [user, setUser] = useState<null | any>(null)

  const [serialNumber, setserialNumber] = useState('');
  const [isFocused, setIsFocused] = useState<string | null>(null);
  const [phone, setphone] = useState('');
  const [name, setname] = useState("")
  const [dataAmount, setDataAmountMBs] = useState<number | any>(0)
  const [disable, setDisable] = useState(true);
  const [loader, setLoader] = useState(false)
  const [permission, requestPermission] = useCameraPermissions();
  const [askQr, setAskQr] = useState(false)
  const width = useWindowDimensions()
  const height = Math.round((width.width * 16) / 9)
  const [rows, setRows] = useState<Row[]>([{ phone: "", name: "", MNO: "Vodacom" }]);
  const { location, setLocation } = useContext(UserLocationContext)


  const getBorderColor = (inputName: string) => {
    return isFocused === inputName ? '#0077b6' : 'white';
  };

  const onChanges = (text: string, value: string): void => {
    if (text === "input1") {
      setserialNumber(value);
    }
    if (text === "input2") {
      setphone(value);
    }
  };

  const handleRowsChange = (updatedRows: any) => {
    setRows(updatedRows);
  };


  useEffect(() => {
    if (session != null) {
      let myUser = JSON.parse(session)
      setUser(myUser?.user)
    }

  }, [session])

  const submitDeviceRegistration = async (): Promise<void> => {
    if (name.trim() != "" && serialNumber.trim() != "" && phone.trim() != "" && rows.length > 0 && dataAmount > 0) {
      // loop through the row to check if the value
      let emptyFlag = false;
      for (let x = 0; x < rows.length; x++) {
        if (
          rows[x].MNO.trim() === "" ||
          rows[x].name.trim() === "" ||
          rows[x].phone.trim() === ""
        ) {
          emptyFlag = true;
          break;
        }
      }

      if (emptyFlag) {
        ToastAndroid.show("Sorry fill all fields", ToastAndroid.SHORT);
        return
      }

      // all clear
      try {
        let SendData = {
          serialNumber: serialNumber.trim(),
          phone: phone.trim(),
          owner: user?._id,
          name: name.trim(),
          data: dataAmount,
          cordinates: {
            longitude: location.longitude,
            latitude: location.latitude
          },
          listTobeNotified: rows
        }

        setLoader(true)
        const response = await fetch(`${ConfigurationsSetting.backendURL}/devices/register`, {
          mode: "cors",
          headers: {
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify(SendData)
        })
        let results = await response.json()
        if (results?.success) {
          setLoader(false)
          ToastAndroid.show("Devices added", ToastAndroid.SHORT);
          setTimeout(() => {
            setDataAmountMBs(0)
            setphone("")
            setserialNumber("")
            setname("")
            setRows([{ phone: "", name: "", MNO: "Vodacom" }])
            router.push("/device")
          }, 2000)
          
        } else {
          setLoader(false)
          ToastAndroid.show(results?.body, ToastAndroid.SHORT);
        }
      } catch (error) {
        setLoader(false)
        ToastAndroid.show('failed to add device!', ToastAndroid.SHORT);
      }
    } else {
      ToastAndroid.show("Sorry fill all fields", ToastAndroid.SHORT);
    }
  }


  const HandleQrCodeScanningCalling = (): any => {
    if (!loader) {
      setAskQr(true)
      HandleQrCodeScanning()
    }
  }


  const QrDetected = (data: BarcodeScanningResult): void => {
    if (data?.data) {
      setserialNumber(data.data)
      setAskQr(false)
    } else {
      setAskQr(false)
    }
  }

  if (!location) {
    return (
      <View style={styles.container}>
        <View style={{ paddingTop: 15 }}>
          <Text style={{ color: "red", fontSize: 23, fontWeight: "500" }}>
            Enable first the Location the Location if device need to be known first.
          </Text>
        </View>
      </View>
    )
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
      <View style={{ flex: 1 }}>
        <View style={{ display: "flex", paddingVertical: 12, flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 2 }}>
          <Text style={{ fontSize: 22, fontWeight: 500, color: "#fff" }}>Scan Qr code</Text>
          <AntDesign name="close" size={22} color="yellow" onPress={() => setAskQr(false)} />
        </View>
        <CameraView style={[styles.camera, { height: height }]} onBarcodeScanned={(result) => QrDetected(result)} barcodeScannerSettings={{
          barcodeTypes: ["qr", "codabar", "aztec", "ean13", "upc_e", "code128", "code39", "pdf417"],
        }} >
        </CameraView>
      </View>
    )

  }

  useEffect(() => {
    setDisable(serialNumber.length < 3 || phone.length < 3);
  }, [serialNumber, phone]);


  return (
    <SafeAreaProvider>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {loader ? (<UnderGroundProcess loaderColor='yellow' textMSG='Processing...' />) : (<View style={styles.container}>
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
                      <Text style={styles.LabelInputs}>Name</Text>
                      <TextInput
                        keyboardType='default'
                        placeholder='e.g duka'
                        onFocus={() => setIsFocused("input5")}
                        onBlur={() => setIsFocused(null)}
                        style={[styles.input, { borderColor: getBorderColor("input5") }]}
                        onChangeText={(val) => setname(val)}
                        value={name}
                      />
                    </View>
                    <View>
                      <Text style={styles.LabelInputs}>Serial Number</Text>
                      <View style={styles.firstInput}>
                        <TextInput
                          onFocus={() => setIsFocused("input1")}
                          onBlur={() => setIsFocused(null)}
                          keyboardType='default'
                          style={[styles.input, styles.gapped, { borderColor: getBorderColor("input1") }]}
                          onChangeText={(val) => onChanges("input1", val)}
                          value={serialNumber}
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
                        style={[styles.input, { borderColor: getBorderColor("input2") }]}
                        onChangeText={(val) => onChanges("input2", val)}
                        value={phone}
                      />
                    </View>
                    <View>
                      <Text style={styles.LabelInputs}>Data</Text>
                      <TextInput
                        keyboardType='numeric'
                        placeholder='e.g 50 Mbs'
                        onFocus={(id) => setIsFocused("input3")}
                        onBlur={() => setIsFocused(null)}
                        style={[styles.input, { borderColor: getBorderColor("input3") }]}
                        onChangeText={(val) => setDataAmountMBs(Number(val))}
                        value={dataAmount}
                      />
                    </View>


                    <View>
                      <TobeNotified rows={rows} setRows={handleRowsChange} />
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
                      <TouchableOpacity onPress={() => submitDeviceRegistration()}>
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
        </View>)}

      </ScrollView>
    </SafeAreaProvider>

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

