import ProfileLayout from "@/layouts/ProfileLayout"
import React, { useState } from "react"
import Button from "@/components/Button"
import ButtonVariants from "@/components/Button/button.enum"
import Input from "@/components/Form/Input"
import { InputType } from "@/components/Form/Input/Input.enum"
import { useGetCurrentUser } from "@/hooks/user"

function Profile() {
  const { data: user } = useGetCurrentUser()

  const [oldPassword, setOldPassword] = useState(user?.name || "")
  const [newPassword, setNewPassword] = useState(user?.location || "")
  const [confirmPassword, setConfirmPassword] = useState(user?.bio || "")

  return (
    <ProfileLayout>
      <div className="grid grid-cols-1">
        <div className="flex flex-1">
          <div className="grid grid-cols-1 gap-4 px-10 flex-1">
            <Input
              variant={InputType.NORMAL}
              value={oldPassword}
              onChange={setOldPassword}
              label="Old Password"
            />
            <Input
              variant={InputType.NORMAL}
              value={newPassword}
              onChange={setNewPassword}
              label="New Password"
            />
            <Input
              variant={InputType.NORMAL}
              value={confirmPassword}
              onChange={setConfirmPassword}
              label="Confirm Password"
            />
            <Button onClick={} variant={ButtonVariants.PRIMARY}>
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

export default Profile
