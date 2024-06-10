import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { api } from "@/lib/api";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import Fontisto from "@expo/vector-icons/Fontisto";
import Badge from "@/components/badge";
import { Skeleton } from "@/components/Skeleton";
import { MovieDetails } from "@/models/movie-details";
import MovieCard from "@/components/movie-card";
import { MovieResponse } from "@/models/movie.model";

const TvShowDetails = () => {
  const local = useLocalSearchParams();
  const [audiovisual, setAudiovisual] = useState<MovieDetails>();

  const [related, setRelated] = useState<MovieResponse>();

  const getAudiovisual = async () => {
    await api.get(`3/movie/${local.id}`).then((response) => {
      setAudiovisual(response.data);
    });
  };

  const getRelated = async () => {
    await api
      .get(`3/movie/${local.id}/similar`)
      .then((response) => {
        console.log(response.data);
        setRelated(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getRelated();
    getAudiovisual();
  }, []);

  const goBack = () => {
    router.back();
  };

  if (!audiovisual || (related && related.results.length === 0)) {
    // !audiovisual || (related && related.results.length === 0)
    return (
      <ScrollView className="flex-1 bg-black pt-12">
        <Skeleton className="h-[180px] w-full" />

        <View className="flex-row items-center justify-between px-6 pt-3">
          <Skeleton className="h-[20px] w-[70%] rounded-sm" />
          <Skeleton className="h-[15px] w-[20%] rounded-sm" />
        </View>

        <View className="flex-row items-center gap-2 px-6 pt-5">
          {[1, 2, 3, 4].map((item) => (
            <Skeleton key={item} className="h-[20px] w-[80px] rounded-sm" />
          ))}
        </View>

        <View className="mt-5 gap-1 px-6">
          <Skeleton className="h-[10px] w-[90%]" />
          <Skeleton className="h-[10px] w-[70%]" />
          <Skeleton className="h-[10px] w-[60%]" />
          <Skeleton className="h-[10px] w-[78%]" />
          <Skeleton className="h-[10px] w-[69%]" />
        </View>

        <View className="mt-10 px-6 pb-28">
          <Skeleton className="h-[16px] w-[90%]" />

          <View className="mt-5 flex-row gap-3">
            {[1, 2, 3, 4, 5].map((item) => (
              <View className="w-[160px]" key={item}>
                <Skeleton className="h-[200px] w-full rounded-lg" />
                <Skeleton className="mt-2 h-[11px] w-[85%] rounded-sm" />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView className="bg-black pt-12" showsVerticalScrollIndicator={false}>
      <View className="relative">
        <Pressable onPress={goBack} className="absolute left-5 top-5 z-40">
          <BlurView intensity={90} style={styles.blurContainer}>
            <SimpleLineIcons name="arrow-left" size={24} color="white" />
          </BlurView>
        </Pressable>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${audiovisual.backdrop_path}`,
          }}
          className="h-[180px] w-full"
        />
      </View>

      <View className="flex-row items-center justify-between px-6 pt-3">
        <Text className="w-[70%] font-ralewayBold text-[22px] text-white">
          {audiovisual.original_title}
        </Text>
        <View className="flex-row items-center gap-2">
          <Fontisto name="star" size={15} color="yellow" />
          <Text className="font-medium text-[14px] text-white">
            {audiovisual.vote_average.toFixed(1)}
            <Text className="text-[11px]">/10</Text>
          </Text>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row items-center gap-2 px-6 pt-5">
          {audiovisual.genres.map((genre) => (
            <Badge key={genre.id} text={genre.name} />
          ))}
        </View>
      </ScrollView>

      <Text className="px-6 pt-5 text-[14px] font-light text-zinc-100">
        {audiovisual.overview}
      </Text>

      <View className="pb-28 pt-10">
        <Text className="mb-3 px-6 text-[17px] font-semibold text-white">
          Você pode gostar
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-4 px-6">
            {related?.results.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  blurContainer: {
    flex: 1,
    padding: 10,
    overflow: "hidden",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  picker: {
    height: 50,
    width: 150,
    color: "#000",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    borderColor: "#000",
    borderWidth: 1,
  },
  pickerItem: {
    height: 44,
    color: "#333",
  },
});

export default TvShowDetails;
