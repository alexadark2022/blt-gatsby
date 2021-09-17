import { useEffect } from "react";

import useLocalStorage from "./use-local-storage";
import { useAuth } from "./useAuth";
import { useDbBucketList } from "./useDbBucketList";
import { useUpdateBucketList } from "./useUpdateBucketList";

export const useBucketList = (item) => {
  const [bucket, setBucket] = useLocalStorage("bucketList", []);

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
  }, [bucket]);

  const addToBl = () => {
    setBucket([...bucket, item]);
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
