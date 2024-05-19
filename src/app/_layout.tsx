import { View, Text, StatusBar } from "react-native";
import React from "react";
import { Slot } from "expo-router";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const Layout = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <Slot />
      </View>
    </QueryClientProvider>
  );
};

export default Layout;
