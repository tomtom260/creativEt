import axios from "axios"
import { TransferMoney, TransferMoneyClient, TYenepayApi } from "./types"

export function sendMoneyAPI({ id, type, amount, merchantId }: TYenepayApi) {
  return axios.post(
    "https://testapi.yenepay.com/api/urlgenerate/getcheckouturl/",
    {
      process: "Express",
      successUrl: "http://localhost:3000/api/yenepay",
      cancelUrl: "http://localhost:3000/api/yenepay",
      merchantId,
      merchantOrderId: id,
      expiresAfter: 24,
      Items: [
        {
          itemId: id,
          itemName: type,
          unitPrice: amount,
          quantity: 1,
        },
      ],
      totalItemsDeliveryFee: 0,
      totalItemsTax1: 0,
    }
  )
}

export function createMoneyTransactionAPI(data: TransferMoneyClient) {
  return axios.post("/api/walet", data)
}
