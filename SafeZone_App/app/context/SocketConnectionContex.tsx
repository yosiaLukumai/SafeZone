import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useRouter } from 'expo-router'; // Import useRouter from expo-router
import { ConfigurationsSetting } from '@/constants/Colors';

// Define a new context value that includes both the socket and the thereDisaster state

interface Row {
    phone: string;
    name: string;
    MNO: string;
}

interface NotificationHolder {
    name: String;
    listTobeNotified: Row[],
    owner: String,
    notification: string,
    serialNumber: String,
}
interface SocketContextType {
    socket: Socket | null;
    thereDisaster: boolean;
    setThereDisaster: (value: boolean) => void;
}

const SocketContext = createContext<SocketContextType | null>(null);

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [thereDisaster, setThereDisaster] = useState(false); // Initialize thereDisaster to false
    const router = useRouter(); // Use router from Expo Router

    useEffect(() => {
        const socketInstance = io(ConfigurationsSetting.backendURL);
        setSocket(socketInstance);

        const handleCriticalNotification = (data: any) => {
            const parsedData: NotificationHolder = JSON.parse(data)
            setThereDisaster(true); // Set thereDisaster to true when fire is detected
            router.push(`/fireDetected?disasterType=${parsedData.notification}`);
        };

        socketInstance.on("notificationCritical", handleCriticalNotification);

        return () => {
            socketInstance.off("criticalNotification", handleCriticalNotification);
            socketInstance.disconnect();
        };
    }, [router]);

    return (
        <SocketContext.Provider value={{ socket, thereDisaster, setThereDisaster }}>
            {children}
        </SocketContext.Provider>
    );
};
