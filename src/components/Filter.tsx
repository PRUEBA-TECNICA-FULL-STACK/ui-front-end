import Movie from "@/models/Movie";
import apiFilter from "@/utils/apiFilter";
import { useEffect, useState } from "react";

function Filter({ movies, copyMovies, resultFilMovies, status, years }: { status: boolean | null, years: number[], copyMovies: Movie[] | null, resultFilMovies: any, movies: Movie[] | null }) {
    const [isOpen, setIsOpen] = useState('fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white w-96 dark:bg-gray-800');
    const [ino, setIno] = useState<number>(0);
    const [fio, setFio] = useState<number>(3000);
    const [ratIno, setRatIno] = useState<number>(0);
    const [ratFio, setRatFio] = useState<number>(5);
    const [isFilterOpend, setIsFilterOpend] = useState(false);

    useEffect(() => {
        if (status != null) {
            open();
        }
    }, [status])



    function processFlilter() {
        if (isFilterOpend) {
            
            if (copyMovies != null) {
                resultFilMovies([])
                apiFilter.byYears(copyMovies,(ino <= fio ? ino : fio), (ino >= fio ? ino : fio)).then((res) => {
                    
                    const nextStap:Movie[]=copyMovies.filter((mov) => {
                        return res.some((mov1) => {
                            return mov.id === mov1.id;
                        });
                    });
                    
                    apiFilter.byRatings(nextStap,(ratIno <= ratFio ? ratIno : ratFio), (ratIno >= ratFio ? ratIno : ratFio)).then((res1) => {
                        resultFilMovies(res1);
                        
                    }).catch((ere) => {
                        alert(ere)
                        resultFilMovies(copyMovies);
                    });
                    
                }).catch((ere)=>{
                    alert(ere)
                    resultFilMovies(copyMovies);
                });
                
            }
                



            
        } else {
            resultFilMovies(copyMovies);
        }
        open();

    }
    const toggleFilter = () => {
        setIsFilterOpend(!isFilterOpend);
       
    };

    
    function onFilterByRatings(movies: Movie[]) {
        if (copyMovies != null) {

            if (ino <= fio) {
                apiFilter.byRatings(movies, ino, fio).then((res) => {
                    return res;
                }).catch((err) => {
                    console.error(err);
                });

            } else {

                apiFilter.byYears(movies, fio, ino).then((res) => {
                    return res;
                    console.log(res);
                }).catch((err) => {
                    console.error(err);
                });

            }
        }else{
            return movies;
        }
    }
    function open() {
        setIsOpen(isOpen == 'fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform bg-white w-96 dark:bg-gray-800 transform-none' ? 'fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white w-96 dark:bg-gray-800' : 'fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform bg-white w-96 dark:bg-gray-800 transform-none')
    }


    return (
        <>




            <div id="drawer-timepicker" className={isOpen + ' z-[9999999999999999]'} tabIndex={-1} aria-labelledby="drawer-timepicker-label">
                <h5 id="drawer-label" className="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Time schedule</h5>
                <button onClick={open} type="button" data-drawer-hide="drawer-timepicker" aria-controls="drawer-timepicker" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white" >
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span className="sr-only">Close menu</span>
                </button>
                <form onSubmit={(e) => { e.preventDefault(); }} >
                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700 mb-6">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-gray-900 dark:text-white text-base font-medium">Filtro Avanzado</span>
                            <label onChange={toggleFilter}  className="inline-flex items-center cursor-pointer" htmlFor="filtro">
                                <input type="checkbox" value="" id="filtro" name="business-hours" className="sr-only peer" />
                                    <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>

                                    <span className="sr-only">Abrir El Filtro</span>
                            </label>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-normal">Activar o desactivar el filtro avanzado.</p>
                    </div>

                    <div className={'mb-6 '+ (isFilterOpend ? '' : 'pointer-events-none opacity-50')} >
                        <div className="flex items-center justify-between">
                            <span className="min-w-[max-content]">Date : </span>
                            <select id="yearsIno" name="yearsIno" onChange={(e) => setIno(parseInt(e.target.value))} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mx-[10px]" required>
                                
                                {
                                    years.sort((a,b)=> a-b).map((year, index) => {
                                        return (
                                            <option value={year} key={index} >{year}</option>

                                        );
                                    })
                                }
                            </select>
                            <select id="yearsfio" name="yearsfio" onChange={(e) => setFio(parseInt(e.target.value))} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mx-[10px]" required>

                                {
                                    years.sort((a,b)=> b-a).map((year, index) => {
                                        return (
                                            <option value={year} key={index} >{year}</option>

                                        );
                                    })
                                }
                            </select>

                        </div>
                    </div>
                    <div className={'mb-6 '+ (isFilterOpend ? '' : 'pointer-events-none opacity-50')}>
                        <div className="flex items-center justify-between">
                            <span className="min-w-[max-content]">Rating : </span>
                            <svg className={'w-[65px] h-[65px] text-yellow-300 hover:text-yellow-300 cursor-pointer me-1 hover:scale-125 transform-gpu dark:text-yellow-500 ml-2'} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                            <select id="setRatIno" name="setRatIno" onChange={(e) => setRatIno(parseInt(e.target.value))} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mx-[10px]" required>

                                {
                                    [0, 1, 2, 3, 4, 5].map((val, index) => {
                                        return (
                                            <option value={val} key={index} >


                                                {val}</option>

                                        );
                                    })
                                }
                            </select>
                            <select id="setRatFio" name="setRatFio" onChange={(e) => setRatFio(parseInt(e.target.value))} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mx-[10px]" required>

                                {
                                    [5,4,3,2,1,0].map((val, index) => {
                                        return (
                                            <option value={val} key={index} >{val}</option>

                                        );
                                    })
                                }
                            </select>

                        </div>
                    </div>




                    <div className="grid grid-cols-2 gap-4 bottom-4 left-0 w-full md:px-4 md:absolute">
                        <button onClick={open} type="button" data-drawer-hide="drawer-timepicker" className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Close</button>
                        <button onClick={processFlilter} className="text-white w-full inline-flex items-center justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Save all
                        </button>
                    </div>
                </form>
            </div>

        </>
    );
}

export default Filter;