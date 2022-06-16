import ProfileLayout from "@/layouts/ProfileLayout"
import React, { useState } from "react"
import Button from "@/components/Button"
import ButtonVariants from "@/components/Button/button.enum"
import Input from "@/components/Form/Input"
import { InputType } from "@/components/Form/Input/Input.enum"
import { useGetCurrentUser } from "@/hooks/user"

function Password() {
  const { data: user } = useGetCurrentUser()

  const [oldPassword, setOldPassword] = useState<string>("")
  const [newPassword, setNewPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("")

  return (
    <ProfileLayout>
      <div className="grid grid-cols-1">
        <div className="flex flex-1">
          <div className="grid grid-cols-1 gap-4 px-10 flex-1">
            <Input
              variant={InputType.PASSWORD}
              value={oldPassword}
              onChange={setOldPassword}
              label="Old Password"
            />
            <Input
              variant={InputType.PASSWORD}
              value={newPassword}
              onChange={setNewPassword}
              label="New Password"
            />
            <Input
              variant={InputType.PASSWORD}
              value={confirmPassword}
              onChange={(val) => {
                setConfirmPassword(val)
              }}
              label="Confirm Password"
              error={confirmPasswordError}
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

export default Password
