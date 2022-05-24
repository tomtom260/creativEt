import UserNav from '../components/navbar/userNav';
import ModeratorCard from '../components/moderatorCard';
function moderator() {
    return (
        <>
            <UserNav></UserNav>

            <div className='w-full min-h-screen h-full py-4 px-48 flex flex-col space-y-4 bg-cPurple-light'>
                <div className='flex space-x-4 w-full'>
                    <button className='py-1 px-3 rounded bg-cPurple-dark text-white'> Pending </button>
                    <button className='py-1 px-3 rounded text-cPurple'> Resolved </button>
                    <button className='py-1 px-3 rounded text-cPurple'> All </button>
                </div>  

                <div className='grid grid-cols-2 gap-3'>
                    <ModeratorCard 
                        imgSrc='./assets/images/carriage.jpg'
                        contentTitle='Life'
                        contentCreator='creator'
                        reportDetail='copyright'
                        numReport='100'
                    />
                </div>
            </div>
        </>
    );
}

export default moderator;