import { useContext, useEffect } from "react";
import {
  GlobalStateContext,
  GlobalDispatchContext,
} from "../../context/GlobalContextProvider";
import useLocalStorage from "./use-local-storage";
import { useDbBucketList } from "./useDbBucketList";
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

  const isAdded =
    item.__typename === "WpRoundUp_Roundupdataattributes_links"
      ? bucket.find((i) =>
          i.__typename === "WpRoundUp_Roundupdataattributes_links"
            ? i.link[0].id === item.link[0].id
            : i.id === item.link[0].id
        )
      : bucket.find((i) => i.id == item.id);
  const { data, error, loading } = useDbBucketList();
  const bl = data?.bucketLists?.nodes[0];

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
      items: bl?.bucketListElements?.blLinks,
    });
    console.log("items", items, "itemIds", itemIds);
  };

  const removeFromBl = () => {
    const newBucket =
      item.__typename === "WpRoundUp_Roundupdataattributes_links"
        ? bucket.filter((i) => {
            return i.__typename === "WpRoundUp_Roundupdataattributes_links"
              ? i.link[0].id != item.link[0].id
              : i.id != item.link[0].id;
          })
        : bucket.filter((i) => i.id != item.id);

    setBucket(newBucket);
  };

  return { addToBl, removeFromBl, isAdded };
};
