import ProfileLayout from "@/layouts/ProfileLayout"
import React, { useState } from "react"
import Button from "@/components/Button"
import ButtonVariants from "@/components/Button/button.enum"
import Input from "@/components/Form/Input"
import { InputType } from "@/components/Form/Input/Input.enum"
import { useGetCurrentUser, useUpdatePasswordMutation } from "@/hooks/user"

function Password() {
  const { data: user } = useGetCurrentUser()

  const [oldPassword, setOldPassword] = useState<string>("")
  const [newPassword, setNewPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("")
  const updatePasswordMutation = useUpdatePasswordMutation()

  console.log(updatePasswordMutation.status)

  return (
    <ProfileLayout>
      <div className="grid grid-cols-1">
        <div className="flex flex-1">
          <div className="grid grid-cols-1 gap-4 px-10 flex-1">
            <form className="flex flex-col" autoComplete="off">
              <Input
                variant={InputType.PASSWORD}
                value={oldPassword}
                onChange={setOldPassword}
                label="Old Password"
                required
              />
              <Input
                variant={InputType.PASSWORD}
                value={newPassword}
                onChange={setNewPassword}
                label="New Password"
                autoComplete="none"
                required
              />
              <Input
                required
                variant={InputType.PASSWORD}
                value={confirmPassword}
                onBlur={() => {
                  if (confirmPassword !== newPassword) {
                    setConfirmPasswordError("Passwords not the same")
                  } else {
                    setConfirmPasswordError("")
                  }
                }}
                onChange={(val) => {
                  setConfirmPassword(val)
                }}
                label="Confirm Password"
                error={confirmPasswordError}
                autoComplete="none"
              />
              <Button
                onClick={() => {
                  updatePasswordMutation.mutate({
                    id: user?.id as string,
                    newPassword,
                    oldPassword,
                  })
                }}
                className="!self-end !px-8 mt-8"
                variant={ButtonVariants.PRIMARY}
                disabled={!!confirmPasswordError}
              >
                Save
              </Button>
            </form>
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

export default Password
