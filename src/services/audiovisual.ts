import { api } from "@/lib/api";
import { AudiovisualResponse } from "@/models/audiovisual.model";
import { Query } from "@/models/params.model";

export default class AudiovisualService {
  public async indexPlayingNow(
    params: Partial<Query>,
  ): Promise<AudiovisualResponse> {
    const { data } = await api.get<AudiovisualResponse>(
      `/3/movie/now_playing?page=${params.page}`,
    );
    return data;
  }
}
