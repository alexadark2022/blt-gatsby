import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import clsx from "clsx";
import { useBucketList } from "../../lib/hooks/useBucketList";
import { AddToBlButton } from "../bucket-list/AddToBlButton";
import { Button } from "..";

export const AffiliateListing = ({ className, item, ...props }) => {
  const { title, link, description, destination_names } = item;
  const destination = destination_names[0]?.name;
  const { addToBl, removeFromBl, isAdded } = useBucketList(item);
  return (
    <div className={clsx("shadow-listing", "p-2 pr-3 mb-5 ", className)}>
      <div className={clsx("flex justify-between")} {...props}>
        <div className="flex">
          {/* Left: Image */}
          <a
            href={`${link}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:no-underline"
          >
            <StaticImage
              src="../../images/viator-image.svg"
              alt="logo"
              width={249}
              heigt={166}
              className="mr-5"
            />
          </a>
          <div
            className={`
              max-w-[470px]
         flex flex-col justify-between`}
          >
            <a
              href={`${link}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:no-underline"
            >
              <h2
                className="font-bold leading-none text-grey4 text-f-24"
                dangerouslySetInnerHTML={{ __html: title }}
              />
            </a>
            <div className="flex space-x-2">
              <h3 className="mb-2 text-f-18 text-grey5">{destination}</h3>
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: description,
              }}
              className="mt-4 mb-3 mr-2 leading-tight prose"
            />
          </div>
        </div>
        <div className="flex flex-col items-end justify-between">
          {isAdded ? (
            <AddToBlButton remove addToBl={removeFromBl} />
          ) : (
            <AddToBlButton add addToBl={addToBl} />
          )}
          <Button
            secondary
            as="a"
            className="!text-sm"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Website
          </Button>
          <div></div>
        </div>
      </div>
    </div>
  );
};
