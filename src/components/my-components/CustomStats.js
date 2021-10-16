import { connectStats } from "react-instantsearch-dom";
import React from "react";
import { Number } from "./../ui-components/Number";
const Stats = ({ nbHits, searchText }) => {
  const resultsString = nbHits === 1 ? "result" : "results";
  if (!searchText) {
    return null;
  }
  return (
    <>
      <div className="flex items-center mt-5">
        <Number number={nbHits} />
        <div className="ml-3 font-bold text-f-26">
          {" "}
          {resultsString} found for &apos;{searchText}&apos;
        </div>
      </div>
    </>
  );
};
export default connectStats(Stats);
