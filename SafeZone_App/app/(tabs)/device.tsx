import DeviceInfo from '@/components/DevicesInfo';
import UnderGroundProcess from '@/components/UnderGroundProcess';
import { ConfigurationsSetting } from '@/constants/Colors';
import { useStorageState } from '@/context/useStorage';
import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ToastAndroid } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Tab() {
  const [devices, setDevices] = useState<null | any>(null);
  const [[isLoading, session], setSession] = useStorageState('session');
  const [user, setUser] = useState<null | any>(null);
  const [errors, setErrors] = useState(false);

  useEffect(() => {
    if (session != null) {
      let myUser = JSON.parse(session);
      setUser(myUser?.user);
    }
  }, [session]);

  useFocusEffect(
    useCallback(() => {
      if (user?._id) {
        setDevices(null);
        FetchDevices(user?._id);
      }
      return () => {};
    }, [user?._id]) // Add user._id as a dependency
  );

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
      ToastAndroid.show('Failed to load devices', ToastAndroid.SHORT); // Display error message to the user
    }
  }

  useEffect(() => {
    if (user) {
      FetchDevices(user?._id); // Fetch devices when user is available
    }
  }, [user]);

  return (
    <SafeAreaProvider>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          {!devices && !errors ? (
            <UnderGroundProcess loaderColor="yellow" textMSG="Loading..." />
          ) : (
            <View style={{ flex: 1 }}>
              {errors && (
                <Text style={{ color: 'red', textAlign: 'center', marginVertical: 10 }}>
                  Could not load devices.
                </Text>
              )}
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
                      <DeviceInfo device={device} />
                    </View>
                  ))}
                  <View style={{ paddingBottom: 90 }}></View>
                </View>
              ) : (
                <Text style={{ color: 'white', textAlign: 'center', marginVertical: 20 }}>
                  No devices found.
                </Text>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#111827',
  },
});
