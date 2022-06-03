import { useAppSelector } from "@/hooks/redux"
import React from "react"
import Toast from "."

function ToastContainer() {
  const toasts = useAppSelector((state) => state.toast.toasts)
  return (
    <div className="fixed flex  flex-col -z-10 gap-6 h-96 w-fit top-20 right-16">
      {toasts.map((toast) => (
        <Toast key={toast.id} />
      ))}
    </div>
  )
}

export default ToastContainer
