import { motion, useViewportScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/router"
import { Dispatch, SetStateAction, useContext } from "react"
import { LangContext } from "@/hooks/Lang"

function Landing({
  onChange,
  value,
}: {
  onChange: Dispatch<SetStateAction<string>>
  value: string
}) {
  const { scrollYProgress } = useViewportScroll()
  const y1 = useTransform(scrollYProgress, [0, 300], [0, 200])
  const y2 = useTransform(scrollYProgress, (value) => value * -300)
  const y3 = useTransform(scrollYProgress, (value) => value * -500)
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5])
  const scale2 = useTransform(scrollYProgress, [0, 1], [0.6, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const router = useRouter()
  const { lang } = useContext(LangContext)

  return (
    <motion.div
      style={{ opacity }}
      className="bg-white min-w-screen h-[calc(100vh-60px)]  relative overflow-hidden flex flex-col justify-center items-center"
    >
      <motion.img
        style={{ y: y1, scale }}
        src={router.pathname.includes("hire") ?
        "./assets/images/landing/hireLandscape.jpg" :
        "./assets/images/landing/landscape.png"
      
        }
        className="object-cover min-w-full min-h-full absolute z-[5]"
      ></motion.img>
      <motion.img
        style={{ scale: scale2 }}
        src="./assets/images/landing/photographer.png"
        className="object-cover  min-h-full  absolute z-[10] bottom-0 origin-bottom"
      ></motion.img>
      {/* <motion.img
        style={{ y: y3, scale }}
        src="./assets/images/landing/foreground.png"
        className="object-cover min-w-full min-h-full absolute z-[15] "
      ></motion.img> */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: "1" }}
        className="flex flex-col z-[22] items-center md:items-start self-center md:self-start space-y-4 md:pl-24"
      >
        <p className=" text-4xl font-black text-center md:text-left  md:leading-[6rem] text-white md:text-[6rem]">
          {" "}
          {lang.exploreThrough}
          <br></br>
          {lang.ourDiverse}
          <br/>
          {router.pathname.includes("hire")? lang.creators : lang.content}
          {/* Explore through our diverse local & global digital content */}
        </p>
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
            onChange={(e) => onChange(e.target.value)}
            value={value}
            name="navSearch"
            className="w-[300px] md:w-[500px] h-10 border-2 rounded-md px-10"
            placeholder={
              router.pathname.includes("hire")
                ? lang.searchCreator
                : lang.searchContent
            }
          ></input>
        </div>
        <button
          onClick={() => {
            document.getElementById("content")?.scrollIntoView({
              behavior: "smooth",
            })
          }}
          className="bg-gray-800 p-3 text-md text-white rounded-lg  border shadow-lg border-white"
        >
          {lang.startExploring}
        </button>
      </motion.div>
      <div className="w-screen h-screen bg-gradient-to-r via-black/10 from-gray-900/80 to-transparent absolute z-20"></div>
    </motion.div>
  )
}

export default Landing
