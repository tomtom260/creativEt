import ImageWithSkeleton from "@/components/ImageWithSkeleton"
import DefaultLayout from "@/layouts/DefaultLayout"
import { changeDateInJSONToMoment } from "@/utils/changeDateToMoment"
import React, { useState } from "react"
import { ContentWithProfile, getContent } from "modules/content/server"
import { NextPageContext } from "next"
import { getSession } from "next-auth/react"
import Button from "@/components/Button"
import ButtonVariants from "@/components/Button/button.enum"
import BackSVG from "@/assets/icons/Back"
import { useRouter } from "next/router"
import FlagSVG from "@/assets/icons/Flag"
import {
  getDownloadUrl,
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
import { getContentById } from "@/modules/content/api"
import {
  useFollowUserMutation,
  useGetCurrentUser,
  useUnfollowUserMutation,
} from "@/hooks/user"
import { EyeIcon } from "@heroicons/react/outline"
import BuyModal from "@/modules/content/components/BuyModal"
import { useAppDispatch } from "@/hooks/redux"
import { ModalType, showModal } from "store/modalSlice"
import InsufficientBalanceModal from "@/modules/content/components/InsufficientBalanceModal"
import { fetchUserWithProfile, transformUserResponse } from "@/modules/user/api"

function Content({ content }: { content: ContentWithProfile }) {
  const { data: user } = useGetCurrentUser()
  const contentQuery = useQuery(
    ["content", content.id],
    () => getContentById(content.id, user?.id!),
    {
      initialData: content,
    }
  )

  const dispatch = useAppDispatch()
  const router = useRouter()
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [contentImage, setContentImage] = useState(contentQuery.data.image)
  const [isShareMode, setIsShareMode] = useState(false)

  const { onContentLiked, onContentDisliked } = useContentService()

  const onFollow = useFollowUserMutation(contentQuery.data.createdBy.id)
  const onUnfollow = useUnfollowUserMutation(contentQuery.data.createdBy.id)

  const createdByQuery = useQuery(
    ["user", contentQuery.data.createdBy.id],
    () => fetchUserWithProfile(contentQuery.data.createdBy.id),
    {
      initialData: { data: { data: contentQuery.data.createdBy } },
      select: transformUserResponse,
    }
  )
  const publicId = getPublicIdFromUrl(contentQuery.data.createdBy.image)
  const contentPublicId = getPublicIdFromUrl(contentQuery.data.image)
  const userImage = getThumnailSizedImage(publicId)
  const shareUrl = `${process.env.NEXT_PUBLIC_URL}${router.asPath}`

  const onLikeButtonClicked = () => {
    contentQuery.data.isLikedByCurrentUser
      ? onContentDisliked(contentQuery.data.id)
      : onContentLiked(contentQuery.data.id)
  }

  const onFollowButtonClicked = () => {
    createdByQuery.data.isFollowedByCurrentUser
      ? onUnfollow.mutate(contentQuery.data.createdBy.id)
      : onFollow.mutate(contentQuery.data.createdBy.id)
  }

  const onBuyClicked = () => {
    if (!contentQuery.data.isBoughtByCurrentUser) {
      user?.balance >= contentQuery.data.price
        ? dispatch(
            showModal({
              modalType: ModalType.BUY_MODAL,
              payload: {
                id: contentQuery.data.id,
                price: contentQuery.data.price,
              },
            })
          )
        : dispatch(
            showModal({
              modalType: ModalType.INSUFFICENT_MODAL,
              payload: {},
            })
          )
    }
  }

  const onDownloadClick = () => {
    const link = document.createElement("a")
    link.href = getDownloadUrl(contentQuery.data.image)
    link.download = "image"
    link.click()
  }

  console.log(user?.id === contentQuery.data.createdBy.id)

  return (
    <>
      <DefaultLayout>
        <div className=" w-full h-[calc(100vh-100px)] sm:h-[70vh] grow grid grid-col-1 sm:grid-cols-2 ">
          <div className="flex-1 flex-shrink-0  relative  ">
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
                      onClick={onFollowButtonClicked}
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
                  onClick={() => setIsShareMode((state) => !state)}
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
                className="absolute hidden  sm:flex z- right-4 top-6"
                variant={ButtonVariants.PRIMARY}
                appendComponent={<WarnSVG />}
              >
                Report
              </Button>
              <Button
                className="absolute w-20 sm:hidden z-10 right-4"
                variant={ButtonVariants.PRIMARY}
                onClick={
                  contentQuery.data.isBoughtByCurrentUser ||
                  user?.id === contentQuery.data.createdBy.id
                    ? onDownloadClick
                    : onBuyClicked
                }
              >
                {contentQuery.data.isBoughtByCurrentUser ||
                user?.id === contentQuery.data.createdBy.id
                  ? "Download"
                  : " Buy"}
              </Button>
            </div>
            <div className="absolute sm:hidden  z-10 bottom-0">
              <Text varaint={TypographyVariant.Body1}>
                @{contentQuery.data.createdBy.username}
              </Text>
              <Text className="mt-2" varaint={TypographyVariant.Body1}>
                {contentQuery.data.description}
              </Text>
              {contentQuery.data.tags.map((tag) => (
                <Text
                  key={tag.id}
                  className="font-bold"
                  varaint={TypographyVariant.Body1}
                >
                  #{tag.name}
                </Text>
              ))}
            </div>
            <ImageWithSkeleton
              imageLoaded={() => {
                setIsImageLoaded(true)
              }}
              loader={({ width }) => {
                const image =
                  contentQuery.data.isBoughtByCurrentUser ||
                  user?.id === contentQuery.data.createdBy.id
                    ? getResponsiveImage(contentPublicId, width)
                    : getResponsiveWatermarkedImage(contentPublicId, width)
                setContentImage(image)
                return image
              }}
              src={contentImage}
              layout="fill"
            />
          </div>
          <div className="hidden sm:block flex-1 py-6 px-12 ">
            <div className="flex flex-1 justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="relative w-14 self-start h-14 rounded-full overflow-hidden ">
                  <ImageWithSkeleton
                    layout="fill"
                    className="rounded-full"
                    src={userImage}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Text className="semi-bold" varaint={TypographyVariant.H2}>
                    {contentQuery.data.createdBy.name}
                  </Text>
                  <div className="flex gap-2  text-gray-dark">
                    <Text className="" varaint={TypographyVariant.Body2}>
                      {contentQuery.data.createdBy.username}
                    </Text>
                    <Text varaint={TypographyVariant.Body2}>
                      {moment(contentQuery.data.createdAt).fromNow()}
                    </Text>
                  </div>
                </div>
              </div>
              <Button
                onClick={onFollowButtonClicked}
                variant={ButtonVariants.OUTLINED}
              >
                {createdByQuery.data.isFollowedByCurrentUser
                  ? "Following"
                  : "Follow"}
              </Button>
            </div>
            <Text className="mt-8 mb-4" varaint={TypographyVariant.Body1}>
              {contentQuery.data.description}
            </Text>
            <div className="flex mb-8 gap-2">
              {contentQuery.data.tags.map((tag) => (
                <Text
                  key={tag.id}
                  className="font-bold"
                  varaint={TypographyVariant.Body1}
                >
                  #{tag.name}
                </Text>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex my-4 gap-4 flex-shrink-0  text-gray-dark">
                <div className="flex flex-col items-center justify-center">
                  <Button
                    onClick={onLikeButtonClicked}
                    className={`text-white
                  ${
                    contentQuery.data.isLikedByCurrentUser
                      ? " bg-secondary-normal "
                      : "bg-gray-dark"
                  }
                  `}
                    variant={ButtonVariants.ICON}
                  >
                    <HeartFilledSVG />
                  </Button>
                  <Text className="mt-2" varaint={TypographyVariant.Body1}>
                    {contentQuery.data.totalLikes}
                  </Text>
                </div>
                <div className="flex flex-col items-center justify-center ">
                  <Button onClick={() => {}} variant={ButtonVariants.ICON}>
                    <EyeIcon className="h-6 w-6" />
                  </Button>
                  <Text className="mt-2" varaint={TypographyVariant.Body1}>
                    {contentQuery.data.views}
                  </Text>
                </div>
              </div>
              <div className="flex items-end gap-1">
                <Text className="!text-5xl" varaint={TypographyVariant.H1}>
                  {content.price}
                </Text>
                <Text className="" varaint={TypographyVariant.H1}>
                  ETB
                </Text>
              </div>
            </div>
            <Button
              className="w-40 ml-auto mt-10"
              variant={ButtonVariants.PRIMARY}
              onClick={
                contentQuery.data.isBoughtByCurrentUser ||
                user?.id === contentQuery.data.createdBy.id
                  ? onDownloadClick
                  : onBuyClicked
              }
            >
              {contentQuery.data.isBoughtByCurrentUser ||
              user?.id === contentQuery.data.createdBy.id
                ? "Download"
                : " Buy"}
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
      <BuyModal />
      <InsufficientBalanceModal />
    </>
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
