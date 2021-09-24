import React from "react";
import tw from "twin.macro";
import clsx from "clsx";
import styled from "@emotion/styled";

export const Typo = styled.h2(({ h1, h3, h4, light, intro, travelQuote }) => [
  tw`leading-tight text-grey5`,
  tw`text-f-26 sm:text-f-36`,
  h1 && tw`font-light text-f-40 sm:text-f-60`,
  h3 && tw`text-f-24 sm:text-f-26`,
  h4 && tw`text-f-22 sm:text-f-22`,
  light && tw`text-white`,
  intro && tw`text-f-24 sm:text-f-24 text-grey4`,
  travelQuote &&
    tw`leading-relaxed text-center sm:leading-loose text-gold font-script text-f-22 sm:text-f-40`,
]);

export const TravelQuote = ({ author, children, className, ...props }) => {
  return (
    <div className={clsx("container px-5 sm:my-10", className)} {...props}>
      <Typo as="h2" travelQuote>
        {children}
      </Typo>
      <div className="text-center text-gold font-light capitalize text-[30px] mt-10">
        {author}
      </div>
    </div>
  );
};
