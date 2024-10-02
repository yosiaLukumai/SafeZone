import { Slot } from "expo-router";  // This handles the navigation structure
import { UserLocationContext } from './app/context/UserLocationContext';  // Example of your custom provider
import { useEffect, useState } from "react";
import * as Location from 'expo-location';
console.log("App.tsx is running...");

export default function App() {
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null | any>(null);
  console.log("justmmmmmmmmmmmmmmmmmmmm");
  
  useEffect(() => {
    (async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            console.log(status);
            
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            console.log("reached..");
            
            let location = await Location.getCurrentPositionAsync({});
            console.log(location);
            setLocation(location.coords);
        } catch (error) {
            console.log(error, "error");
            
        }

        
    })();
}, []);

  return (
    <UserLocationContext.Provider value={{ location, setLocation }} >
      {/* <Slot />  This renders the appropriate route based on the URL */}
    </UserLocationContext.Provider>
  );
}
