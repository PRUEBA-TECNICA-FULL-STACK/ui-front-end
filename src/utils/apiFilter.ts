import Movie from "@/models/Movie";

const apiFilter = {
    byRatings: (movies: Movie[], ratingIn: number, ratingOute: number): Promise<Movie[]> => {
        return new Promise((resolve, reject) => {
            const filteredMoviesIn = movies.filter(movie => movie.Ratings >= ratingIn);
            const filteredMoviesOut = filteredMoviesIn.filter(movie => movie.Ratings <= ratingOute);
            if (filteredMoviesOut.length > 0) {
                resolve(filteredMoviesOut);
            } else {
                reject("No se encontraron peliculas con esos filtros por valoracion");
            }
        });
    },
    byYears: (movies: Movie[], yearIn: number, yearOut: number): Promise<Movie[]> => {
        return new Promise((resolve, reject) => {
            const filteredMoviesIn = movies.filter(movie => movie.Year >= yearIn);
            const filteredMoviesOut = filteredMoviesIn.filter(movie => movie.Year <= yearOut);
            if (filteredMoviesOut.length > 0) {
                resolve(filteredMoviesOut);
            } else {
                reject("No se encontraron peliculas con esos filtros por año");
            }
        });
    },

    byTitles: (movies: Movie[], title: string): Promise<Movie[]> => {
        return new Promise((resolve, reject) => {
            if (title.length === 0) {
                reject("Title cannot be empty");
                return;
            }
            const keywords = title.toLowerCase().split(' ');
            const cleanKeywords = keywords.filter(item => item !== "");

            const filteredMovies = movies.filter(movie => {
                return cleanKeywords.some(keyword => movie.Title.toLowerCase().includes(keyword));
            });

            const moviesWithPercentage = filteredMovies.map(movie => {
                const matchedKeywords = cleanKeywords.filter(keyword => movie.Title.toLowerCase().includes(keyword));
                const percentage = (matchedKeywords.length / cleanKeywords.length) * 100;
                return { movie, percentage };
            });

            moviesWithPercentage.sort((a, b) => b.percentage - a.percentage);

            resolve(moviesWithPercentage.map(item => item.movie));
        });
    },

    
    

}


export default apiFilter;