import MovieService from "./movie";
import TvShowService from "./tv-show";
import AudiovisualService from "./audiovisual";

export const Service = {
  movie: new MovieService(),
  tvShow: new TvShowService(),
  audiovisual: new AudiovisualService(),
};
