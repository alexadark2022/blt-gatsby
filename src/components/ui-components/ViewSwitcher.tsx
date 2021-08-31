import React, { useState } from "react";

import { CgMenuGridR as Grid } from "react-icons/cg";
import { FaBars as List, FaMapMarkerAlt as Map } from "react-icons/fa";
import clsx from "clsx";
import tw from "twin.macro";
import styled from "@emotion/styled";
import { window } from "browser-monads";

const WiewButton = styled.button(() => [
  tw` focus:outline-none focus:ring-0`,
  tw`transition duration-300`,
  tw`flex items-center justify-center`,
  tw`border border-grey2`,
  tw`w-10 h-10`,
]);

export const ViewSwitcher = ({ className, setView, ...props }: any) => {
  const path = window.location.pathname;

  const isClickable = !path.includes("itinerar") && !path.includes("round-up");

  return (
    <div className={clsx("flex space-x-3", className)} {...props}>
      <div>
        <WiewButton
          onClick={() => setView("grid")}
          className="hover:bg-gold focus:bg-gold"
        >
          <Grid className="text-[28px]" />
        </WiewButton>
        <div className="text-[9px] text-center mt-1 font-medium">Grid</div>
      </div>

      <div className="hidden md:block">
        <WiewButton
          onClick={() => setView("list")}
          className="hover:bg-gold focus:bg-gold"
        >
          <List className="text-[20px]" />
        </WiewButton>
        <div className="text-[9px] text-center mt-1 font-medium">List</div>
      </div>
      <div>
        <WiewButton
          onClick={() => (isClickable ? setView("map") : null)}
          className={clsx({
            "cursor-default ": !isClickable,
            "hover:bg-gold focus:bg-gold": isClickable,
          })}
        >
          <Map className={`text-[20px]  ${!isClickable && "text-grey2"}`} />
        </WiewButton>
        <div className="text-[9px] text-center mt-1 font-medium">Map</div>
      </div>
    </div>
  );
};
