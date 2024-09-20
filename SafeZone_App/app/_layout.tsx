import { Stack } from 'expo-router/stack';
import { Text, View, } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SessionProvider } from "../context/contex"
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { UserLocationContext } from './context/UserLocationContext';

export default function Root() {
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null | any>(null);
  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);

    })();
  }, []);

  if (errorMsg != null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
        <Text style={{ fontSize: 17, fontWeight: "400" }}> {errorMsg}</Text>
      </View>
    )
  }
  return (
    <SessionProvider>
      <UserLocationContext.Provider value={{ location, setLocation }}>
        <View style={{ flex: 1 }}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name='checkout' options={{
                // statusBarColor:"red",
                headerTitle: "Check & Confirm",
                headerTitleAlign: "center",
                headerTintColor: "white",
                headerStyle: {
                  // backgroundColor:"red",
                  backgroundColor: "#0e1a25"
                }
              }} />
              <Stack.Screen name='sign-in' options={{
                // statusBarColor:"red",
                headerShown: false,
                headerTitle: "Login",
                headerTitleAlign: "center",
                headerTintColor: "white",
                headerStyle: {
                  // backgroundColor:"red",
                  backgroundColor: "#0e1a25"
                }
              }} />
              <Stack.Screen name='charging' options={{
                // statusBarColor:"red",
                headerTitle: "Charging",
                headerTitleAlign: "center",
                headerTintColor: "white",
                headerStyle: {
                  // backgroundColor:"red",
                  backgroundColor: "#0e1a25"
                }
              }} />
              
            </Stack>
          </GestureHandlerRootView>
        </View>
      </UserLocationContext.Provider>
    </SessionProvider>

  );
}
