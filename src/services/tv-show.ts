import { api } from "@/lib/api";
import { Query } from "@/models/params.model";
import { TvShowResponse } from "@/models/tv-show.model";

export default class TvShowService {
  public async indexTheBest(params: Partial<Query>): Promise<TvShowResponse> {
    const { data } = await api.get<TvShowResponse>(
      `/3/tv/top_rated?page=${params.page}`,
      {
        params,
      },
    );
    return data;
  }
}
