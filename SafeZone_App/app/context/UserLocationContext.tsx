import { createContext } from "react"
import * as Location from 'expo-location';
export const UserLocationContext = createContext<Location.LocationObjectCoords | null | any>(null)
