export interface Audiovisual {
  backdrop_path: string;
  id: number;
  original_title?: string;
  overview: string;
  poster_path: string;
  media_type: string;
  adult: boolean;
  title?: string;
  name?: string;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date?: string;
  first_air_date?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
}

export interface AudiovisualResponse {
  page: number;
  results: Audiovisual[];
  total_pages: number;
  total_results: number;
}
