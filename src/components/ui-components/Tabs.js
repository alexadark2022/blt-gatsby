// @ts-nocheck
import React, { useContext } from "react";
import clsx from "clsx";
import slugify from "slugify";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { Button } from "./Button";
import { GlobalDispatchContext } from "../../context/GlobalContextProvider";

export const Tabs = ({ tabs = [], className, mapOpen, ...props }) => {
  const dispatch = useContext(GlobalDispatchContext);
  const closeModal = () => dispatch({ type: "SET_MAP_CLOSE" });
  const toggleModal = () => dispatch({ type: "TOGGLE_MAP_OPEN" });
  return (
    <div
      className={clsx(
        // 'flex flex-wrap justify-start -mx-1 md:justify-between sm:flex-nowrap',
        `grid ${
          tabs.length === 6 ? "md:grid-cols-6" : "md:grid-cols-5"
        } grid-cols-2 sm:grid-cols-3 gap-1`,
        className
      )}
      {...props}
    >
      {tabs?.map((tab) => {
        if (tab.name != "map") {
          return (
            <Button
              as={AnchorLink}
              tab
              className={clsx(
                "h-[54px]",

                "!text-grey4"
              )}
              key={tab.name}
              href={`#${slugify(tab.name.toLowerCase())}`}
              onClick={closeModal}
            >
              {tab.name}
            </Button>
          );
        } else if (tab.name == "map") {
          return (
            <Button
              key={tab.name}
              className={clsx("h-[54px]", "!text-grey4")}
              onClick={mapOpen}
              tab
            >
              {tab.name}
            </Button>
          );
        }
      })}
    </div>
  );
};
