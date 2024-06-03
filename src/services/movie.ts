import { api } from "@/lib/api";
import { MovieResponse } from "@/models/movie.model";

export default class MovieService {
  public async indexTheBest(params: unknown): Promise<MovieResponse[]> {
    const { data } = await api.get<MovieResponse[]>(`/movie/the-best`, {
      params,
    });
    return data;
  }
}
