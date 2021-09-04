import useLocalStorage from "./use-local-storage";

export const useBucketList = (item) => {
  const [bucket, setBucket] = useLocalStorage("bucketList", []);

  const isAdded =
    item.__typename === "RoundUp_Roundupdataattributes_links"
      ? bucket.find((i) =>
          i.__typename === "RoundUp_Roundupdataattributes_links"
            ? i.link[0].id === item.link[0].id
            : i.id === item.link[0].id
        )
      : bucket.find((i) => i.id == item.id);

  const addToBl = () => {
    // if (isAdded) {
    //   toast.custom(<CustomToast text="Already in your bucket list" />, {
    //     duration: 3000,
    //     position: 'top-center',
    //   })
    // } else {
    //   setBucket([...bucket, item])
    //   // toast.custom(<CustomToast text="Added to bucket list" />, {
    //   //   duration: 3000,
    //   //   position: 'top-center',
    //   // })
    // }
    setBucket([...bucket, item]);
  };

  const removeFromBl = () => {
    const newBucket =
      item.__typename === "RoundUp_Roundupdataattributes_links"
        ? bucket.filter((i) => {
            return i.__typename === "RoundUp_Roundupdataattributes_links"
              ? i.link[0].id != item.link[0].id
              : i.id != item.link[0].id;
          })
        : bucket.filter((i) => i.id != item.id);

    setBucket(newBucket);
    // toast.custom(<CustomToast text="Removed from bucket list" />, {
    //   duration: 3000,
    //   position: 'top-center',
    // })
  };

  return { addToBl, removeFromBl, isAdded };
};
