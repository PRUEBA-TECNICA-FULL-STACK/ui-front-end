import Movie from "@/models/Movie";
import axios from "@/utils/axios";

import { useEffect, useState } from "react";

function Card({ movie,updateMovie }: { movie: Movie,updateMovie:any }) {
    const norEst = [1, 2, 3, 4, 5];
    const [ratings, setRatings] = useState(0);
    const [userEst, setUserEst] = useState<number>(0);
    useEffect(() => {
        axios.get(`/api/v1/ratings/?movie_id=${movie.id}&user_id= 1`).then(res => {
            if(res.data.Response!="False"){
                setUserEst(dicimal(res.data.data.Ratings));
                setRatings(dicimal(res.data.data.Rating));
            }
        }).catch(err => {
            console.log(err);
        })
        
    },[])
    function setRatingUser(e:number) {

        axios.post('/api/v1/ratings', { movie_id: movie.id, rating: e,user_id: 1 }).then(res => {
            if(res.data.Response!="False"){
                setRatings(dicimal(res.data.Ratings));
                movie.Ratings=dicimal(res.data.Ratings);
                updateMovie(movie);
            }
        }).catch(err => {
            console.log(err);
        })
        setUserEst(e);
    }
    function dicimal(e:any) {
        console.log(e);
        return parseFloat(parseFloat(e).toFixed(2));
        
    }
    return (

        <li className="py-3  sm:mx-auto mb-[10px] sm:w-[96%]">
            <div className="bg-white shadow-lg border-gray-100 sm:max-h-80	 border sm:rounded-3xl p-8 flex flex-col sm:flex-row space-x-8 overflow-hidden">
                
                    <img className="rounded-3xl shadow-lg h-[300px] sm:h-[100%] mb-10 sm:mb-0 " src={movie.Poster} alt="" />
                
                <div className="flex flex-col w-1/2 space-y-4">
                    <div className="flex justify-between items-start">
                        <h2 className="text-2xl font-bold dark:text-gray-900">{movie.Title}</h2>





                    </div>
                    <div>
                        <div className="text-sm text-gray-400">movie</div>
                        <div className="text-lg text-gray-800">{movie.Year}</div>
                    </div>
                    <p className=" text-gray-400 min-h-[20px] max-h-40 overflow-y-hidden">

                    </p>
                    {
                        movie.id != null ?

                            <div className="flex items-center" title="Rate now">

                                {
                                    norEst.map((est, index) => {
                                        return (

                                            <svg key={index} onClick={()=>setRatingUser(est)} className={'w-10 h-10 text-gray-300 hover:text-yellow-300 cursor-pointer me-1 hover:scale-125 transform-gpu '+(est == 5 ? 'dark:text-gray-500 ':' ')+( userEst>=est ? 'text-yellow-300 dark:text-yellow-500':' ')} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                            </svg>
                                        )
                                    })
                                }


                                
                            <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">{ratings}</p>
                            </div>
                            :
                            ''
                    }
                </div>

            </div>


        </li>


    );
}

export default Card;