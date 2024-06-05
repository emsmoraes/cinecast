import { api } from "@/lib/api";
import { MovieResponse } from "@/models/movie.model";
import { Query } from "@/models/params.model";

export default class MovieService {
  public async indexTheBest(params: Partial<Query>): Promise<MovieResponse[]> {
    const { data } = await api.get<MovieResponse[]>(
      `/3/movie/top_rated?page=${params.page}`,
      {
        params,
      },
    );
    return data;
  }
}
