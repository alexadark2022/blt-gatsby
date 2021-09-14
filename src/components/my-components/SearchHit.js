import React from "react";
import { connectInfiniteHits } from "react-instantsearch-dom";
import { Link } from "gatsby";
import clsx from "clsx";
import { Button } from "../ui-components/Button";
const SearchHit = ({ hits, hasMore, view, refineNext }) => {
  return (
    <>
      <div
        className={clsx("listings listings p-5 border shadow-lg", {
          "p-0 border-0 shadow-none": view === "grid",
        })}
      >
        <div
          className={clsx(
            "other ",
            {
              "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-x-4":
                view === "grid",
            },
            {
              "grid  grid-cols-1 gap-x-4": view === "list",
            }
          )}
        >
          {hits.map((hit) => {
            return (
              <div key={hit.objectID} className="shadow-listing p-2 pr-3 mb-5">
                <div className="max-w-[470px] flex flex-col justify-between">
                  <div>
                    <Link className="hover:no-underline " to={hit?.uri ?? "/"}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: hit.title,
                        }}
                        className="font-bold leading-none text-grey4 text-f-24"
                      >
                        {/* {hit.title} */}
                      </div>
                    </Link>
                    {hit.commonDataAttributes.textCountry}
                    <div className="mt-4 mb-3 mr-2 leading-tight prose">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: hit.commonDataAttributes.standfirst,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div
        className={clsx("flex justify-center", {
          "mt-6": view === "list",
        })}
      >
        <Button disabled={!hasMore} onClick={refineNext} className="h-10">
          Load More
        </Button>
      </div>
    </>
  );
};
export default connectInfiniteHits(SearchHit);
