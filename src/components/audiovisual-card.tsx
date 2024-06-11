import { View, Text, Image } from "react-native";
import React from "react";
import { cn } from "@/lib/utils";
import { Audiovisual } from "@/models/audiovisual.model";
import { Link } from "expo-router";

interface MovieCardProps {
  audiovisual: Audiovisual;
  banner?: boolean;
  isPlaying?: boolean;
}

const getRandomPercentage = () => {
  return Math.floor(Math.random() * 99) + 1;
};

const AudiovisualCard = ({
  audiovisual,
  banner = false,
  isPlaying = false,
}: MovieCardProps) => {
  const viewWidth = getRandomPercentage();

  const url =
    audiovisual.media_type === "tv"
      ? `tv-show-details/${audiovisual.id}`
      : `movie-details/${audiovisual.id}`;

  console.log(audiovisual.media_type);

  return (
    <Link href={url}>
      <View
        className={cn("w-[160px] rounded-lg", {
          "w-[210px]": banner,
        })}
      >
        <View
          className={cn("h-[200px]", {
            "h-[110px]": banner,
          })}
        >
          <Image
            className={cn("h-full w-full rounded-t-lg", {
              "rounded-lg": banner && !isPlaying,
            })}
            source={{
              uri: `https://image.tmdb.org/t/p/w500${audiovisual.poster_path}`,
            }}
          />
          {isPlaying && (
            <View
              style={{
                width: `${viewWidth}%`,
              }}
              className={`h-[2px] rounded-b-xl bg-red-700`}
            />
          )}
        </View>

        <Text className="mt-2 font-ralewaySemiBold text-[13px] leading-5 text-white">
          {audiovisual.title}
        </Text>
      </View>
    </Link>
  );
};

export default AudiovisualCard;
