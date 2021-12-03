import React, { useState } from "react";
import Collapse from "@kunukn/react-collapse";
import { Button } from "..";
import { Listing } from "./Listing";
import { AffiliateListing } from "./AffiliateListing";

export const CollapseListings = ({
  listings,
  noBl,
  destinationGuide,
  pts,
  distance,
  affiliate,
  ...props
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="hidden md:block" {...props}>
      {listings?.slice(0, 4)?.map((item) => {
        const { __typename } = item;

        return (
  affiliate ? <AffiliateListing item={item} key={item.product_code}  className="mx-4 sm:mx-7"/>:
          <Listing
            item={item}
            key={item.id || item.title}
            className="mx-4 sm:mx-7"
            profile="full"
            noBl={noBl}
            itinerary={__typename === "Itinerary"}
            writer={__typename === "writer"}
            pts={pts || __typename === "PlaceToStay"}
            distance={distance}
          />
        );
      })}
      {listings?.length > 4 && (
        <>
          <Collapse
            isOpen={open}
            className="duration-500 ease-in-out transition-height"
          >
            {listings?.slice(4)?.map((item) => {
               const { __typename } = item;
              return (
                affiliate ? <AffiliateListing item={item} key={item.product_code}  className="mx-4 sm:mx-7"/>:
                <Listing item={item} key={item.id} className="mx-4 sm:mx-7" profile="full"
                noBl={noBl}
                itinerary={__typename === "Itinerary"}
                writer={__typename === "writer"}
                pts={pts || __typename === "PlaceToStay"}
                distance={distance}/>
              );
            })}
          </Collapse>
          <div className={`flex justify-center`}>
            <Button
              secondary
              className="mt-base w-[150px]"
              onClick={(e) => {
                e.preventDefault();
                setOpen(!open);
              }}
            >
              {open ? "Close" : "Show more"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
