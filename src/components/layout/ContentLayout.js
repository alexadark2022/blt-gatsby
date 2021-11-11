import React from "react";
import clsx from "clsx";
import Sticky from "react-stickynode";

export const ContentLayout = ({ children, sidebar, isFilters }) => {
  return (
    <div
      id="content"
      className={clsx(
        "container  px-5 max-w-big 2xl:px-0 ",
        "flex flex-col lg:flex-row t"
      )}
    >
      <div
        className={clsx(
          "w-full  lg:w-2/3 xl:w-[940px]",

          "mb-7 lg:mb-0 mr-7 xl:ml-14 ",
          { "order-2 lg:order-1": isFilters }
        )}
      >
        {children}
      </div>
      <div
        className={clsx(
          "w-full lg:w-1/3 xl:w-[320px] ",
          "lg:mt-base2  lg:mr-5 mb-base2 lg:mb-0",
          {
            "lg:-mt-40": !isFilters,
            "order-1 lg:order-2": isFilters,
          }
        )}
      >
        <Sticky bottomBoundary="#content">{sidebar}</Sticky>
      </div>
    </div>
  );
};
