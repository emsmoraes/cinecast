import { View, Text, StatusBar } from "react-native";
import React from "react";
import { Slot } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import * as SplashScreen from "expo-splash-screen";
import "../styles/global.css";
SplashScreen.preventAutoHideAsync();

const Layout = () => {
  const queryClient = new QueryClient();

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  if (fontsLoaded) {
    SplashScreen.hideAsync();
  }

  return (
    <QueryClientProvider client={queryClient}>
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        {fontsLoaded && <Slot />}
      </View>
    </QueryClientProvider>
  );
};

export default Layout;
