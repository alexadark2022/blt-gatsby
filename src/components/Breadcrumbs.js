import React from "react"
import { Link } from "gatsby"

export const Breadcrumbs = ({ terms = [] }) => {
  return (
    <div className="flex space-x-3 container max-w-big  pt-3">
      {terms?.map((term, index) => {
        const { name, link } = term || {}

        return (
          <div className="space-x-3 uppercase">
            {link ? <Link to={link}>{name}</Link> : `${name}`}
            {index !== terms?.length - 1 && <span>{`>`}</span>}
          </div>
        )
      })}
    </div>
  )
}
