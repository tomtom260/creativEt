import Button from "@/components/Button"
import ButtonVariants from "@/components/Button/button.enum"
import Table from "@/components/Table"
import Text from "@/components/Typography"
import { TypographyVariant } from "@/components/Typography/textVariant.enum"
import { useAppDispatch } from "@/hooks/redux"
import { useGetCurrentUser } from "@/hooks/user"
import DefaultLayout from "@/layouts/DefaultLayout"
import DepositModal from "@/modules/walet/components/DepositModal"
import WithdrawModal from "@/modules/walet/components/WithdrawModal"
import { getMoneyTransaction } from "@/modules/walet/server"
import { changeDateInJSONToMoment } from "@/utils/changeDateToMoment"
import { MoneyTransaction } from "@prisma/client"
import moment from "moment"
import { GetServerSidePropsContext } from "next"
import { getSession } from "next-auth/react"
import React from "react"
import { ModalType, showModal } from "store/modalSlice"

function Walet({ transactions }: { transactions: MoneyTransaction[] }) {
  const dispatch = useAppDispatch()
  const { balance } = useGetCurrentUser().data
  return (
    <>
      <DefaultLayout>
        <div className="flex flex-col items-center ">
          <Text varaint={TypographyVariant.H2}>Balance</Text>
          <Text className=" !text-7xl mt-6" varaint={TypographyVariant.H1}>
            {balance} ETB
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
            <Table
              className=""
              items={transactions.sort((a, b) =>
                moment(b.transactionAt).isBefore(moment(a.transactionAt))
                  ? -1
                  : 1
              )}
            />
          </div>
        </div>
      </DefaultLayout>
      <DepositModal />
      <WithdrawModal />
    </>
  )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getSession(ctx)
  const userId = session?.user.id
  const transactions = await getMoneyTransaction({ userId })
  return {
    props: {
      protected: true,
      transactions: changeDateInJSONToMoment(transactions),
    },
  }
}

export default Walet
