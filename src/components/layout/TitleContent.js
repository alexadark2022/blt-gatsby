import React from "react"
import { Typo } from "../ui-components"

export const TitleContent = ({
  title = null,
  content,
  className = "",
  ...props
}) => {
  if (!content) {
    return null
  }
  return (
    <div {...props}>
      {title && (
        <Typo as="h3" h3 className={`mb-base ${className ? className : ""}`}>
          {title}
        </Typo>
      )}
      <div className="prose-lg" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}
