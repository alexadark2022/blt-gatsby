import React, { useEffect } from "react";
import { uniqBy } from "lodash";
import useLocalStorage from "./use-local-storage";

export const useRecentlyViewed = (data) => {
  const [bucket, setBucket] = useLocalStorage("recentlyViewed", []);

  useEffect(() => {
    setBucket(uniqBy([...bucket, data], "title"))?.slice(0, 10);
  }, []);
};
