import { View, Text } from "react-native";
import React from "react";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

interface ProfileLinkProps {
  text: string;
}

const ProfileLink = ({ text }: ProfileLinkProps) => {
  return (
    <View className="w-full flex-row items-center justify-between rounded-2xl bg-white/10 px-4 py-3">
      <Text className="font-ralewaySemiBold text-xl text-white">{text}</Text>
      <SimpleLineIcons name="arrow-right" size={19} color="white" />
    </View>
  );
};

export default ProfileLink;
