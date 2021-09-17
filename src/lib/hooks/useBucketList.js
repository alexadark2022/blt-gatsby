import { useContext, useEffect } from "react";
import {
  GlobalStateContext,
  GlobalDispatchContext,
} from "../../context/GlobalContextProvider";
import useLocalStorage from "./use-local-storage";
import { useAuth } from "./useAuth";
import { useDbBucketList } from "./useDbBucketList";
import { useUpdateBucketList } from "./useUpdateBucketList";

export const useBucketList = (item) => {
  const [bucket, setBucket] = useLocalStorage("bucketList", []);
  console.log(
    "bucket",
    bucket.map((item) => item.databaseId)
  );

  const updateBlMutation = useUpdateBucketList();
  const { loggedIn } = useAuth();

  const isAdded =
    item.__typename === "WpRoundUp_Roundupdataattributes_links"
      ? bucket.find((i) =>
          i.__typename === "WpRoundUp_Roundupdataattributes_links"
            ? i.link[0].id === item.link[0].id
            : i.id === item.link[0].id
        )
      : bucket.find((i) => i.id == item.id);

  const { blId } = useDbBucketList();
  console.log("blId", blId);

  useEffect(() => {
    loggedIn &&
      updateBlMutation({
        variables: {
          input: {
            idInput: blId,
            linksInput: bucket.map((item) => item.databaseId),
          },
        },
      });
    console.log("update db");
  }, [bucket]);

  const addToBl = () => {
    setBucket([...bucket, item]);

    // getBucketList();

    // dispatch({
    //   type: "SET_BL_ITEMS",
    //   items: blItems,
    // });
    // console.log("items", items, "itemIds", itemIds);
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
