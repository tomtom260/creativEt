import Navbar from '../components/navbar/userNav'
function wallet() {
    return (
        <div className='bg-cPurple-light'>
            <Navbar />

            <div className='w-full min-h-screen grid sm: grid-rows-5 gap-2 md:grid-cols-5 p-4'>
                <div className='grid lg:col-span-1 md:row-start-1 md: col-span-2 sm:col-start-1 shadow-lg shadow-cPurple/10  rounded-xl p-4 w-full h-[200px] bg-white'>
                    <h1 className='font-bold uppercase text-cPurple'>Current Balance</h1>
                    <p className='font-bold text-3xl md:text-5xl justify-self-end text-cPurple-dark'> $20,000</p>
                </div>
                <div className='sm:col-start-3 sm:row-start-1 overflow-hidden flex sm:flex-col lg:flex-col items-center space-y-4 sm:row-span-1 lg:row-span-2 md:row-start-1 
                lg:row-start-2 lg:col-span-1 md:col-span-2 shadow-lg shadow-cPurple/10  rounded-xl p-4 w-full bg-white'>
                    <svg className='h-12 fill-cPurple'  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M448 32C465.7 32 480 46.33 480 64C480 81.67 465.7 96 448 96H80C71.16 96 64 103.2 64 112C64 120.8 71.16 128 80 128H448C483.3 128 512 156.7 
                        512 192V416C512 451.3 483.3 480 448 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H448zM416 336C433.7 336 448 321.7 448 304C448 286.3 433.7 
                        272 416 272C398.3 272 384 286.3 384 304C384 321.7 398.3 336 416 336z"/>
                    </svg>
                    <p className='font-extrabold text-xl md:text-xl justify-self-end text-cPurple-dark'> Withdraw</p>
                    <input type="text" className='w-full border p-2 rounded-lg border-cPurple' placeholder='Phone Number'></input>
                    <input type="number" className='w-full border p-2 rounded-lg border-cPurple' placeholder='Amount'></input>
                    <input type="password" className='w-full border p-2 rounded-lg border-cPurple' placeholder='PIN'></input>
                    <input type='button' className='w-full bg-cPurple-dark p-3 rounded-lg text-white' value='Withdraw'></input>
                </div>
                <div className='sm:row-start-2 md:row-start-2 lg:row-start-1 bg-white p-4 flex flex-col w-full h-full rounded-xl sm:col-span-5 lg:col-span-4 row-span-full'>
                    <div className='flex justify-between w-full items-center mb-4'>
                        <h1 className='font-bold text-lg'>Transaction History</h1>
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
                                className="sm:w-[200px] md:w-[200px] h-10 border-2 rounded-md px-10"
                                placeholder="Search"
                            ></input>

                        </div>
                    </div>
                    <div className='w-100 grid grid-cols-6 font-bold uppercase my-2 text-sm'>
                        <div className='col-span-1'> Id </div>
                        <div className='col-span-2'>Content</div>
                        <div className='col-span-1'>  Type </div>
                        <div className='col-span-1'> Amount </div>
                        <div className='col-span-1'> Date </div>
                    </div>
                    <hr></hr>
                    <div className='w-100 grid grid-cols-6 uppercase my-2'>
                        <div className='col-span-1'> 001 </div>
                        <div className='col-span-2'> ljk;alkdfjdlkjfa </div>
                        <div className='col-span-1'>  Sell </div>
                        <div className='col-span-1'> $100.00 </div>
                        <div className='col-span-1'> 10/02/2020 </div>
                    </div>  
                </div>
            </div>
        </div>
    );
}

export default wallet;