import React from "react"

export const IntroText = ({ content, className, ...props }) => {
  return (
    <div
      className={`p-3 mx-4 mb-5 sm:mx-7 bg-veryLightGold prose max-w-none ${className} `}
      // css={{ p: { marginBottom: '15px' } }}
      dangerouslySetInnerHTML={{ __html: content }}
      {...props}
    />
  )
}
