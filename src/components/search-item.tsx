import { View, Image, Dimensions } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { Audiovisual } from "@/models/audiovisual.model";

interface SearchItemProps {
  audiovisual: Audiovisual;
  numColumns: number;
}

const SearchItem = ({ audiovisual, numColumns }: SearchItemProps) => {
  const url =
    audiovisual.media_type === "tv"
      ? `tv-show-details/${audiovisual.id}`
      : `movie-details/${audiovisual.id}`;

  // Calcula a largura de cada coluna com base na largura total do dispositivo e no número de colunas
  const columnWidth = Dimensions.get("window").width / numColumns - 4; // Subtraia o espaço adicional para o gap

  return (
    <Link href={url}>
      <View
        style={{
          width: columnWidth,
          height: columnWidth * 1.3,
          borderRadius: 10,
          margin: 2,
        }}
      >
        <Image
          style={{ flex: 1, borderRadius: 10 }}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${audiovisual.poster_path}`,
          }}
        />
      </View>
    </Link>
  );
};

export default SearchItem;
