import { View, ScrollView } from "react-native";
import React from "react";
import { Skeleton } from "./Skeleton";
import { randomId } from "@/utils/randomId";
import { usePlayingNowMoviesIndexQuery } from "@/queries/audiovisual";
import AudiovisualCard from "./audiovisual-card";

const PlayingAudiovisual = () => {
  const {
    data: audiovisuals,
    isSuccess: isAudiovisualSuccess,
    isLoading,
  } = usePlayingNowMoviesIndexQuery({
    page: 6,
  });

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View className="flex-row gap-4 px-6">
        {isAudiovisualSuccess &&
          audiovisuals?.results.map((movie) => (
            <AudiovisualCard
              isPlaying
              banner
              audiovisual={movie}
              key={movie.id}
            />
          ))}
        {isLoading &&
          [...Array(10)].map((_, index) => (
            <View key={`skeleton-${index}-${randomId()}`}>
              <Skeleton
                key={`skeleton1-${index}-${randomId()}`}
                className="h-[110px] w-[210px] rounded-lg"
              />
              <Skeleton
                key={`skeleton2-${index}-${randomId()}`}
                className="mt-2 h-[10px] w-[210px] rounded-lg"
              />
            </View>
          ))}
      </View>
    </ScrollView>
  );
};

export default PlayingAudiovisual;
