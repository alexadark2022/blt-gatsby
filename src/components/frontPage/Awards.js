import React from 'react'

export const Awards = ({ awards }) => {
  return (
    <div className="pt-4 pb-8 border bg-[#eaecf2] border-grey-2">
      <h3 className="text-center uppercase text-grey5 font-bold tracking-[3px]">
        As recommended by
        <div className="md:flex  justify-between flex-wrap md:flex-nowrap container max-w-[1100px]  mt-5 space-x-5 px-5 ">
          {awards?.map((item, i) => {
            const { logo, url } = item
            return (
              <div key={i} className="flex justify-center">
                <img
                  src={logo?.sourceUrl}
                  alt={logo?.altText}
                  className="w-auto h-12 mt-5 mb-5 md:mb-0"
                />
              </div>
            )
          })}
        </div>
      </h3>
    </div>
  )
}
