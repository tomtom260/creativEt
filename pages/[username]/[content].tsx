import ImageWithSkeleton from "@/components/ImageWithSkeleton"
import DefaultLayout from "@/layouts/DefaultLayout"
import { changeDateInJSONToMoment } from "@/utils/changeDateToMoment"
import React, { useState } from "react"
import { ContentWithProfile, getContent } from "module/content/server"
import { NextPageContext } from "next"
import { getSession } from "next-auth/react"
import Button from "@/components/Button"
import ButtonVariants from "@/components/Button/button.enum"
import BackSVG from "@/assets/icons/Back"
import { useRouter } from "next/router"
import FlagSVG from "@/assets/icons/Flag"
import {
  getPublicIdFromUrl,
  getResponsiveImage,
  getResponsiveWatermarkedImage,
  getThumnailSizedImage,
} from "@/utils/cloudinary"
import Text from "@/components/Typography"
import { TypographyVariant } from "@/components/Typography/textVariant.enum"
import moment from "moment"
import Input from "@/components/Form/Input"
import { InputType } from "@/components/Form/Input/Input.enum"
import { CopyToClipboard } from "react-copy-to-clipboard"
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  EmailShareButton,
  EmailIcon,
} from "react-share"
import ShareSVG from "@/assets/icons/Share"
import HeartFilledSVG from "@/assets/icons/HeartFilled"
import PlusSVG from "@/assets/icons/Plus"
import WarnSVG from "@/assets/icons/Warn"
import LinkSVG from "@/assets/icons/Link"
import useContentService from "@/service/content"
import { useQuery } from "react-query"
import { getContentById } from "@/api/content"
import { useGetCurrentUser } from "@/hooks/user"

