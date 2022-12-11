import { useCallback, useEffect } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Archivo_400Regular,
  Archivo_700Bold,
} from "@expo-google-fonts/archivo";
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";

import AppStack from "./src/routes/AppStack";

export default function App() {
  const [fontsLoaded] = useFonts({
    ArchivoRegular: Archivo_400Regular,
    ArchivoBold: Archivo_700Bold,
    PoppinsRegular: Poppins_400Regular,
    PoppinsSemiBold: Poppins_600SemiBold,
  });

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (error) {
        console.warn(error);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <StatusBar barStyle="dark-content" />
      <AppStack />
    </SafeAreaView>
  );
}
