import { View, Text, ScrollView } from "react-native";
import React, { useContext } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/Avatar";
import { UserContext } from "@/contexts/UserContext";
import ProfileLink from "@/components/profile-link";

const Profile = () => {
  const { user } = useContext(UserContext);

  if (!user) return null;

  console.log(user.username);

  return (
    <ScrollView className="flex-1 bg-black px-6 pt-12">
      <View className="w-full items-center justify-center gap-4 border border-b-white/10 pb-10">
        <Avatar className="h-36 w-36">
          <AvatarImage
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${user?.avatar.tmdb.avatar_path}`,
            }}
          />
          <AvatarFallback>{user?.username.split("")[0]}</AvatarFallback>
        </Avatar>
        <Text className="font-bold text-2xl text-white">{user?.username}</Text>
      </View>

      <View className="gap-3 pt-10">
        <ProfileLink text="Editar Perfil" />
        <ProfileLink text="Alterar Plano" />
        <ProfileLink text="Limitar Idade" />
        <ProfileLink text="Excluir Conta" />
        <ProfileLink text="Precisa de Ajuda?" />
        <ProfileLink text="Encerrar Sessão" />
      </View>
    </ScrollView>
  );
};

export default Profile;
