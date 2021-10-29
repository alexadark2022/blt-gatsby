import React from "react"
import clsx from "clsx"

export const Number = ({ number, className = "", ...props }) => {
  return (
    <div
      className={clsx(
        "text-[34px] font-bold",
        " min-w-[50px] min-h-[50px] p-1",
        "flex justify-center items-center",
        "border-3 border-gold",
        className
      )}
      {...props}
    >
      {number}
    </div>
  )
}
