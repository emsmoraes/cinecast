import { View, Text, Image } from "react-native";
import React from "react";
import { EpisodeDetails } from "@/models/tv-show-details.model";

interface EpisodeCardProps {
  episode: EpisodeDetails;
}

const EpisodeCard = ({ episode }: EpisodeCardProps) => {
  return (
    <View className="w-[200px]">
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${episode.still_path}` }}
        className="h-[130px] w-full rounded-lg object-cover object-center"
      />
      <Text className="mt-2 text-[14px] font-[400] text-white">
        {episode.name}
      </Text>
    </View>
  );
};

export default EpisodeCard;
