import {
  View,
  TextInput,
  Pressable,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { api } from "@/lib/api";
import { AudiovisualResponse } from "@/models/audiovisual.model";
import SearchItem from "@/components/search-item";
import { Skeleton } from "@/components/Skeleton";

const Search = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [audiovisuals, setAudiovisuals] = useState<AudiovisualResponse>();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const numColumns = 2;

  const defaultSearch = "DC";

  const columnWidth = Dimensions.get("window").width / numColumns - 4;

  const debounce = <T extends (...args: string[]) => void>(
    cb: T,
    delay: number = 1000,
  ): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout | null = null;
    return (...args: Parameters<T>) => {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        timeout = null;
        cb(...args);
      }, delay);
    };
  };

  const onInput = (searchValue: string): void => {
    setSearch(searchValue);
  };

  const onInputWithDebouncing = useCallback(debounce(onInput, 1000), []);

  const getAudiovisuals = useCallback(() => {
    const encodedSearch =
      search !== "" ? encodeURIComponent(search) : defaultSearch;
    setIsLoading(true);
    api
      .get(`3/search/multi?query=${encodedSearch}&page=${1}`)
      .then((response) => {
        const itemsWithPosterPath = response.data.results.filter(
          (item: { poster_path?: string }) => item.poster_path,
        );
        setAudiovisuals({
          results: itemsWithPosterPath,
          total_pages: response.data.total_pages,
          total_results: response.data.total_results,
          page: response.data.page,
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [search]);

  const loadMoreAudiovisuals = () => {
    setIsLoadingMore(true);
    const encodedSearch =
      search !== "" ? encodeURIComponent(search) : defaultSearch;
    setPage(page + 1);
    api
      .get(`3/search/multi?query=${encodedSearch}&page=${page}`)
      .then((response) => {
        const itemsWithPosterPath = response.data.results.filter(
          (item: { poster_path?: string }) => item.poster_path,
        );
        if (!audiovisuals) {
          return;
        }
        setAudiovisuals({
          results: [...audiovisuals.results, ...itemsWithPosterPath],
          total_pages: response.data.total_pages,
          total_results: response.data.total_results,
          page: response.data.page,
        });
        setIsLoadingMore(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoadingMore(false);
      });
  };

  useEffect(() => {
    getAudiovisuals();
  }, [search]);

  return (
    <View className="flex-1 bg-black pt-12">
      <View className="mt-2 px-6">
        <View className="w-full flex-row items-center  gap-3 rounded-2xl border border-zinc-300/10  bg-zinc-600/20 px-4 text-white">
          <Ionicons name="search" size={20} color={"white"} />
          <TextInput
            onChange={(e) => onInputWithDebouncing(e.nativeEvent.text)}
            placeholder="Pesquisar filme ou série"
            className="flex-1 border-none border-transparent bg-transparent py-4 pl-2 text-[18px] text-white"
          />
          <Pressable>
            <AntDesign
              name="close"
              size={24}
              color={search !== "" ? "white" : "transparent"}
            />
          </Pressable>
        </View>
      </View>

      {isLoading ? (
        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          renderItem={({ item }) => (
            <View key={`skeleton-${item}`}>
              <Skeleton
                className={`w-[${columnWidth}px] h-[${(columnWidth * 1.3).toFixed(0)}px] m-[2px] rounded-[10px]`}
              />
            </View>
          )}
          numColumns={numColumns}
          keyExtractor={(item) => item.toString()}
          style={{ flex: 1, marginTop: 10 }}
          columnWrapperStyle={{
            justifyContent: "space-between",
            paddingVertical: 4,
            gap: 4,
          }}
        />
      ) : (
        <>
          <FlatList
            data={audiovisuals?.results}
            renderItem={({ item }) => (
              <SearchItem
                key={item.id}
                numColumns={numColumns}
                audiovisual={item}
              />
            )}
            onEndReached={loadMoreAudiovisuals}
            numColumns={numColumns}
            keyExtractor={(item, index) =>
              item.id ? index.toString() : `key-${index}`
            }
            style={{ flex: 1, marginTop: 10, marginBottom: 10 }}
            columnWrapperStyle={{
              justifyContent: "space-between",
              paddingVertical: 4,
              gap: 4,
            }}
            showsVerticalScrollIndicator={false}
          />

          {isLoadingMore && <ActivityIndicator size={27} />}
        </>
      )}
    </View>
  );
};

export default Search;
