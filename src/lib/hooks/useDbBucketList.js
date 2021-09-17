import React, { useEffect, useContext } from "react";
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../../context/GlobalContextProvider";
import { GET_BUCKET_LIST } from "../queries";
import { useLazyQuery } from "@apollo/client";
import { useAuth } from "./useAuth";
import ls from "local-storage";

export const useDbBucketList = () => {
  const { user, loggedIn } = useAuth();
  const [getBucketList, { called, loading, data, error }] = useLazyQuery(
    GET_BUCKET_LIST,
    {
      variables: { author: user?.databaseId },
    }
  );

  useEffect(() => {
    getBucketList();
  }, []);

  const dispatch = useContext(GlobalDispatchContext);
  const bl = data?.bucketLists?.nodes[0];
  const blId = bl?.databaseId;
  const blItems = bl?.bucketListElements?.blLinks;
  const blItemsIds = blItems?.map((item) => item.databaseId);

  useEffect(() => {
    loggedIn &&
      dispatch({
        type: "SET_BL_ID",
        bucketListId: bl?.databaseId,
      });
    loggedIn &&
      dispatch({
        type: "SET_BL_ITEMS",
        items: bl?.bucketListElements?.blLinks,
      });
  }, [bl?.bucketListElements?.blLinks, bl?.databaseId, dispatch, loggedIn]);

  return {
    data,
    error,
    loading,
    called,
    getBucketList,
    bl,
    blItems,
    blId,
    blItemsIds,
  };
};
