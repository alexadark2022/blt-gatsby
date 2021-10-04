import React from "react"
import { Link } from "gatsby"
import clsx from "clsx"

export const Branding = ({ className, ...props }) => {
  return (
    <h1
      className={clsx(
        "text-white text-f-28 sm:text-[48px] font-light",
        className
      )}
      {...props}
    >
      <Link to="/" className="text-white hover:text-white hover:no-underline">
        {/* bucket list{' '}
          <span className="ml-4 text-gold font-script"> travels</span> */}
        <img
          src="/images/bl-logo-horiz.svg"
          alt="logo"
          className="sm:w-[300px] w-[200px]"
        />
      </Link>
    </h1>
  )
}
