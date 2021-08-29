import React from "react";
import clsx from "clsx";
import { ListingCard } from "./ListingCard";

export const CardsGrid = ({
  cards,
  className,
  noBl,
  pts,
  itinerary,
  writer,
  nested,
  ...props
}: any) => {
  return (
    <div
      className={clsx(
        "flex justify-center flex-wrap md:justify-start gap-12",
        className
      )}
      {...props}
    >
      {cards?.map((item: any) => {
        return (
          <div className="flex justify-center " key={item.id}>
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
  );
};
