import { MovieResponse } from "@/models/movie.model";
import { Service } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import type { UseQueryResult } from "@tanstack/react-query";
import { Query } from "@/models/params.model";

async function fetcher(params: Partial<Query>): Promise<MovieResponse[]> {
  return await Service.movie.indexTheBest(params);
}

export function useMovieIndexQuery(
  params: Partial<Query>,
): UseQueryResult<MovieResponse[], Error | AxiosError> {
  return useQuery({
    queryKey: ["MOVIE-INDEX", params],
    queryFn: () => fetcher(params),
  });
}
