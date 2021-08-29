import React from "react";
import { HomeHero } from "./HomeHero";

export const FrontPage = ({ homeHero }) => {
  return (
    <>
      <HomeHero homeHero={homeHero} />
    </>
  );
};
