import React, { useContext, useEffect } from "react";
import { Tabs } from "expo-router";
import Foundation from "@expo/vector-icons/Foundation";
import Ionicons from "@expo/vector-icons/Ionicons";
import theme from "@/theme";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { UserContext } from "@/contexts/UserContext";

const Layout = () => {
  const { setUserRequest, user } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      setUserRequest();
    }
  }, []);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.colors.primaryRed[900],
        tabBarInactiveTintColor: "#8E8E8E",
        tabBarStyle: {
          backgroundColor: theme.colors.black,
          borderColor: theme.colors.black,
          borderTopColor: theme.colors.black,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Foundation name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="user-circle" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
