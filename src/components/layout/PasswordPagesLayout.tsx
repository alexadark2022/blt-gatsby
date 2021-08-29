import React from "react";
import { Image } from "../images";
import clsx from "clsx";

export const PasswordPagesLayout = ({ title, image, children }: any) => {
  return (
    <div className={clsx("h-[450px] sm:h-[881px] w-full relative mb-base2")}>
      <div className="z-0">
        <Image
          img={image?.localFile}
          alt={image?.altText}
          loading="eager"
          objectFit="cover"
          objectPosition="center"
        />
      </div>
      <div className={clsx("absolute inset-0")}>
        <div className={`container max-w-[940px] px-5`}>
          <h1
            className={`sm:text-[60px] text-[30px] leading-tight text-white text-center font-bold mb-5 sm:mb-10 mt-16 sm:mt-[20%]`}
          >
            {title}
          </h1>
          {children}
        </div>
      </div>
    </div>
  );
};
