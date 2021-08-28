import React from "react"
import { FaStar } from "react-icons/fa"

export const StarIcons = ({ stars, small, card }) => {
  return (
    <div className={`flex ${card && "justify-center"}`}>
      {Array.from(Array(stars).keys()).map((item, i) => (
        <FaStar
          key={i}
          className={` text-gold ${
            small ? "text-base mr-1" : "text-f-22 mr-2"
          }`}
        />
      ))}
    </div>
  )
}
