import React, { Fragment } from "react"
import { Link } from "gatsby"
import { TitleContent } from "./TitleContent"
import { Date } from "../post"

export const About = ({
  writer = [],
  date,
  text,
  author,
  about,
  review,
  socialShare,
  children,
  ...props
}) => {
  return (
    <Fragment {...props}>
      {writer && (
        <div className="justify-between mb-5 text-f-18 sm:flex md:text-f-22">
          <div>
            Expert travel writer:{" "}
            <Link
              to={author ? `/writer/${author.slug}` : writer?.uri || ""}
              target="_blank"
            >
              {author ? author.name : writer?.title}
            </Link>
          </div>
          <div>
            Last updated: <Date date={date} />
          </div>
        </div>
      )}
      <div className="space-y-base2">
        <TitleContent content={about} />

        {children}
        {review?.map((section, i) => {
          const { title, content } = section
          return <TitleContent key={i} title={title} content={content} />
        })}
        <div className="text-center text-gold text-f-24">{text}</div>
        {socialShare}
      </div>
    </Fragment>
  )
}
