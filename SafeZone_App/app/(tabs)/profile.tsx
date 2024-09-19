import { View, Text, StyleSheet, Switch } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import { useSession } from '@/context/contex';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useStorageState } from '@/context/useStorage';
import { useEffect, useState } from 'react';
import UnderGroundProcess from '@/components/UnderGroundProcess';
export default function Tab() {

  const [[isLoading, session], setSession] = useStorageState('session');
  const [user, setUser] = useState<null | any>(null)
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    if (session != null) {
      let myUser = JSON.parse(session)
      setUser(myUser?.user)
      setLoader(false)
    }

  }, [session])
  const { signOut } = useSession()
  const logoutUser = async () => {
    signOut()
  }

  return (
    <View style={styles.container}>
      {loader ? (<UnderGroundProcess loaderColor='yellow' textMSG='Loading...' />) : (
        <View>
          <View style={[styles.centerView, { paddingTop: 23 }]}>
            <View style={[styles.glass, { paddingHorizontal: 19, paddingVertical: 22, borderRadius: 80 }]}>
              <FontAwesome5 name="user-cog" size={53} color="white" />
            </View>
          </View>
          <View style={[styles.centerView, { paddingTop: 12 }]}>
            <Text style={{ fontSize: 21, fontWeight: "800", color: "#f9c647" }}>  {String(user?.fullName).split(" ")[0]}{"-" + String(user?.fullName).split(" ")[1]}</Text>
          </View>
          <Text style={{ textAlign: "center", paddingTop: 1, color: "#fff", opacity: 0.5 }}>{user?.email}</Text>
          <View style={{ paddingTop: 43, paddingHorizontal: 12 }}>
            <View style={[styles.glass]}>
              <View style={[styles.TwoItemSeparate, { paddingVertical: 12 }]}>
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <View style={{ justifyContent: "center" }}>
                    <MaterialIcons name="notifications" size={24} color="white" />
                  </View>
                  <View style={{ marginLeft: 12 }}>
                    <Text style={{ fontSize: 18, fontWeight: "500", color: "#fff", }}>Notifications</Text>
                  </View>
                </View>
                <View style={{ paddingRight: 5 }}>
                  <Entypo name="chevron-right" size={24} color="#fff" />
                </View>
              </View>
              <View style={{ borderBottomColor: "#95a6a8", borderWidth: 0.7, borderStyle: "solid" }}></View>
              <View style={[styles.TwoItemSeparate, { paddingVertical: 12 }]}>
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <View style={{ justifyContent: "center" }}>
                    <MaterialIcons name="password" size={24} color="#fff" />
                  </View>
                  <View style={{ marginLeft: 12 }}>
                    <Text style={{ fontSize: 18, fontWeight: "500", color: "#fff", }}>Password</Text>
                  </View>
                </View>
                <View style={{ paddingRight: 5 }}>
                  <Entypo name="chevron-right" size={24} color="#fff" />
                </View>
              </View>
              <View style={{ borderBottomColor: "#95a6a8", borderWidth: 0.7, borderStyle: "solid" }}></View>
              <View style={[styles.TwoItemSeparate, { paddingVertical: 12 }]}>
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <View style={{ justifyContent: "center" }}>
                    <MaterialIcons name="contact-support" size={24} color="white" />
                  </View>
                  <View style={{ marginLeft: 12 }}>
                    <Text style={{ fontSize: 18, fontWeight: "500", color: "#fff", }}>Support</Text>
                  </View>
                </View>
                <View style={{ paddingRight: 5 }}>
                  <Entypo name="chevron-right" size={24} color="#fff" />
                </View>
              </View>

              <View style={{ borderBottomColor: "#95a6a8", borderWidth: 0.7, borderStyle: "solid" }}></View>
              <View style={[styles.TwoItemSeparate, { paddingVertical: 12 }]}>
                <TouchableOpacity onPress={() => logoutUser()}>
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <View style={{ justifyContent: "center" }}>
                      <MaterialIcons name="logout" size={22} color="#ef233c" />
                    </View>
                    <View style={{ marginLeft: 12 }}>
                      <Text style={{ fontSize: 18, fontWeight: "500", color: "#ef233c", }}>Logout</Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <View>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}




    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: "#111827"
  },
  textMain: {
    color: "white",
    fontSize: 30
  },
  centerView: {
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "row"
  },
  glass: {
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
  },
  TwoItemSeparate: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  }
});