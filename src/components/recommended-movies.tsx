import { View, ScrollView } from "react-native";
import React from "react";
import MovieCard from "./movie-card";
import { Skeleton } from "./Skeleton";
import { useBestMoviesIndexQuery } from "@/queries";
import { randomId } from "@/utils/randomId";

const RecommendedMovies = () => {
  const {
    data: movies,
    isSuccess: isMoviesSuccess,
    isLoading,
  } = useBestMoviesIndexQuery({
    page: 1,
  });

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View className="flex-row gap-4 px-6">
        {isMoviesSuccess &&
          movies?.results.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
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

export default RecommendedMovies;
