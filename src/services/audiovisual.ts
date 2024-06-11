import { api } from "@/lib/api";
import { AudiovisualResponse } from "@/models/audiovisual.model";

export default class AudiovisualService {
  public async indexPlayingNow(): Promise<AudiovisualResponse> {
    const { data } = await api.get<AudiovisualResponse>(`/3/trending/all/day`);
    return data;
  }
}
