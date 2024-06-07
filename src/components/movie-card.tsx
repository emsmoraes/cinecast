import { View, Text, Image } from "react-native";
import React from "react";
import { Movie } from "@/models/movie.model";
import { cn } from "@/lib/utils";

interface MovieCardProps {
  movie: Movie;
  banner?: boolean;
}

const MovieCard = ({ movie, banner = false }: MovieCardProps) => {
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
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
      />
      <Text className="mt-2 font-ralewaySemiBold text-[13px] leading-5 text-white">
        {movie.title}
      </Text>
    </View>
  );
};

export default MovieCard;
