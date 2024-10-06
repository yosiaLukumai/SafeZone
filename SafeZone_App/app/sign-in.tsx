import { Text, View, BackHandler, TouchableOpacity, StyleSheet, Image, ToastAndroid } from 'react-native';
import { useSession } from './../context/contex';
import { router } from 'expo-router';

import { useEffect, useRef, useState } from 'react';

import { TextInput } from 'react-native-gesture-handler';
import { ConfigurationsSetting } from '@/constants/Colors';
import UnderGroundProcess from '@/components/UnderGroundProcess';

export default function SignIn() {
  const { signIn } = useSession();
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [loader, setLoader] = useState(false)


  const NavigateRegister = (): void => {
    router.push("/sign-up")
  }

  const LoginInUser = async (): Promise<void> => {
    if (password.trim() != "" && email.trim() != "") {
      try {
        setLoader(true)
        const response = await fetch(`${ConfigurationsSetting.backendURL}/user/login`, {
          mode: "cors",
          headers: {
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({
            email: email.trim(),
            password: password.trim(),
          })
        })

        const result = await response.json()
        if (result?.success) {
          signIn(JSON.stringify(result?.body))
          router.replace('/');
        } else {
          ToastAndroid.show(result?.body == null ? "No such user" : result?.body, ToastAndroid.SHORT);
        }
        setLoader(false)

      } catch (error) {
        console.log(error);
        
        setLoader(false)
        ToastAndroid.show('login failed!', ToastAndroid.SHORT);
      }
    } else {
      ToastAndroid.show('fill all required fields!', ToastAndroid.SHORT);
    }
  }



  useEffect(() => {
    const backAction = () => {
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      {
        loader ? (<UnderGroundProcess loaderColor='yellow' textMSG='Processing.' />) : (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#0e1a25" }}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View style={{}}>
              <Image
                style={styles.image}
                source={require('../assets/images/shield.png')}
              />
            </View>
            <View style={{ marginVertical: 16 }}>
              <Text style={{ fontSize: 23, fontWeight: "700", color: "white" }}>
                SafeZone
              </Text>
            </View>
            <View>
              <Text style={styles.label}>Email</Text>
              <TextInput
                placeholder="email"
                autoCapitalize="none"
                placeholderTextColor="#95a6a8"
                nativeID="email"
                onChangeText={setEmail}
                value={email}
                style={styles.textInput}
              />
            </View>
            <View>
              <Text style={styles.label}>Password</Text>
              <TextInput
                placeholder="password"
                secureTextEntry={true}
                placeholderTextColor="#95a6a8"
                nativeID="password"
                onChangeText={setPassword}
                value={password}
                style={styles.textInput}
              />
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() => LoginInUser()}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <View style={{ marginTop: 32 }}>
              <Text
                style={{ fontWeight: "500", color: "white", fontSize: 15 }}
                onPress={() => NavigateRegister()}
              >
                Click Here To Create A New Account
              </Text>
            </View>
          </View>
        </View>)
      }

    </View>

  );
}


const styles = StyleSheet.create({
  label: {
    marginBottom: 4,
    color: "white",
    fontWeight: "400",
    fontSize: 18,
  },
  textInput: {
    width: 280,
    borderWidth: 0.8,
    borderRadius: 4,
    borderColor: "#04c400",
    paddingHorizontal: 8,
    paddingVertical: 4,
    opacity: 0.8,
    // fontSize: 15,
    marginBottom: 16,
    backgroundColor: "#202938",
    color: "#0abe0a",
  },
  button: {
    backgroundColor: "#1bad50",
    padding: 10,
    width: 280,
    borderRadius: 5,
    marginTop: 16,
    fontWeight: "bold"
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 18,
  },
  image: {
    width: 150,
    height: 150,
  },
});
