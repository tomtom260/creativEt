import TrashSVG from "@/assets/icons/Trash"
import Button from "@/components/Button"
import ButtonVariants from "@/components/Button/button.enum"
import Input from "@/components/Form/Input"
import { InputType, InputVariant } from "@/components/Form/Input/Input.enum"
import Select from "@/components/Form/Select"
import Text from "@/components/Typography"
import { TypographyVariant } from "@/components/Typography/textVariant.enum"
import DefaultLayout from "@/layouts/DefaultLayout"
import UploadContent from "@/modules/content/components/UploadContent"
import { getTags } from "@/modules/content/server"
import useContentService from "@/service/content"
import { images } from "@/utils/images"
import Image from "next/image"
import { useRouter } from "next/router"
import React, { useState, useContext } from "react"
import Dropzone from "react-dropzone"
import { useQueryClient } from "react-query"

function Upload({ tags }) {
  return (
    <DefaultLayout>
      <div className="md:w-[65%] mx-auto">
        <UploadContent tags={tags} />
      </div>
    </DefaultLayout>
  )
}

export async function getStaticProps() {
  const tags = await getTags()
  return {
    props: {
      protected: true,
      tags,
    },
    revalidate: 60 * 60 * 24,
  }
}

export default Upload
