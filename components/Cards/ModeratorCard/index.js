import OutlinedButton from '../../Button/OutlinedButton'
import PrimaryButton from '../../Button/PrimaryButton'
import axios from 'axios'
function index(
    {
        contentId, imgSrc, contentTitle, contentCreator, reportDetail, numReport, reportId, resolutionStat
    }
) {
    return (
        <div className="w-[300px] h-[400px] bg-white rounded-lg p-3 flex flex-col">
            <div className="w-full h-[250px] rounded-md bg-slate-300  overflow-clip">
                <img className="object-cover min-h-full min-w-full" src={imgSrc}></img>
            </div>
            <div className="mt-2 flex flex-col relative ">
                <div className="flex flex-row w-full justify-between">
                    <span>
                        <p className="text-slate-500 font-bold text-sm">Content Title</p>
                        <p >{contentTitle}</p>
                    </span>
                    <span>
                        <p className="text-slate-500 font-bold text-sm">Reported For</p>
                        <p>{reportDetail}</p>
                    </span>
                </div>
                <span className='absolute bottom-3 left-3'>
                    {/* <p className="text-slate-500 font-bold text-sm">Caption</p>
                    <p>{content}</p> */}
                    <p>{numReport}</p>
                </span>
                {
                    resolutionStat !== 'PENDING' ?
                        <p className='self-center bg-red-100 font-bold text-md p-3 rounded-lg mt-3'>
                            {resolutionStat}
                        </p> :
                        <span className='flex space-x-3 self-end mt-5'>
                            <OutlinedButton onClick={()=>{
                                axios.patch(`http://localhost:3000/api/content/manageReport?contentId=${contentId}&action=ALLOWED&reportId=${reportId}`, {})
                            }}>Dismiss</OutlinedButton>
                            <PrimaryButton onClick={()=>{
                                axios.patch(`http://localhost:3000/api/content/manageReport?contentId=${contentId}&action=REMOVED&reportId=${reportId}`, {})
                            }}>Remove</PrimaryButton>
                        </span>

                }
            
            </div>
        </div>
    );
}

export default index;