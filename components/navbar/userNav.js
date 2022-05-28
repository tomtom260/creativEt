function userNav() {
    return (
        <div className='w-full bg-white flex flex-col p-3 z-[60] sticky '>

            {/* <div className="w-full flex justify-end space-x-4 items-center text-sm">
                <button>Advertise</button>
                <button>Hire a Creator</button>
            </div> */}
            
            {/* <hr className="my-2"></hr> */}

            <div className="w-full h-10 flex justify-between items-center">
                <div className="h-full w-auto flex items-center justify-center">
                    <img className="w-auto h-full" src="/assets/images/logo.png"/>
                </div>

                <div className="flex items-center h-full relative">
                    <label className="absolute left-2">
                        <svg
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </label>
                    <input
                        name="navSearch"
                        className="sm:w-[200px] md:w-[500px] h-10 border-2 rounded-md px-10"
                        placeholder="Search"
                    ></input>

                </div>

                <div className="flex space-x-4">
                    <button type="button bg-none ">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </button>
                    <button type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                </div>
            </div>
            
        </div>
    );
}

export default userNav;