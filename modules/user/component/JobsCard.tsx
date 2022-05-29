import Button from "@/components/Button"
import ButtonVariants from "@/components/Button/button.enum"
import ImageWithSkeleton from "@/components/ImageWithSkeleton"
import Text from "@/components/Typography"
import { TypographyVariant } from "@/components/Typography/textVariant.enum"
import React from "react"

function JobsCard() {
  return (
    <div className="flex px-8 py-8 items-center justify-between shadow-2xl rounded-3xl flex-wrap ">
      <div className="flex gap-4 mb-3 md:mb-0">
        <div className="bg-red-900 w-16 h-16 rounded-full">
          {/* <ImageWithSkeleton /> */}
        </div>
        <div className="flex flex-col">
          <Text varaint={TypographyVariant.H2}>Lalibela</Text>
          <Text varaint={TypographyVariant.Body1}>Thomas Mesfin</Text>
        </div>
      </div>
      <div className="flex flex-col">
        <Text varaint={TypographyVariant.Body2}>Price</Text>
        <Text varaint={TypographyVariant.Body1}>1100ETB</Text>
      </div>
      <div className="flex flex-col">
        <Text varaint={TypographyVariant.Body2}>Due In</Text>
        <Text varaint={TypographyVariant.Body1}>2 days </Text>
      </div>
      <div className="flex flex-col">
        <Text varaint={TypographyVariant.Body2}>Status</Text>
        <Text varaint={TypographyVariant.Body1}>In progress</Text>
      </div>
      <div className="flex gap-4">
        <Button variant={ButtonVariants.PRIMARY}>Finish</Button>
        <Button variant={ButtonVariants.PRIMARY}>Cancel</Button>
      </div>
    </div>
  )
}

export default JobsCard
