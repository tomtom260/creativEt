import ProfileLayout from "@/layouts/ProfileLayout"
import React, { useState } from "react"
import Button from "@/components/Button"
import ButtonVariants from "@/components/Button/button.enum"
import Input from "@/components/Form/Input"
import { InputType } from "@/components/Form/Input/Input.enum"
import { useGetCurrentUser } from "@/hooks/user"

function General() {
  const { data: user } = useGetCurrentUser()

  const [email, setEmail] = useState(user?.email || "")
  const [username, setUsername] = useState(user?.username || "")

  return (
    <ProfileLayout>
      <div className="grid grid-cols-1">
        <div className="flex flex-1">
          <div className="grid grid-cols-1 gap-4 px-10 flex-1">
            <Input
              variant={InputType.NORMAL}
              value={email}
              onChange={setEmail}
              label="Email"
            />
            <Input
              variant={InputType.NORMAL}
              value={username}
              onChange={setUsername}
              label="Username"
            />
            <Button onClick={() => {}} variant={ButtonVariants.PRIMARY}>
              Save
            </Button>
          </div>
        </div>
      </div>
    </ProfileLayout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  }
}

export default General
