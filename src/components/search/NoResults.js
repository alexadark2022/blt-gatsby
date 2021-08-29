import React from "react";
import clsx from "clsx";
import { Section } from "../ui-components";

const EmptyListing = () => {
  return (
    <div className="w-full p-2 shadow-listing mb-base2">
      <div className="h-[166px] w-[249px] bg-veryLightGold"></div>
    </div>
  );
};
const emptyListings = Array.from(Array(4).keys());

export const NoResults = ({ className, title, subtitle }) => {
  return (
    <>
      <Section className={clsx("p-5 md:py-10 md:px-12 mb-base2", className)}>
        <div className="text-center text-orange text-f-24 md:text-f-36">
          {title}
        </div>
        {subtitle && <div className="text-[20px] mt-5">{subtitle}</div>}
      </Section>
      <Section
        className={clsx("pt-6 pb-3 px-base2 mb-base2", "hidden md:block")}
      >
        {emptyListings.map((item, i) => (
          <EmptyListing key={i} />
        ))}
      </Section>
    </>
  );
};
