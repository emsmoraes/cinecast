import { View, Text, Image } from "react-native";
import React from "react";
import { TvShow as TvShowInterface } from "@/models/tv-show.model";
import { cn } from "@/lib/utils";

interface TvShowCardProps {
  tvShow: TvShowInterface;
  banner?: boolean;
}

const TvShow = ({ tvShow, banner = false }: TvShowCardProps) => {
  return (
    <View
      className={cn("w-[160px] rounded-lg", {
        "w-[210px]": banner,
      })}
    >
      <Image
        className={cn("h-[200px] w-full rounded-t-lg", {
          "h-[110px] rounded-lg": banner,
        })}
        source={{ uri: `https://image.tmdb.org/t/p/w500${tvShow.poster_path}` }}
      />
      <Text className="mt-2 font-ralewaySemiBold text-[13px] leading-5 text-white">
        {tvShow.name}
      </Text>
    </View>
  );
};

export default TvShow;
