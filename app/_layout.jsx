import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { CreateTripContext } from './../context/CreateTripContext';
import { useState } from "react";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'outfit': require('../assets/fonts/Outfit-Bold.ttf'),
    'medium': require('../assets/fonts/Outfit-Medium.ttf'),
    'regular': require('../assets/fonts/Outfit-Regular.ttf'),
  });

  const [tripData, setTripData] = useState([]);

  if (!fontsLoaded) {
    return   // Return a loading screen until fonts are loaded
  }

  return (
    <CreateTripContext.Provider value={{ tripData, setTripData }}>
      <Stack screenOptions={{ headerShown:false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </CreateTripContext.Provider>
  );
}
