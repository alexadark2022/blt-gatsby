import React from "react";
import { NewsletterHome } from "../Newsletter";
import { Awards } from "./Awards";
import { HomeHero } from "./HomeHero";
import { WhatWeOffer } from "./WhatWeOffer";
// import { useAuth } from "../../lib/hooks/useAuth";
// import { useQuery } from "@apollo/client";
// import { GET_BUCKET_LIST } from "../../lib/queries";
// import {
//   GlobalDispatchContext,
//   GlobalStateContext,
// } from "../../context/GlobalContextProvider";

export const FrontPage = ({ homeHero, whatWeOffer, url, awards }) => {
  // const { user } = useAuth();
  // const { data, loading, error } = useQuery(GET_BUCKET_LIST, {
  //   variables: { title: user?.email },
  // });

  // const dispatch = useContext(GlobalDispatchContext);
  // const bl = data?.bucketLists?.nodes[0];

  // useEffect(() => {
  //   user &&
  //     dispatch({
  //       type: "SET_BL_ID",
  //       bucketListId: bl?.databaseId,
  //     });
  //   user &&
  //     dispatch({
  //       type: "SET_BL_ITEMS",
  //       items: bl?.bucketListElements?.blLinks,
  //     });
  // }, [user]);

  // console.log("state", useContext(GlobalStateContext));

  return (
    <>
      <HomeHero homeHero={homeHero} />
      <WhatWeOffer whatWeOffer={whatWeOffer} url={url} />
      {awards.items && <Awards awards={awards.items} />}
      <NewsletterHome className="my-base2" />
    </>
  );
};
