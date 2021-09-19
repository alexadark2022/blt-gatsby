import React from "react";
import { connectInfiniteHits } from "react-instantsearch-dom";
import { Link } from "gatsby";
import clsx from "clsx";
import { FaTrashAlt as Trash } from "react-icons/fa";
import { Button } from "../ui-components/Button";
const SearchHit = ({ hits, hasMore, view, refineNext }) => {
  let listView = view || "list";
  return (
    <>
      <div
        className={clsx("listings listings p-5 sm:border sm:shadow-lg", {
          "p-0 border-0 sm:border-0 shadow-none sm:shadow-none":
            listView === "grid",
        })}
      >
        <div
          className={clsx(
            "other ",
            {
              "grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 gap-x-4":
                listView === "grid",
            },
            {
              "grid  grid-cols-1 gap-x-4": listView === "list",
            }
          )}
        >
          {!hits && <p>Loading...</p>}
          {hits.map((hit) => {
            return (
              <div
                key={hit.objectID}
                className={clsx(
                  {
                    "shadow-listing pb-4 mb-5 relative max-w-[249px] mx-auto ":
                      listView === "grid",
                  },
                  {
                    "shadow-listing pb-4 sm:pb-3 sm:p-2 mb-5 relative max-w-[249px]  mx-auto sm:max-w-none":
                      listView === "list",
                  }
                )}
              >
                <div
                  className={clsx(
                    {
                      "flex flex-col justify-between": listView === "grid",
                    },
                    {
                      "flex flex-col sm:flex-row justify-between":
                        listView === "list",
                    }
                  )}
                >
                  <div
                    className={clsx(
                      {
                        "flex flex-col": listView === "grid",
                      },
                      {
                        "flex flex-col sm:flex-row  sm:space-x-4":
                          listView === "list",
                      }
                    )}
                  >
                    <div className="image">
                      <div className="w-[249px] h-[166px]">
                        <img
                          src={hit?.featuredImage?.node?.sourceUrl ?? ""}
                          alt=""
                        />
                      </div>
                    </div>
                    <div
                      className={clsx(
                        {
                          "rest p-4": listView === "grid",
                        },
                        {
                          "rest p-4 sm:p-0": listView === "list",
                        }
                      )}
                    >
                      <div className="max-w-[470px] flex flex-col justify-between">
                        <div>
                          <Link
                            className={clsx(
                              {
                                "hover:no-underline text-center":
                                  listView === "grid",
                              },
                              {
                                "hover:no-underline text-center sm:text-left":
                                  listView === "list",
                              }
                            )}
                            to={hit?.uri ?? "/"}
                          >
                            <div
                              dangerouslySetInnerHTML={{
                                __html: hit.title,
                              }}
                              className="font-bold leading-none text-grey4 text-f-24"
                            >
                              {/* {hit.title} */}
                            </div>
                          </Link>
                          <div
                            className={clsx(
                              {
                                "text-center": listView === "grid",
                              },
                              {
                                "text-center sm:text-left": listView === "list",
                              }
                            )}
                          >
                            {hit.commonDataAttributes.textCountry}
                          </div>
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
                  </div>
                  <div
                    className={clsx(
                      {
                        "action flex flex-col items-center justify-between":
                          listView === "grid",
                      },
                      {
                        "action flex flex-col items-center sm:items-end justify-between":
                          listView === "list",
                      }
                    )}
                  >
                    <div
                      className={clsx(
                        {
                          "absolute top-0 right-0 mr-4 mt-4":
                            listView === "grid",
                        },
                        {
                          "absolute top-0 right-0 mr-4 mt-4 sm:relative sm:mr-0 sm:mt-0":
                            listView === "list",
                        }
                      )}
                    >
                      <Button
                        type="button"
                        secondary
                        className={clsx(
                          "w-10 h-10 !p-0 !bg-transparent cursor-pointer hover:!bg-lightBlue"
                        )}
                      >
                        <Trash className="text-gold text-[20px]" />
                      </Button>
                    </div>
                    <Link className="hover:no-underline" to={hit?.uri ?? "/"}>
                      <Button secondary className="!text-[11px]">
                        Read review
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div
        className={clsx("flex justify-center", {
          "mt-6": listView === "list",
        })}
      >
        <Button
          disabled={!hasMore}
          onClick={refineNext}
          className={clsx("h-10 block", {
            "!hidden": !hasMore,
          })}
        >
          Load More
        </Button>
      </div>
    </>
  );
};
export default connectInfiniteHits(SearchHit);
