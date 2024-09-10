import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import StatusDonut from '@/components/StatusDonut';
import ItSafe from '@/components/ItSafe';
import AlertKPI from '@/components/AlertKPI';
import { SafeAreaProvider } from 'react-native-safe-area-context';



export default function Tab() {

  return (
    <SafeAreaProvider>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={styles.BoxTop}>
            <View style={styles.userNameWelcome}>
              <Text style={[styles.fontMain]}>
                Hello
              </Text>
              <Text style={styles.fontName}>
                Yosia
                <Text style={styles.moreFocused}>
                  - Lukumai
                </Text>
              </Text>
            </View>
            <View style={styles.glass}>
              <TouchableOpacity >
                <View style={styles.IconNotification}>
                  <MaterialIcons name="notifications-none" size={30} color="#fff" />
                </View>
              </TouchableOpacity>
            </View>
          </View>


          <View style={{ paddingHorizontal: 2, justifyContent: "center", alignItems: "center" }}>
            <ItSafe />
          </View>

          <View style={{ paddingVertical: 20 }}>
            <AlertKPI />
          </View>

        </View>
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