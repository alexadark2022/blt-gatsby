import React from "react";
import { Typo } from "../ui-components";
import { FaCheck, FaTimes } from "react-icons/fa";
import clsx from "clsx";

export const Feature = ({ children, disabled, optional }) => {
  return (
    <div
      className={clsx("flex", "py-3 md:py-0", {
        "text-grey3": disabled || optional,
      })}
    >
      {disabled ? (
        <FaTimes className="text-grey3 text-f-24 min-w-[20px] mr-3" />
      ) : (
        <FaCheck
          className={clsx("min-w-[20px] mr-3 text-gold text-f-22", {
            "text-grey3": optional,
          })}
        />
      )}

      <div>{children}</div>
    </div>
  );
};

export const FeatureRow = ({ className, ...props }) => {
  return (
    <div
      className={clsx(
        "block sm:grid grid-cols-2 md:grid-cols-4 sm:gap-x-20 md:gap-x-8 lg:gap-x-14",
        "md:py-6 p-0",
        "border-0 md:border-b border-grey2 last:border-0",
        className
      )}
      {...props}
    />
  );
};

export const HotelFeatures = ({ title, children, ...props }) => {
  return (
    <div className="mb-12" {...props}>
      <Typo as="h3" h3 className="pb-3 mb-3 border-b md:mb-0 border-grey3">
        {title}
      </Typo>
      {children}
    </div>
  );
};
