import { useEffect, useState } from "react";

function Filter({ status, years }: { status: boolean | null, years: number[] }) {
    const [isOpen, setIsOpen] = useState('fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white w-96 dark:bg-gray-800');
    useEffect(() => {
        if (status != null) {
            open();
        }
    }, [status])
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
                <form>
                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700 mb-6">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-gray-900 dark:text-white text-base font-medium">Business hours</span>
                            <label className="inline-flex items-center cursor-pointer">
                                <input type="checkbox" value="" name="business-hours" className="sr-only peer" />
                                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-600 peer-defaultChecked:after:translate-x-full rtl:peer-defaultChecked:after:-translate-x-full peer-defaultChecked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-defaultChecked:bg-blue-600"></div>
                                <span className="sr-only">Business hours</span>
                            </label>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-normal">Enable or disable business working hours for all weekly working days</p>
                    </div>
                    <div className="pb-6 mb-6 border-b border-gray-200 dark:border-gray-700">
                        <label htmlFor="timezones" className="flex items-center mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            <span className="me-1">Select a Years</span>
                            <button type="button" data-tooltip-target="tooltip-timezone">
                                <svg aria-hidden="true" className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-900 dark:hover:text-white dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
                                </svg>
                                <span className="sr-only">Details</span>
                            </button>
                            <div id="tooltip-timezone" role="tooltip" className="inline-block absolute invisible z-10 py-2 px-3 max-w-sm text-xs font-normal text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">

                                <div className="tooltip-arrow" data-popper-arrow></div>
                            </div>
                        </label>
                        <select id="timezones" name="timezone" onChange={() => { }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                            <option  >Choose a Years</option>
                            {
                                years.map((year, index) => {
                                    return (
                                        <option value={year} key={index} >{year}</option>

                                    );
                                })
                            }
                        </select>
                    </div>
                    <div className="mb-6">
                        <div className="flex items-center justify-between">
                            <span className="min-w-[max-content]">Rating : </span>
                            <select id="timezones" name="timezone" onChange={() => { }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mx-[10px]" required>
                                
                                {
                                    years.map((year, index) => {
                                        return (
                                            <option value={year} key={index} >{year}</option>

                                        );
                                    })
                                }
                            </select>
                            <select id="timezones" name="timezone" onChange={() => { }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mx-[10px]" required>
                                
                                {
                                    years.map((year, index) => {
                                        return (
                                            <option value={year} key={index} >{year}</option>

                                        );
                                    })
                                }
                            </select>
                            
                        </div>
                    </div>
                   
                    
                    
                   
                    <div className="grid grid-cols-2 gap-4 bottom-4 left-0 w-full md:px-4 md:absolute">
                        <button onClick={open} type="button" data-drawer-hide="drawer-timepicker" className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Close</button>
                        <button  className="text-white w-full inline-flex items-center justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Save all
                        </button>
                    </div>
                </form>
            </div>

        </>
    );
}

export default Filter;