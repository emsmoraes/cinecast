import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { Input } from "@/components/Input";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import { cn } from "@/lib/utils";

const Index = () => {
  const [loading, setLoading] = React.useState(false);

  const navigate = router;

  const login = () => {
    setLoading(true);
    setTimeout(() => {
      navigate.push("(tabs)");
    }, 200);
  };

  return (
    <View className="flex-1 bg-primaryZinc-900 px-5 pt-16">
      <Image
        source={require("../assets/images/logo.png")}
        className="h-20 w-20"
      />
      <View className="pt-20">
        <Text className="text-center font-ralewaySemiBold text-[19px] text-white">
          Seus filmes e series favoritos {"\n"}{" "}
          <Text className="text-[24px] text-primaryRed-900/80 ">
            em um só lugar
          </Text>
        </Text>

        <View className="mt-16 gap-4">
          <Input
            placeholder="Insira seu email"
            className="rounded-2xl border border-zinc-600/10 bg-zinc-800/20 px-4 py-3 text-[16px] text-white"
          />
          <Input
            placeholder="Insira sua senha"
            className="rounded-2xl border border-zinc-600/10 bg-zinc-800/20 px-4 py-3 text-[16px] text-white"
            secureTextEntry={true}
          />
          <Pressable
            disabled={loading}
            onPress={login}
            className={cn(
              "mt-3 w-full flex-row items-center justify-center gap-2 rounded-2xl bg-primaryRed-900/80 px-4 py-3",
              {
                "bg-red-500/80 text-gray-100/80": loading,
              },
            )}
          >
            <Text className="text-center font-ralewaySemiBold text-[16px] text-white">
              {loading ? "Entrando..." : "Entrar"}
            </Text>
            {loading ? (
              <AntDesign
                name="loading1"
                className="animate-spin"
                size={19}
                color="white"
              />
            ) : (
              <MaterialIcons name="arrow-forward-ios" size={19} color="white" />
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Index;
