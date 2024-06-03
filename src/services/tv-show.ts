import { api } from "@/lib/api";
import { TvShowResponse } from "@/models/tv-show.model";

export default class TvShowService {
  public async indexTheBest(params: unknown): Promise<TvShowResponse> {
    const { data } = await api.get<TvShowResponse>("/tv/top_rated", {
      params,
    });
    return data;
  }
}
