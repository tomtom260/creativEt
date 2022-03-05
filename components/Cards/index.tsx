import Image from "next/image"
import React, { useState } from "react"
import EyeSVG from "../../assets/icons/Eye"
import HeartFilledSVG from "../../assets/icons/HeartFilled"
import PlusSVG from "../../assets/icons/Plus"
import { icons } from "../../utils/icons"
import { images } from "../../utils/images"
import Button from "../Button"
import ButtonVariants from "../Button/button.enum"
import Text from "../Typography"
import { TypographyVariant } from "../Typography/textVariant.enum"

export type CardsProps = {}

function Cards({}: CardsProps) {
  const [isCardLiked, setIsCardLiked] = useState<boolean>(false)
  const [isAuthorFollowed, setIsAuthourFollowed] = useState<boolean>(false)

  const onContentLiked = () => {
    setIsCardLiked(state => !state)
  }

  return (
    <div className="w-[300px]  flex flex-col">
      <div className="group hover:cursor-pointer w-full h-[220px] relative bg-white">
        <Image
          src={images.cardPlaceholder}
          className=" rounded-lg overflow-hidden"
          layout="fill"
          alt=""
        />
        <div className="absolute flex flex-col-reverse bottom-0 w-full h-20 z-1 group-hover:bg-gradient-to-t  from-gray-dark">
          <div className="hidden group-hover:flex flex-row m-4 justify-between items-center">
            <Text
              className="text-white font-semibold mt-px"
              varaint={TypographyVariant.Body1}
            >
              Watch
            </Text>
            <div>
              <Button
                variant={ButtonVariants.ICON}
                onClick={onContentLiked}
                className={`w-8 h-8 ${
                  isCardLiked ? "text-secondary-light " : "text-gray-normal"
                } bg-white rounded-md flex items-center justify-center`}
              >
                <HeartFilledSVG />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div
        // onMouseLeave={() => {
        //   setIsAuthorFocused(false)
        // }}
        className="flex justify-between items-center mt-2 px-2"
      >
        <div className="flex flex-col relative group">
          <div
            // onMouseOver={() => {
            //   setIsAuthorFocused(true)
            // }}
            className="flex flex-row items-center focus:cursor-pointer z-10"
          >
            <Image
              className="rounded-full"
              src={images.defaultProfile}
              width={25}
              height={25}
              alt=""
            />
            <Text
              className="mb-1 ml-3 font-medium cursor-pointer"
              varaint={TypographyVariant.Body1}
            >
              Picko Labs
            </Text>
          </div>
          <div className="pt-6 absolute">
            <div
              className={`hidden group-hover:flex bg-white shadow-md mt-6  rounded-2xl w-[400px] h-[200px] p-5 flex-col`}
            >
              <div className="flex justify-between items-center">
                <div className="flex">
                  <Image
                    src={images.defaultProfile}
                    width={60}
                    height={60}
                    alt=""
                    className="rounded-full"
                  />
                  <div className="flex flex-col ml-6">
                    <Text
                      varaint={TypographyVariant.H2}
                      className="font-semibold mt-3"
                    >
                      Picko Labs
                    </Text>
                    <Text
                      varaint={TypographyVariant.Body1}
                      className="font-thin text-gray-normal"
                    >
                      Ethiopia
                    </Text>
                  </div>
                </div>
                <Button
                  onClick={() => setIsAuthourFollowed(state => !state)}
                  appendComponent={<PlusSVG />}
                  className={`${
                    isAuthorFollowed ? "bg-secondary-normal" : "bg-gray-light"
                  } `}
                  variant={ButtonVariants.PRIMARY}
                >
                  Follow
                </Button>
              </div>
              <div className="grid grid-cols-3 h-full gap-5 mt-5">
                <Image
                  src={images.cardPlaceholder}
                  alt=""
                  width={106}
                  height={82}
                  className="rounded-md"
                />
                <Image
                  src={images.cardPlaceholder}
                  alt=""
                  width={106}
                  height={82}
                  className="rounded-md"
                />
                <Image
                  src={images.cardPlaceholder}
                  alt=""
                  width={106}
                  height={82}
                  className="rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="flex items-center mr-1">
            <Button
              title="Like this content?"
              className={`mx-1 ${
                isCardLiked ? "text-secondary-light " : "text-gray-normal"
              } hover:text-secondary-light `}
              onClick={onContentLiked}
              variant={ButtonVariants.ICON}
            >
              <HeartFilledSVG />
            </Button>
            <Text className="mb-1" varaint={TypographyVariant.Body2}>
              172
            </Text>
          </div>
          <div className="flex items-center">
            <div className="mx-1 text-gray-normal">
              <EyeSVG />
            </div>
            <Text className="mb-1" varaint={TypographyVariant.Body2}>
              17.4K
            </Text>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cards
