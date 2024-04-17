'use client';
import Card from "@/components/Card";
import Movie from "@/models/Movie";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "@/utils/axios";
import Filter from "@/components/Filter";
export default function Home() {
  const [movies, setMovies] = useState<Movie[] | null>([]);
  //const [savedMovies, setSavedMovies] = useState<Movie[] | null>([]);
  const [copyMovies, setCopyMovies] = useState<Movie[] | null>([]);
  const [search, setSearch] = useState("");
  const [menu, setMenu] = useState("");
  const [status, setStatus] = useState<boolean | null>(null);
  const [years, setYears] = useState<number[]>([]);
  const [copyYears, setCopyYears] = useState<number[]>([]);
  useEffect(() => {
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_APP;
    axios.get('api/v1/movies')
      .then(response => {
        if (response.data.Response === "False") {
          return;
        }
        const newMovies = getMovies(response.data.data);
        console.log(newMovies)
        setMovies(newMovies.length > 0 ? newMovies : null);
        setCopyMovies(newMovies.length > 0 ? newMovies : []);
        const arrYears: number[] = response.data.data.map((movie: any) => movie.Year);
        setCopyYears(arrYears);
        setYears(arrYears);



      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setMovies([]);
    const resultMovies = copyMovies?.filter((movie: Movie) => {
      return movie.Title.toLowerCase().includes(search.toLowerCase());
    });
    setMovies(resultMovies ? resultMovies : null);
  }, [search]);

  function onPush() {



    axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_APP;
    movies?.forEach(movie => {
      axios.post('api/v1/movies', movie)
        .then(response => {
          const newMovie = getMovies(response.data.data);
          
          setMovies(prevMovies => {
            if (prevMovies) { 
              return prevMovies.map(movie => {
                
                if (movie.imdbID === newMovie[0].imdbID) {
                  
                  movie.id = newMovie[0].id;
                  movie.Ratings= newMovie[0].Ratings;
                }
                return movie;
              });
            } else {
              return prevMovies; 
            }
          });
          setCopyMovies(prevMovies => {
            if (prevMovies) { 
              return prevMovies.map(movie => {
                
                if (movie.imdbID === newMovie[0].imdbID) {
                  
                  movie.id = newMovie[0].id;
                  movie.Ratings= newMovie[0].Ratings;
                }
                return movie;
              });
            } else {
              return prevMovies; 
            }
          });

        })
        .catch(error => {
          console.log(error);
        }).
        finally(() => {
          console.log(movies)
        });
    });
  }
  function onPull() {
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_OMDBAPI;
    axios.get('?apikey=731e41f&s=harry potter&type=movie')
      .then(response => {
        if (response.data.Response === "False") {
          return;
        }
        setMovies(getMovies(response.data.Search));
        setCopyMovies(getMovies(response.data.Search));
      })
  }

  function openFilter() {
    setStatus(status == true ? false : true);
  }
  function getMovies(data: any) {
    const newMovies: Movie[] = data.map((movie: any) => ({
      id: movie.id,
      Title: movie.Title,
      Year: movie.Year,
      Poster: movie.Poster,
      Ratings: movie.Ratings,
      imdbID: movie.imdbID,
    }));
    return newMovies;
  }
  return (
    <>
      <section className="sticky top-0 bg-gray-50 dark:bg-gray-900 h-[80px] w-full flex  items-center z-[9999] ">
        <div className=" px-4 mx-auto lg:px-12 w-full">

          <div className="relative bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
            <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
              <div className="w-full md:w-1/2">
                <form className="flex items-center">
                  <label htmlFor="simple-search" className="sr-only">Search</label>
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input type="text" id="simple-search" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" onKeyUp={(e) => setSearch((e.target as HTMLInputElement).value)} required />
                  </div>
                </form>
              </div>
              <div className="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
                <button onClick={onPush} type="button" className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                  <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                  </svg>
                  Guardar en Base de datos
                </button>
                <button onClick={onPull} type="button" className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                  <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                  </svg>
                  Obtener datos del Imdb
                </button>




              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="flex flex-wrap mx-auto w-full p-2">

        {
          movies?.map((movie, index) => {
            if (movie.imdbID) {
              return (


                <Card key={index} movie={movie} />





              );
            }
          })
        }

      </div>

      <div data-dial-init className="fixed bottom-6 end-6 group">

        <button type="button" data-dial-toggle="speed-dial-menu-text-outside-button-square" onClick={openFilter} aria-controls="speed-dial-menu-text-outside-button-square" aria-expanded="false" className="flex items-center justify-center text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
          <svg className="w-5 h-5 transition-transform group-hover:rotate-45" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
          </svg>
          <span className="sr-only">Open actions menu</span>
        </button>
      </div>
      <Filter status={status} years={years} />
    </>
  );
}
