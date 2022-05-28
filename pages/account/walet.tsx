import Button from "@/components/Button"
import ButtonVariants from "@/components/Button/button.enum"
import Table from "@/components/Table"
import Text from "@/components/Typography"
import { TypographyVariant } from "@/components/Typography/textVariant.enum"
import { useAppDispatch } from "@/hooks/redux"
import DefaultLayout from "@/layouts/DefaultLayout"
import DepositModal from "@/modules/walet/components/DepositModal"
import WithdrawModal from "@/modules/walet/components/WithdrawModal"
import React from "react"
import { ModalType, showModal } from "store/modalSlice"

function Walet() {
  const dispatch = useAppDispatch()
  return (
    <>
      <DefaultLayout>
        <div className="flex flex-col items-center ">
          <Text varaint={TypographyVariant.H2}>Balance</Text>
          <Text className=" !text-7xl mt-6" varaint={TypographyVariant.H1}>
            754 ETB
          </Text>
          <div className=" mt-8 flex gap-10">
            <Button
              onClick={() => {
                dispatch(
                  showModal({
                    modalType: ModalType.DEPOSIT_MODAL,
                    payload: {},
                  })
                )
              }}
              variant={ButtonVariants.PRIMARY}
            >
              Deposit
            </Button>
            <Button
              onClick={() => {
                dispatch(
                  showModal({
                    modalType: ModalType.WITHDRAW_MODAL,
                    payload: {},
                  })
                )
              }}
              variant={ButtonVariants.PRIMARY}
            >
              Withdraw
            </Button>
          </div>
          <div className="mt-20 w-full self-start">
            <Text varaint={TypographyVariant.H1}>Transaction List </Text>
            <Table />
          </div>
        </div>
      </DefaultLayout>
      <DepositModal />
      <WithdrawModal />
    </>
  )
}

export function getServerSideProps() {
  return {
    props: {
      protected: true,
    },
  }
}

export default Walet
