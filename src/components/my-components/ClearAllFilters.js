import { connectCurrentRefinements } from "react-instantsearch-dom";
import React from "react";
import { Button } from "../ui-components/Button";
const ClearAllFilters = ({ items, refine }) => {
  return (
    <Button
      onClick={() => refine(items)}
      disabled={!items.length}
      secondary
      small
    >
      Reset all
    </Button>
  );
};
export default connectCurrentRefinements(ClearAllFilters);
