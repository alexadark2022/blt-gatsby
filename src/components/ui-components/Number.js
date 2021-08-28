import React from "react"
import clsx from "clsx"

export const Number = ({ number, className = "", ...props }) => {
  return (
    <div
      className={clsx(
        "text-[34px] font-bold",
        "w-[50px] min-w-[50px] h-[50px] ",
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
