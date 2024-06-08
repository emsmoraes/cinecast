import { ScrollView, Text, View } from "react-native";
import React from "react";
import HomeCarousel from "@/components/home-carousel";
import RecommendedMovies from "@/components/recommended-movies";
import RecommendedTvShows from "@/components/recommended-tv-shows";
import PlayingAudiovisual from "@/components/playing-audiovisual";

const Index = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="flex-1 bg-black pt-12"
    >
      <HomeCarousel />

      <View className="mt-2">
        <Text className="mb-3 mt-2 px-6 font-ralewaySemiBold text-[17px] text-white">
          Continue de onde parou
        </Text>
        <PlayingAudiovisual />
      </View>

      <View className="mt-2">
        <Text className="mb-3 mt-2 px-6 font-ralewaySemiBold text-[17px] text-white">
          Entretenimento garantido
        </Text>
        <RecommendedMovies />
      </View>

      <View className="mt-3 pb-16">
        <Text className="mb-3 mt-2 px-6 font-ralewaySemiBold text-[17px] text-white">
          Uma série de emoções
        </Text>
        <RecommendedTvShows />
      </View>
    </ScrollView>
  );
};

export default Index;
