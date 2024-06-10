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
import {
  Season,
  TvShowDetails as TvShowDetailsInterface,
  TvShowResponse,
} from "@/models/tv-show.model";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import Fontisto from "@expo/vector-icons/Fontisto";
import { cn } from "@/lib/utils";
import EpisodeCard from "@/components/episode-card";
import Badge from "@/components/badge";
import { Skeleton } from "@/components/Skeleton";
import { randomId } from "@/utils/randomId";
import TvShowCard from "@/components/tv-show-card";
import { EpisodeDetails } from "@/models/tv-show-details.model";

const TvShowDetails = () => {
  const local = useLocalSearchParams();
  const [audiovisual, setAudiovisual] = useState<TvShowDetailsInterface>();
  const [currentSeason, setCurrentSeason] = useState<Season>();

  const [episodes, setEpisodes] = useState<EpisodeDetails[]>([]);
  const [loadingEpisodes, setLoadingEpisodes] = useState(false);

  const [related, setRelated] = useState<TvShowResponse>();

  const getAudiovisual = async () => {
    await api.get(`3/tv/${local.id}`).then((response) => {
      setAudiovisual(response.data);
      setCurrentSeason(response.data.seasons[0]);
    });
  };

  const getEpisodes = async () => {
    setLoadingEpisodes(true);

    await api
      .get(`3/tv/${local.id}/season/${currentSeason?.season_number}`)
      .then((response) => {
        console.log(response.data.episodes[0]);
        setEpisodes(response.data.episodes);
        setLoadingEpisodes(false);
      })
      .catch((error) => {
        console.log(error);
        setLoadingEpisodes(false);
      });
  };

  const getRelated = async () => {
    await api
      .get(`3/tv/${local.id}/similar`)
      .then((response) => {
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

  useEffect(() => {
    if (currentSeason) {
      getEpisodes();
    }
  }, [currentSeason]);

  const goBack = () => {
    router.back();
  };

  if (!audiovisual || related?.results?.length === 0) {
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

        <View className="mt-5 flex-row gap-3 px-6">
          {[1, 2, 3, 4].map((item) => (
            <Skeleton key={item} className="h-9 w-9 rounded-lg" />
          ))}
        </View>

        <View className="mt-5 px-6">
          <Skeleton className="h-[16px] w-[90%]" />

          <View className="mt-5 flex-row gap-3">
            {[1, 2, 3, 4].map((item) => (
              <View className="w-[200px]" key={item}>
                <Skeleton className="h-[130px] w-full rounded-lg" />
                <Skeleton className="mt-2 h-[11px] w-[85%] rounded-sm" />
              </View>
            ))}
          </View>
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

  const handleSeasonPress = (id: number) => {
    setCurrentSeason(audiovisual.seasons.find((season) => season.id === id));
  };

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
          {audiovisual.name}
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

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="pt-5"
      >
        <View className="flex-row gap-3 px-6">
          {audiovisual.seasons.map((season) => (
            <Pressable
              onPress={() => handleSeasonPress(season.id)}
              key={season.id}
              className={cn(
                "rounded-lg border border-transparent bg-primaryRed-900/10 px-4 py-3 ",
                {
                  "border-primaryRed-900/20 bg-primaryRed-900/15":
                    season.id === currentSeason?.id,
                },
              )}
            >
              <Text
                className={cn(
                  "text-center text-[15px] font-semibold text-primaryRed-900/60",
                  {
                    "text-primaryRed-900": season.id === currentSeason?.id,
                  },
                )}
              >
                {season.season_number}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <View>
        <Text className="px-6 pt-5 text-[17px] font-semibold text-white">
          Episódios - {currentSeason?.episode_count}
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="pt-5"
        >
          <View className="flex-row gap-3 px-6">
            {loadingEpisodes
              ? [...Array(10)].map((_, index) => (
                  <View key={`skeleton-${index}-${randomId()}`}>
                    <Skeleton
                      key={`skeleton1-${index}-${randomId()}`}
                      className="h-[130px] w-[200px] rounded-lg"
                    />
                    <Skeleton
                      key={`skeleton2-${index}-${randomId()}`}
                      className="mt-2 h-[11px] w-[200px] rounded-lg"
                    />
                  </View>
                ))
              : episodes.map((episode) => (
                  <EpisodeCard episode={episode} key={episode.id} />
                ))}
          </View>
        </ScrollView>
      </View>

      <View className="pb-28 pt-10">
        <Text className="mb-3 px-6 text-[17px] font-semibold text-white">
          Você pode gostar
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-4 px-6">
            {related?.results.map((tvShow) => (
              <TvShowCard tvShow={tvShow} key={tvShow.id} />
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
