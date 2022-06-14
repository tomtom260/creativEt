import { motion, useViewportScroll, useTransform } from "framer-motion"
import { Dispatch, SetStateAction } from "react"

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
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  return (
    <motion.div
      style={{ opacity }}
      className="bg-white min-w-screen h-[calc(100vh-60px)]  relative overflow-hidden flex justify-center items-center"
    >
      <motion.img
        style={{ y: y1, scale }}
        src="./assets/images/landing/background.png"
        className="object-cover min-w-full min-h-full absolute z-[5]"
      ></motion.img>
      <motion.img
        style={{ y: y2, scale }}
        src="./assets/images/landing/middleground.png"
        className="object-cover min-w-full min-h-full  absolute z-[10]"
      ></motion.img>
      <motion.img
        style={{ y: y3, scale }}
        src="./assets/images/landing/foreground.png"
        className="object-cover min-w-full min-h-full absolute z-[15] "
      ></motion.img>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: "1" }}
        className="flex flex-col z-[22] items-center space-y-4"
      >
        <p className=" text-xl text-white">
          {" "}
          Explore through our diverse local & global digital content
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
            className="w-[500px] h-10 border-2 rounded-md px-10"
            placeholder="Search"
          ></input>
        </div>
        <button className="bg-gray-800 p-3  text-md text-white rounded-lg absolute bottom-10 border shadow-lg border-white">
          Start Exploring
        </button>
      </motion.div>
      <div className="w-screen h-screen bg-gradient-to-t from-gray-900 to-transparent absolute z-20"></div>
    </motion.div>
  )
}

export default Landing
