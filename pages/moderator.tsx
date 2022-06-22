import ListBox from "../components/Form/ListBox"
import ModeratorCard from "../components/Cards/ModeratorCard"
import axios from "axios"
import { useState } from "react"

const filterOptions = ["PENDING", "REMOVED", "DISMISSED", "ALL"]

function Moderator({ contents }) {
  const [selectedFilterOption, setSelectedFilterOption] = useState(
    filterOptions[0]
  )
  const [reportedContents, setReportedContents] = useState(contents)
  // console.log(reportedContents)
  return (
    <div className="w-screen h-screen bg-slate-200 p-3 flex flex-col">
      <ListBox
        selected={selectedFilterOption}
        changeSelected={(val) => {
          setSelectedFilterOption(val)
          axios
            .get(`/api/content/reportedContents?filter=${val}`, {})
            .then((dat) => {
              setReportedContents(dat.data.data)
            })
        }}
        options={filterOptions}
        className="w-fit"
      />

      <div className="w-full grid grid-cols-4 gap-4 px-24 pt-4 self-center">
        {reportedContents.map((content) => {
          // console.log(content.reportedBy.name)
          return (
            <ModeratorCard
              key={content.id}
              contentId={content.contentId}
              imgSrc={content.contentReported.image}
              contentTitle={content.contentReported.title}
              // contentCreator={content.reportedBy.name}
              contentDescription={content.contentReported.description}
              reportDetail={content.description}
              numReport={content.reportCount}
              reportId={content.id}
              resolutionStat={content.resolved}
              setReportedContents
            />
          )
        })}
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const contents = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/api/content/reportedContents?filter=PENDING`
  )
  contents.data.data.map((content) => {
    content.reportedAt = content.reportedAt.toString()
    content.contentReported.createdAt =
      content.contentReported.createdAt.toString()
  })
  //   console.log(contents)
  return {
    props: {
      contents: contents?.data.data || [],
    },
  }
}

// async function getReportedContent(filter){
//     axios.get(`/api/content/reportedContents?filter=${filter}`, {}).then(
//         (dat)=> {
//             setReportedContents(dat)
//         }
//     )

// }
export default Moderator
