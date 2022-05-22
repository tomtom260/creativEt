function hireProfile() {
    return (
        <>        
            <div className="box-border w-full md:w-[310px] h-96 bg-white mx-2 my-8 rounded-md overflow-hidden">
                <div className="w-full h-48 bg-cPurple overflow-hidden">
                    <img src="./assets/images/carriage.jpg" className="w-full hover:scale-105 duration-150"/>
                </div>
                <div className="flex flex-col">
                    <div className="flex w-full p-3 justify-between items-center">
                        <div className="h-[64px] w-[64px] rounded-full bg-cPurple overflow-hidden">
                            <img src="./assets/images/omo.jpg" className="w-min-full h-min-full"/>
                        </div>
                        <div className="pl-4 w-full flex flex-col ">
                            <p className="font-bold text-md ">Yeabsira Getahun</p>
                            <p className="text-cPurple"> I am a photographer that takes photos of photos </p>
                        </div>
                    </div>
                    <hr className="w-full my-3"></hr>
                    <div className="flex p-3 space-x-1 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <p className="text-md font-bold text-amber-400">4.5</p>
                        <p className="text-sm text-cPurple">(1k+)</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default hireProfile;