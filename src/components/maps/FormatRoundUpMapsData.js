export default function FormatRoundUpMapsData(hits) {
  const {
    customDataAttributes: { links },
  } = hits || {};

  return (
    links.map((item) => {
      const { link } = item || {};
      const info = link[0];
      const {
        title,
        uri,
        id,
        featuredImage,
        customDataAttributes: { latitudeOfLocation1, longitudeOfLocation1 },
      } = info || {};
      if (title && latitudeOfLocation1) {
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
      }
    }) ?? null
  ).filter((hit) => {
    const {
      position: { lat, lng },
    } = hit || {};
    if (lat && lng) {
      return true;
    }
    return false;
  });
}
