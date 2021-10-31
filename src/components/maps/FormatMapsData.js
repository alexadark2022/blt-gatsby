export default function FormatMapsData(hits) {
  return (
    hits?.map((hit) => {
      const {
        title,
        uri,
        id,
        featuredImage,
        customDataAttributes: { latitudeOfLocation1, longitudeOfLocation1 },
      } = hit || {};

      return {
        position: {
          lat: latitudeOfLocation1,
          lng: longitudeOfLocation1,
        },
        id,
        title,
        image: featuredImage?.node?.sourceUrl,
        uri: uri,
      };
    }) ?? null
  );
}
