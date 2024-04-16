import Rating from "./Rating";

export default interface Movie {
    id: number;
    Title: string;
    Year: number;
    imdbID: string;
    Poster: string;
    Ratings: number;
    Type: string;
}
  