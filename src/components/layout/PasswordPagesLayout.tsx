import React from "react";
import { Image } from "../images";
import clsx from "clsx";

export const PasswordPagesLayout = ({ title, image, children }: any) => {
  return (
    <div className={clsx(" relative mb-base2")}>
      <Image
        img={image?.localFile}
        alt={image?.altText}
        loading="eager"
        objectFit="cover"
        objectPosition="center"
        className="h-[450px] sm:h-[600px] w-full"
      />

      <div className={clsx("absolute inset-0")}>
        <div className={`container max-w-[940px] px-5`}>
          <h1
            className={`sm:text-[60px] text-[30px] leading-tight text-white text-center font-bold mb-5 sm:mb-10 mt-16 sm:mt-[150px]`}
          >
            {title}
          </h1>
          {children}
        </div>
      </div>
    </div>
  );
};
