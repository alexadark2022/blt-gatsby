import { useContext, useEffect } from "react";
import {
  GlobalStateContext,
  GlobalDispatchContext,
} from "../../context/GlobalContextProvider";
import useLocalStorage from "./use-local-storage";
import { useUpdateBucketList } from "./useUpdateBucketList";

export const useBucketList = (item) => {
  const [bucket, setBucket] = useLocalStorage("bucketList", []);

  const updateBlMutation = useUpdateBucketList();
  let { bucketListId, items } = useContext(GlobalStateContext);
  const dispatch = useContext(GlobalDispatchContext);

  items = items ? items : [];
  const itemIds = items.map((item) =>
    typeof item === "object" ? item.databaseId : item
  );

  const isAdded = bucket.find((i) => i.id == item.id);

  const addToBl = () => {
    setBucket([...bucket, item]);
    updateBlMutation({
      variables: {
        input: {
          idInput: bucketListId,
          linksInput: [...itemIds, item.databaseId],
        },
      },
    });

    dispatch({
      type: "SET_BL_ITEMS",
      items: [...items, item],
    });
    console.log("items", items, "itemIds", itemIds);
  };

  const removeFromBl = () => {
    const newBucket = bucket.filter((i) => i.id != item.id);

    setBucket(newBucket);
  };

  return { addToBl, removeFromBl, isAdded };
};
