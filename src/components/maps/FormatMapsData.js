export default function FormatMapsData(hits) {
  const formatedHits =
    hits
      ?.filter((hit) => {
        const {
          customDataAttributes: { latitudeOfLocation1, longitudeOfLocation1 },
        } = hit || {};
        if (latitudeOfLocation1 && longitudeOfLocation1) {
          return true;
        }
        return false;
      })
      .map((hit) => {
        const {
          title,
          uri,
          id,
          featuredImage,
          nodeType,
          customDataAttributes: { latitudeOfLocation1, longitudeOfLocation1 },
        } = hit || {};

        return {
          position: {
            lat: latitudeOfLocation1,
            lng: longitudeOfLocation1,
          },
          id,
          title,
          nodeType,
          image: featuredImage?.node?.sourceUrl,
          uri: uri,
        };
      }) ?? null;

  const ids = formatedHits.map((o) => JSON.stringify(o.position));
  const filtered = formatedHits.filter(
    ({ position }, index) => !ids.includes(JSON.stringify(position), index + 1)
  );

  return filtered;
}
