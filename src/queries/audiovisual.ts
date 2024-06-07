import { AudiovisualResponse } from "@/models/audiovisual.model";
import { Query } from "@/models/params.model";
import { Service } from "@/services";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

async function fetcher(params: Partial<Query>): Promise<AudiovisualResponse> {
  return await Service.audiovisual.indexPlayingNow(params);
}

export function usePlayingNowMoviesIndexQuery(
  params: Partial<Query>,
): UseQueryResult<AudiovisualResponse, Error | AxiosError> {
  return useQuery({
    queryKey: ["PLAYING-NOW-MOVIE-INDEX", params],
    queryFn: () => fetcher(params),
  });
}
