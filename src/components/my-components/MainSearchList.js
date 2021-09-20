import { connectRefinementList } from "react-instantsearch-dom";
import clsx from "clsx";
import React from "react";
const MainSearchList = (props) => {
  const { values, currentRefinement, items, refine, setMainState } = props;
  const AllTotal = items.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.count;
  }, 0);
  return (
    <div>
      <ul className="ais-RefinementList-list grid md:grid-cols-6 grid-cols-2 sm:grid-cols-3 gap-4 uppercase">
        <li className="border text-center">
          <button
            className={clsx(
              "all-button h-[45px] sm:h-[54px] md:min-w-1/6 sm:min-w-1/3 min-w-1/2 w-full  hover:bg-gold ",
              {
                "bg-gold ": !currentRefinement.length,
              }
            )}
            onClick={() => {
              refine([]);
              setMainState("All");
            }}
          >
            All
            <span className="ml-1">[{AllTotal}]</span>
          </button>
        </li>

        {values.map((staticItem) => {
          const { isRefined } = items.find(
            (item) => item.label === staticItem.label
          ) || {
            isRefined: false,
          };
          const countArray = items.map((item) => {
            if (item.label === staticItem.label) return item.count;
            return 0;
          });
          const count = countArray.reduce((previousValue, currentValue) => {
            return previousValue + currentValue;
          }, 0);
          return (
            <li className="border text-center" key={staticItem.value}>
              <button
                className={clsx(
                  "button h-[45px] sm:h-[54px] md:min-w-1/6sm:min-w-1/3 min-w-1/2 w-full  hover:bg-gold ",
                  {
                    "bg-gold": isRefined,
                  }
                )}
                onClick={() => {
                  refine([staticItem.value]);
                  setMainState(staticItem.value);
                }}
              >
                {staticItem.label}
                <span className="ml-1">[{count}]</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default connectRefinementList(MainSearchList);
{
  /* <label>
<input
  type="checkbox"
  value={staticItem.value}
  checked={isRefined}
  onChange={(event) => {
    const value = event.currentTarget.value;
    const next = currentRefinement.includes(value)
      ? currentRefinement.filter((current) => current !== value)
      : currentRefinement.concat(value);

    refine(next);
  }}
/>
{staticItem.label}[{count}]
</label> */
}
