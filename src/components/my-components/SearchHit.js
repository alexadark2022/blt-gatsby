import React from "react";
import { Link } from "gatsby";
export default function SearchHit({ hit }) {
  return (
    <>
      <div className="shadow-listing p-2 pr-3 mb-5">
        <div className="max-w-[470px] flex flex-col justify-between">
          <div>
            <Link className="hover:no-underline " to={hit?.uri ?? "/"}>
              <h2 className="font-bold leading-none text-grey4 text-f-24">
                {hit.title}
              </h2>
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
    </>
  );
}
