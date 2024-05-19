// import dotenv from "dotenv";
import axios from "axios";

export const api = axios.create({
  baseURL: `https://api.themoviedb.org`,
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYmNhNjZhMDVkZjVkM2RmNjJjNzNmZTkwODg2YmQyOSIsInN1YiI6IjYyYzU4NTFjYzAzNDhiMDVkMTQ4ZTQzMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-NUv28-fA2uMxUaWJ0wO1uOTKThCafNspSOwKKohRzA",
  },
});
