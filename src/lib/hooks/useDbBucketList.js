import React, { useEffect, useContext } from "react";
import { GlobalDispatchContext, GlobalStateContext } from "../../context/GlobalContextProvider";
import { GET_BUCKET_LIST } from "../queries";
import { useQuery } from "@apollo/client";
import { useAuth } from "./useAuth";

export const useDbBucketList = () => {
    const { user, loggedIn } = useAuth();
    const { data, loading, error } = useQuery(GET_BUCKET_LIST, {
      variables: { title: user?.email },
    });

    const dispatch = useContext(GlobalDispatchContext);
    const bl = data?.bucketLists?.nodes[0];

    useEffect(() => {
      user &&
        dispatch({
          type: "SET_BL_ID",
          bucketListId: bl?.databaseId,
        });
      user &&
        dispatch({
          type: "SET_BL_ITEMS",
          items: bl?.bucketListElements?.blLinks,
        });
    }, []);

    console.log("state", useContext(GlobalStateContext), "user", useAuth());
}