function moderatorCard({ imgSrc, contentTitle, contentCreator, reportDetail, numReport }) {
    return (
        <div className='h-80 shadow-md rounded-2xl p-4 space-x-3 flex bg-white'>
            <div className='min-w-[300px] h-full bg-red-100 rounded-2xl overflow-hidden'>
                <img src={imgSrc} className='object-cover min-h-full min-w-full'></img>
            </div>
            <div className='flex flex-col justify-between '>
                <div className='flex flex-col min-w-[300px]'>
                    <h1 className='font-bold text-2xl'>{contentTitle}</h1>
                    <h1 className='font-bold text-md pb-3 text-cPurple'>{contentCreator}</h1>
                    <p className=""> {reportDetail} </p>
                </div>
                <div className='flex justify-between w-full'>
                    <p>{numReport}</p>
                    <div className='flex justify-end space-x-4 px-4'>
                        <button className='font-bold text-green-500'>Allow Content</button>
                        <button className='font-bold text-red-500'>Reject Content</button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default moderatorCard;