import { connectCurrentRefinements } from "react-instantsearch-dom";
import clsx from "clsx";
import React from "react";
import { Button } from "../ui-components/Button";
const ClearAllFilters = ({ items, refine }) => (
  <Button
    onClick={() => refine(items)}
    disabled={!items.length}
    secondary
    small
  >
    Reset all
  </Button>
);
export default connectCurrentRefinements(ClearAllFilters);
