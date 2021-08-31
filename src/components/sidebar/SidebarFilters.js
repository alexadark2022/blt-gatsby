import React from "react";
import { WithCollapse, Button, Typo } from "components";
import { IoCloseSharp as Close } from "react-icons/io5";
import clsx from "clsx";

export const SidebarFilters = ({
  filtersComponents,
  openFilters,
  setOpenFilters,
}) => {
  return (
    <WithCollapse
      isOpen={openFilters}
      className="duration-500 ease-in-out transition-height"
    >
      <div
        className={clsx(
          "w-full lg:w-[300px]",
          "order-1 lg:order-2",
          "bg-white "
        )}
      >
        <div className="relative px-5 pt-3 pb-10 mb-10 border border-grey2">
          <div
            className="absolute flex items-center justify-center border-2 cursor-pointer top-4 right-4 w-base2 h-base2 border-lightBlue lg:hidden"
            onClick={(e) => {
              e.preventDefault();
              setOpenFilters(false);
            }}
          >
            <Close className="absolute text-xl text-lightBlue " />
          </div>
          <Typo
            as="h3"
            h3
            className="p-2 mb-2 text-center border-b border-grey2"
          >
            Filter your results
          </Typo>
          <div className="flex justify-center mb-3">
            <Button secondary small>
              Reset all
            </Button>
          </div>
          {filtersComponents}
        </div>
      </div>
    </WithCollapse>
  );
};
