import ProfileLayout from "@/layouts/ProfileLayout"
import React, { useState } from "react"
import Button from "@/components/Button"
import ButtonVariants from "@/components/Button/button.enum"
import Input from "@/components/Form/Input"
import { InputType } from "@/components/Form/Input/Input.enum"
import {
  useGetCurrentUser,
  useUpdateEmailAndUsernameMutation,
} from "@/hooks/user"
import { checkifEmailExists, checkifUsernameExists } from "@/api/user"
import { checkifEmailIsValid } from "@/utils/emailRegex"

function General() {
  const { data: user } = useGetCurrentUser()

  const [email, setEmail] = useState(user?.email || "")
  const [username, setUsername] = useState(user?.username || "")
  const [usernameError, setUsernameError] = useState<string>("")
  const [emailError, setEmailError] = useState<string>("")
  const updateEmailUsernameMutation = useUpdateEmailAndUsernameMutation()

  return (
    <ProfileLayout>
      <div className="grid grid-cols-1">
        <div className="flex flex-1">
          <div className="grid grid-cols-1 gap-4 px-10 flex-1">
            <Input
              variant={InputType.NORMAL}
              value={email}
              onChange={(val) => {
                val && checkifEmailIsValid(val)
                  ? user?.email !== val &&
                    checkifEmailExists(val).then((val) => {
                      if (val) {
                        setEmailError("Email Already Exists")
                      } else {
                        setEmailError("")
                      }
                    })
                  : setEmailError("Not a valid Email")
                setEmail(val)
              }}
              label="Email"
              error={emailError}
            />
            <Input
              error={usernameError}
              variant={InputType.NORMAL}
              value={username}
              onChange={(val) => {
                val &&
                  user?.username !== val &&
                  checkifUsernameExists(val).then((val) => {
                    if (val) {
                      setUsernameError("Username Exists")
                    } else {
                      setUsernameError("")
                    }
                  })
                setUsername(val)
              }}
              label="Username"
            />
            <Button
              onClick={() => {
                if (!usernameError && !emailError) {
                  updateEmailUsernameMutation.mutate({
                    id: user?.id as string,
                    email: email !== user?.email ? email : undefined,
                    username:
                      username !== user?.username ? username : undefined,
                  })
                }
              }}
              variant={ButtonVariants.PRIMARY}
            >
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
