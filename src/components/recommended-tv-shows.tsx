import { View, ScrollView } from "react-native";
import React from "react";
import TvShowCard from "./tv-show-card";
import { Skeleton } from "./Skeleton";
import { useBestTvShowIndexQuery } from "@/queries/tv-show.index";
import { randomId } from "@/utils/randomId";

const RecommendedTvShows = () => {
  const {
    data: TvShows,
    isSuccess: isTvShowsSuccess,
    isLoading,
  } = useBestTvShowIndexQuery({
    page: 1,
  });

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View className="flex-row gap-4 px-6">
        {isTvShowsSuccess &&
          TvShows?.results.map((tvShow) => (
            <TvShowCard tvShow={tvShow} key={tvShow.id} />
          ))}
        {isLoading &&
          [...Array(10)].map((_, index) => (
            <View key={`skeleton-${index}-${randomId()}`}>
              <Skeleton
                key={`skeleton1-${index}-${randomId()}`}
                className="h-[200px] w-[160px] rounded-lg"
              />
              <Skeleton
                key={`skeleton2-${index}-${randomId()}`}
                className="mt-2 h-[10px] w-[160px] rounded-lg"
              />
            </View>
          ))}
      </View>
    </ScrollView>
  );
};

export default RecommendedTvShows;
