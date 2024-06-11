import { AudiovisualResponse } from "@/models/audiovisual.model";
import { Service } from "@/services";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

async function fetcher(): Promise<AudiovisualResponse> {
  return await Service.audiovisual.indexPlayingNow();
}

export function usePlayingNowMoviesIndexQuery(): UseQueryResult<
  AudiovisualResponse,
  Error | AxiosError
> {
  return useQuery({
    queryKey: ["PLAYING-NOW-MOVIE-INDEX"],
    queryFn: () => fetcher(),
  });
}
