import MovieService from "./movie";
import TvShowService from "./tv-show";

export const Service = {
  movie: new MovieService(),
  tvShow: new TvShowService(),
};
