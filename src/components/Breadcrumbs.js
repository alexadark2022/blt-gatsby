import React from "react"
import { Link } from "gatsby"

export const Breadcrumbs = ({ terms = [] }) => {
  return (
    <div className="flex container max-w-big 2xl:px-0 px-5  pt-3">
      {terms?.map((term, index) => {
        const { name, link } = term || {}

        return (
          <div className="uppercase">
            {link ? <Link to={link}>{name}</Link> : `${name}`}
            {index !== terms?.length - 1 && (
              <span className="inline-block mx-3">{`>`}</span>
            )}
          </div>
        )
      })}
    </div>
  )
}
