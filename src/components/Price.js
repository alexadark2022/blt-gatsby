import React from "react"
import clsx from "clsx"
import { Button } from "./ui-components"

export const Price = ({ priceCheckingLinks, website, className, ...props }) => {
  return (
    <div
      className={clsx(
        "justify-between items-center block xl:flex",
        "text-f-18 text-grey5",
        className
      )}
      {...props}
    >
      <div>Check pricing & availability on:</div>
      <div className="relative flex flex-wrap items-center">
        {priceCheckingLinks?.map((item, i) => {
          return (
            <a href={item.url} key={i} target="_blank" rel="noreferrer">
              <img
                src={item?.logo?.sourceUrl}
                alt={item?.logo?.altText}
                className="max-w-[100px] mx-3"
              />
            </a>
          )
        })}
        {website && (
          <Button
            secondary
            as="a"
            href={website}
            target="_blank"
            className="my-4 ml-3 text-sm"
          >
            Hotel Website
          </Button>
        )}
      </div>
    </div>
  )
}
