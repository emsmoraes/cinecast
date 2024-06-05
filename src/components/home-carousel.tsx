import { cn } from "@/lib/utils";
import { useMovieIndexQuery } from "@/queries";
import React, { useState } from "react";
import { Dimensions, Image, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const HomeCarousel = () => {
  const width = Dimensions.get("window").width;
  const [activeSlide, setActiveSlide] = useState(0);

  const { data: movies, isSuccess: isMoodListSuccess } = useMovieIndexQuery({
    page: 1,
  });

  console.log(movies, isMoodListSuccess);

  const images = [
    "https://i.ytimg.com/vi/PekahRjvVY0/maxresdefault.jpg",
    "https://i.ytimg.com/vi/PekahRjvVY0/maxresdefault.jpg",
    "https://i.ytimg.com/vi/PekahRjvVY0/maxresdefault.jpg",
    "https://i.ytimg.com/vi/PekahRjvVY0/maxresdefault.jpg",
  ];

  return (
    <View className="pb-2">
      <View style={{ height: width / 2, width: width }}>
        <Carousel
          width={width}
          height={width / 2}
          data={images}
          scrollAnimationDuration={1000}
          onProgressChange={(_, slideProgress) => {
            if (slideProgress % 1 === 0) {
              setActiveSlide(slideProgress);
            }
          }}
          renderItem={(item) => (
            <Image source={{ uri: item.item }} className="flex-1 bg-red-600" />
          )}
        />
      </View>

      <View className="flex-row items-center justify-center gap-2 pt-3">
        {Array.from({ length: images.length }).map((_, index) => (
          <View
            className={cn("h-2 w-2 rounded-full bg-zinc-400", {
              "bg-zinc-600": index === activeSlide,
            })}
            key={index}
          />
        ))}
      </View>
    </View>
  );
};

export default HomeCarousel;
