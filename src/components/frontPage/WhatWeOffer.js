import React from "react";
import { Number, Underline } from "../ui-components";
import clsx from "clsx";
import { SocialShare } from "../social";

export const WhatWeOffer = ({ whatWeOffer, url }) => {
  const { wwoItems, wwoTextBelow, wwoTitle } = whatWeOffer;
  return (
    <div className="container px-5 py-6 bg-white md:pt-4 md:pb-10 max-w-big">
      {/* Title */}
      <div className="flex flex-col items-center mb-10">
        <h2 className="text-center text-f-40 md:text-[48px] text-grey5 font-light mb-5">
          {wwoTitle}
        </h2>
        <Underline />
      </div>
      {/* Items */}
      <div
        className={clsx(
          "gap-10 md:grid grid-cols-3 lg:grid-cols-5",
          "mb-10",
          "space-y-8 md:space-y-0"
        )}
      >
        {wwoItems?.map((item, i) => {
          return (
            <div
              key={i}
              className="flex md:flex-col  items-center md:max-w-[230px] "
            >
              <Number number={i + 1} className="mr-4 md:mb-4 md:mr-0" />

              <div className="md:text-[20px] text-f-18 leading-snug md:text-center max-w-[400px]">
                {item.content}
              </div>
            </div>
          );
        })}
      </div>
      <div className="hidden text-center text-gold text-f-30 md:block">
        {wwoTextBelow}
      </div>
      <SocialShare url={url} className="mt-5" />
    </div>
  );
};
