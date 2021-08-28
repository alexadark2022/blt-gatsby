// @ts-nocheck
import React from "react"
import clsx from "clsx"
import slugify from "slugify"
import AnchorLink from "react-anchor-link-smooth-scroll"
import { Button } from "./Button"

export const Tabs = ({ tabs = [], className, ...props }) => {
  return (
    <div
      className={clsx(
        // 'flex flex-wrap justify-start -mx-1 md:justify-between sm:flex-nowrap',
        `grid ${
          tabs.length === 6 ? "md:grid-cols-6" : "md:grid-cols-5"
        } grid-cols-2 sm:grid-cols-3 gap-1`,
        className
      )}
      {...props}
    >
      {tabs?.map((tab) => {
        if (tab.name != "map") {
          return (
            <Button
              as={AnchorLink}
              tab
              className={clsx(
                "h-[54px]",

                "!text-grey4"
              )}
              key={tab.name}
              href={`#${slugify(tab.name.toLowerCase())}`}
            >
              {tab.name}
            </Button>
          )
        } else if (tab.name == "map") {
          return (
            // <Link
            //   href={`${router.asPath}/${slugify(tab.name.toLowerCase())}`}
            //   key={tab.name}
            // >
            //   <a
            //     className={`block hover:no-underline md:min-w-1/${tabs.length} sm:min-w-1/3 min-w-1/2`}
            //   >
            <Button className={clsx("h-[54px]", "!text-grey4")} tab>
              {tab.name}
            </Button>
            //   </a>
            // </Link>
          )
        }
      })}
    </div>
  )
}
