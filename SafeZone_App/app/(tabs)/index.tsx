import { View, Text, StyleSheet, ToastAndroid } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import ItSafe from '@/components/ItSafe';
import AlertKPI from '@/components/AlertKPI';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { useStorageState } from '@/context/useStorage';
import UnderGroundProcess from '@/components/UnderGroundProcess';
import { ConfigurationsSetting } from '@/constants/Colors';



export default function Tab() {
  const [[isLoading, session], setSession] = useStorageState('session');
  const [user, setUser] = useState<null | any>(null)
  const [messages, setMessages] = useState([]);
  const [devices, setDevices] = useState<null | any>(null);
  const [errors, setErrors] = useState(false);

  async function FetchDevices(ownerID: string) {
    try {
      const response = await fetch(
        `${ConfigurationsSetting.backendURL}/devices/find/all/${ownerID}`,
        {
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'GET',
        }
      );
      let results = await response.json();
      if (results?.success) {
        setDevices(results?.body);
      } else {
        setDevices([]);
      }
    } catch (error) {
      console.log(error);
      setErrors(true);
      ToastAndroid.show('Failed to load devices', ToastAndroid.SHORT);
    }
  }


  useEffect(() => {
    if (session != null) {
      let myUser = JSON.parse(session)
      FetchDevices(myUser?.user?._id)
      setUser(myUser?.user)
    }

  }, [session])



  return (
    <SafeAreaProvider>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {
          user == null ? (<UnderGroundProcess loaderColor='yellow' textMSG='Processing' />) : (<View style={styles.container}>
            <View style={styles.BoxTop}>
              <View style={styles.userNameWelcome}>
                <Text style={[styles.fontMain]}>
                  Hello
                </Text>
                <Text style={styles.fontName}>
                  {String(user?.fullName).split(" ")[0]}
                  <Text style={styles.moreFocused}>
                    {" " + String(user?.fullName).split(" ")[1]}
                  </Text>
                </Text>
              </View>
              <View style={styles.glass}>
                <TouchableOpacity>
                  <View style={styles.IconNotification} >
                    <MaterialIcons name="notifications-none" size={30} color="#fff" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ paddingHorizontal: 2, justifyContent: "center", alignItems: "center" }}>
              <ItSafe />
            </View>


            {devices && devices.length > 0 ? (
              <View>
                <View style={{ paddingVertical: 13 }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text style={{ color: '#04c301', fontSize: 29, fontWeight: '700' }}>
                      All
                    </Text>
                    <Text
                      style={{
                        color: '#f9c647',
                        fontSize: 29,
                        fontWeight: '700',
                        marginLeft: 5,
                      }}
                    >
                      Devices
                    </Text>
                  </View>
                </View>
                {devices.map((device: any, index: number) => (
                  <View key={index} style={{ paddingVertical: 12 }}>
                    <AlertKPI device={device} />
                  </View>
                ))}
                <View style={{ paddingBottom: 90 }}></View>
              </View>
            ) : (
              <Text style={{ color: 'white', textAlign: 'center', marginVertical: 27, fontSize: 19 }}>
                You haven't addes any devices
              </Text>
            )}

          </View>)
        }

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
  BoxTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
  },
  fontMain: {
    color: "#fff",
    flexGrow: 0.35,
    fontSize: 15,
    fontWeight: "200"
  },
  CardStrip: {
    marginTop: 4,
    borderWidth: 1.1,
    borderColor: "#f9c647",
    padding: 15,
    borderBottomEndRadius: 15,
    borderBottomLeftRadius: 15,
    borderStyle: "dashed"

  },
  fontName: {
    color: "#04c401",
    flexGrow: 0.65,
    fontSize: 18,
    fontWeight: "400",

  },
  userNameWelcome: {
    height: 50,
    flex: 1,
  },
  IconNotification: {
  },
  glass: {
    // borderRadius: 20,
    // padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    justifyContent: "center",
    paddingHorizontal: 8,
    borderRadius: 12,
    // elevation: 10,
    // flexShrink: 2
  },
  moreFocused: {
    paddingLeft: 2,
    color: "yellow"
  },
  BalanceBox: {
    paddingVertical: 40
  },
  SafeBox: {
    width: 30,
    height: 30
  }

});