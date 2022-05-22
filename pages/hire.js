import HireCard from '../components/Hire/profile'
import UserNav from '../components/navbar/userNav';

export default function() {

    return (
        <div className='w-full flex flex-col box-border bg-cPurple-light'>

            <UserNav></UserNav>


            <div className='w-full px-4 h-[500px] flex flex-col overflow-hidden grayscale hover:grayscale-0 duration-500 items-center justify-center'>
                <div className='w-full overflow-hidden h-full absolute'>
                    <img className='-z-10 w-full h-auto relative' src='/assets/images/omo.jpg'/>
                </div>
                <h1 className='text-4xl text-white w-[30rem] text-center'>Search for the right content creator you need. </h1>
                <div className="p-4 flex justify-center">
                    <label htmlFor="table-search" className="sr-only">
                        Search
                    </label>
                    <div className="relative mt-1 items-center">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
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
                    </div>
                    <input
                        type="text"
                        id="table-search"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search"
                    />
                    </div>
                </div>
            </div>

            <div className='flex flex-col py-4 px-48 w-full space-y-4'>
                <h1 className='text-3xl font-bold'>Content Creators</h1>
                <div className='flex justify-between'>
                    <div className='flex space-x-4'>
                        <button>Creator Location</button>
                        <button>Budget</button>
                        <button>Content Type</button>
                    </div>
                    <div className='flex space-x-4'>
                        <p>Sort By:</p>
                        <button className=''>Best Selling</button>
                    </div> 
                </div>
                
            </div>

            <div>

            <div className="w-full h-full  flex flex-wrap justify-center box-border px-24">
                
                <HireCard></HireCard>
                <HireCard></HireCard>
                <HireCard></HireCard>
                <HireCard></HireCard>
                <HireCard></HireCard>
                <HireCard></HireCard>
                <HireCard></HireCard>
                <HireCard></HireCard> <HireCard></HireCard>
                <HireCard></HireCard>
                <HireCard></HireCard>
                <HireCard></HireCard>
            </div>
            </div>

        </div>
    );
}