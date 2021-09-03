import React, { useState, useRef, useEffect } from "react";
import Collapse from "@kunukn/react-collapse";
import clsx from "clsx";
import { Button } from "..";
import { ListingCard } from "./ListingCard";

export const CollapseCards = ({
  cards,
  className,
  noBl,
  pts,
  itinerary,
  writer,
  nested,
  ...props
}: any) => {
  const [open, setOpen] = useState(false);

  const collapseContainer = useRef(null);

  useEffect(() => {
    const currentElm = collapseContainer?.current;
    if (!open) {
      currentElm.scrollIntoView();
    }
  }, [open]);
  return (
    <div
      className={clsx(
        `flex justify-center flex-wrap md:justify-start gap-12 relative ${
          open && "mb-14"
        }`,
        className
      )}
      ref={collapseContainer}
      {...props}
    >
      {cards?.slice(0, 4).map((item: any) => {
        return (
          <div className="flex justify-center" key={item.id}>
            <ListingCard
              item={item}
              noBl={noBl}
              itinerary={itinerary}
              writer={writer}
              pts={pts}
              nested={nested}
            />
          </div>
        );
      })}
      {cards?.length > 4 && (
        <>
          <Collapse
            isOpen={open}
            className="duration-500 ease-in-out transition-height"
          >
            <div className="flex flex-wrap justify-center gap-12 md:justify-start">
              {cards?.slice(4).map((item: any, index) => {
                const isLastRow =
                  index === cards.length - 5 || index + 1 === cards.length - 5;
                return (
                  <div
                    className={`${
                      isLastRow ? "mb-3" : ""
                    } flex justify-center `}
                    key={item.id}
                  >
                    <ListingCard
                      item={item}
                      noBl={noBl}
                      itinerary={itinerary}
                      writer={writer}
                      pts={pts}
                      nested={nested}
                    />
                  </div>
                );
              })}
            </div>
          </Collapse>
          <div
            className={`flex justify-center w-full absolute  ${
              open ? "-bottom-10" : "-bottom-3"
            }`}
          >
            <Button
              small
              // className="w-[150px]"
              onClick={(e) => {
                e.preventDefault();
                setOpen(!open);
              }}
            >
              {open ? "Show less" : "Show more"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
