import { MovieResponse } from "@/models/movie.model";
import { Service } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import type { UseQueryResult } from "@tanstack/react-query";

async function fetcher(params?: unknown): Promise<MovieResponse[]> {
  return await Service.movie.indexTheBest(params);
}

export function useMoodListQuery(
  params?: unknown,
): UseQueryResult<MovieResponse[], Error | AxiosError> {
  return useQuery({
    queryKey: ["MOOD-LIST", params],
    queryFn: () => fetcher(params),
  });
}
