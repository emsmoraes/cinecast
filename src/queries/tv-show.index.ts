import { Service } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import type { UseQueryResult } from "@tanstack/react-query";
import { Query } from "@/models/params.model";
import { TvShowResponse } from "@/models/tv-show.model";

async function fetcher(params: Partial<Query>): Promise<TvShowResponse> {
  return await Service.tvShow.indexTheBest(params);
}

export function useBestTvShowIndexQuery(
  params: Partial<Query>,
): UseQueryResult<TvShowResponse, Error | AxiosError> {
  return useQuery({
    queryKey: ["TV-SHOW-INDEX", params],
    queryFn: () => fetcher(params),
  });
}