function Content({ content }: { content: ContentWithProfile }) {
  const { data: user } = useGetCurrentUser()
  const contentQuery = useQuery(
    ["content", content.id],
    () => getContentById(content.id, user?.id!),
    {
      initialData: content,
    }
  )

  const router = useRouter()
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [contentImage, setContentImage] = useState(contentQuery.data.image)
  const [isShareMode, setIsShareMode] = useState(false)

  const { onContentLiked, onContentDisliked } = useContentService()

  const publicId = getPublicIdFromUrl(contentQuery.data.createdBy.image)
  const contentPublicId = getPublicIdFromUrl(contentQuery.data.image)
  const userImage = getThumnailSizedImage(publicId)
  const shareUrl = `${process.env.NEXT_PUBLIC_URL}${router.asPath}`

  const onLikeButtonClicked = () => {
    contentQuery.data.isLikedByCurrentUser
      ? onContentDisliked(contentQuery.data.id)
      : onContentLiked(contentQuery.data.id)
  }

  return (
    <DefaultLayout>
      <div className=" w-full h-[calc(100vh-100px)] sm:h-[70vh] grow grid grid-col-1 sm:grid-cols-2 ">
        <div className="flex-1 flex-shrink-0  relative ">
          <div className={`${!isImageLoaded ? "hidden" : "block"} `}>
            <Button
              className="absolute z-10  sm:top-6 left-2 text-gray-dark bg-gray-light"
              onClick={router.back}
              variant={ButtonVariants.ICON}
            >
              <BackSVG />
            </Button>
            <div className="absolute z-10 bottom-0 right-0 flex sm:hidden flex-col gap-3">
              {!isShareMode ? (
                <>
                  <Button
                    className=" relative rounded-full   right-0  text-gray-dark bg-gray-light"
                    variant={ButtonVariants.ICON}
                  >
                    <ImageWithSkeleton
                      layout="fill"
                      className="rounded-full"
                      src={userImage}
                    />
                    <div className="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 bg-secondary-normal text-white rounded-full">
                      <PlusSVG className="!h-3 !w-3" />
                    </div>
                  </Button>
                  <Button
                    onClick={onLikeButtonClicked}
                    className={`right-5 ${
                      contentQuery.data.isLikedByCurrentUser
                        ? "bg-secondary-normal !text-white "
                        : "bg-gray-light"
                    }  text-gray-dark bg-gray-light`}
                    variant={ButtonVariants.ICON}
                  >
                    <HeartFilledSVG />
                  </Button>
                  <Button
                    className="   right-5  text-gray-dark bg-gray-light"
                    variant={ButtonVariants.ICON}
                  >
                    <WarnSVG />
                  </Button>
                </>
              ) : (
                <>
                  <CopyToClipboard text={shareUrl}>
                    <Button
                      className="   right-5  text-gray-dark bg-gray-light"
                      variant={ButtonVariants.ICON}
                    >
                      <LinkSVG />
                    </Button>
                  </CopyToClipboard>
                  <Button
                    className="   right-5  text-gray-dark bg-gray-light"
                    variant={ButtonVariants.ICON}
                  >
                    <TwitterShare shareUrl={shareUrl} />
                  </Button>
                  <Button
                    className="   right-5  text-gray-dark bg-gray-light"
                    variant={ButtonVariants.ICON}
                  >
                    <FacebookShare shareUrl={shareUrl} />
                  </Button>
                  <Button
                    className="   right-5  text-gray-dark bg-gray-light"
                    variant={ButtonVariants.ICON}
                  >
                    <EmailShare shareUrl={shareUrl} />
                  </Button>
                </>
              )}

              <Button
                onClick={() => setIsShareMode(state => !state)}
                className="   right-5  text-gray-dark bg-gray-light"
                variant={ButtonVariants.ICON}
              >
                <ShareSVG />
              </Button>
            </div>
            <div className="absolute z-10 right-5 gap-4 hidden sm:flex flex-col top-[50%] w-min  -translate-y-1/2">
              <Button
                className="   right-5 rotate-[90deg]  text-gray-dark bg-gray-light"
                variant={ButtonVariants.ICON}
              >
                <BackSVG />
              </Button>
              <Button
                className="  right-5  rotate-[270deg]  text-gray-dark bg-gray-light"
                variant={ButtonVariants.ICON}
              >
                <BackSVG />
              </Button>
            </div>
            <Button
              className="absolute hidden  sm:flex z-10 right-4 top-6"
              variant={ButtonVariants.PRIMARY}
              appendComponent={<WarnSVG />}
            >
              Report
            </Button>
            <Button
              className="absolute w-20 sm:hidden z-10 right-4"
              variant={ButtonVariants.PRIMARY}
            >
              Buy
            </Button>
          </div>
          <div className="absolute sm:hidden  z-10 bottom-0">
            <Text varaint={TypographyVariant.Body1}>
              @{contentQuery.data.createdBy.username}
            </Text>
            <Text className="mt-2" varaint={TypographyVariant.Body1}>
              {contentQuery.data.description || "hello ብብት"}
            </Text>
            <Text className=" font-semibold" varaint={TypographyVariant.Body1}>
              #nature
            </Text>
          </div>
          <ImageWithSkeleton
            imageLoaded={() => {
              setIsImageLoaded(true)
            }}
            loader={({ width }) => {
              const image = getResponsiveWatermarkedImage(
                contentPublicId,
                width
              )
              setContentImage(image)
              return image
            }}
            src={contentImage}
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="hidden sm:block flex-1 py-6 px-12 ">
          <div className="flex flex-1 justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="relative w-10 h-10 rounded-full overflow-hidden ">
                <ImageWithSkeleton
                  layout="fill"
                  className="rounded-full"
                  src={userImage}
                />
              </div>
              <div className="flex flex-col">
                <Text className="semi-bold" varaint={TypographyVariant.H2}>
                  {contentQuery.data.createdBy.username}
                </Text>
                <div className="flex gap-2 text-gray-dark">
                  <Text className="" varaint={TypographyVariant.Body2}>
                    {contentQuery.data.createdBy.name}
                  </Text>
                  <Text varaint={TypographyVariant.Body2}>
                    {moment(contentQuery.data.createdAt).fromNow()}
                  </Text>
                </div>
              </div>
            </div>
            <Button variant={ButtonVariants.OUTLINED}>Follow</Button>
          </div>
          <Text className="mt-4" varaint={TypographyVariant.Body1}>
            {contentQuery.data.description || "hello ብብት "}
          </Text>
          <Text className="font-bold" varaint={TypographyVariant.Body1}>
            #nature
          </Text>
          <Button
            className="w-40 ml-auto mt-10"
            variant={ButtonVariants.PRIMARY}
          >
            Buy
          </Button>
          <div className="relative mt-24">
            <Input
              value={shareUrl}
              onChange={() => {}}
              inputContainerStyle="hover:!ring-0 hover:!border-gray-normal"
              label="Share"
              disabled
              className="rounded-none"
              variant={InputType.NORMAL}
              appendComponent={
                <CopyToClipboard text={shareUrl}>
                  <Button
                    className="!h-[50px] !outline-0 font-semibold"
                    variant={ButtonVariants.OUTLINED}
                  >
                    Copy Link
                  </Button>
                </CopyToClipboard>
              }
            />

            <div className="absolute top-0 right-0 flex gap-2 ">
              <FacebookShare shareUrl={shareUrl} />
              <TwitterShare shareUrl={shareUrl} />
              <EmailShare shareUrl={shareUrl} />
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}

export default Content

type CustomNextPageContext = NextPageContext & {
  params: {
    username: string
    content: string
  }
}

export async function getServerSideProps(ctx: CustomNextPageContext) {
  const { content: id } = ctx.params
  const session = await getSession(ctx)
  try {
    const content = await getContent(id, session?.user?.id)
    return {
      props: {
        content: changeDateInJSONToMoment(content),
        protected: true,
      },
    }
  } catch (err: any) {
    if (err.statusCode === 404) {
      return {
        notFound: true,
      }
    }
  }
}

const TwitterShare = ({ shareUrl }: { shareUrl: string }) => (
  <TwitterShareButton
    title={`checkout this art for sale on creativET! `}
    url={shareUrl}
  >
    <TwitterIcon size={36} round />
  </TwitterShareButton>
)

const FacebookShare = ({ shareUrl }: { shareUrl: string }) => (
  <FacebookShareButton
    quote={`checkout this art for sale on creativET! `}
    url={shareUrl}
  >
    <FacebookIcon round size={36} />
  </FacebookShareButton>
)

const EmailShare = ({ shareUrl }: { shareUrl: string }) => (
  <EmailShareButton
    subject={`creativEt`}
    url={`checkout this art for sale on creativET! ${shareUrl}`}
  >
    <EmailIcon size={36} round />
  </EmailShareButton>
)