export default function getMainLocations(customDataAttributes) {
  const {
    longitudeOfLocation1,
    latitudeOfLocation1,
    longitudeOfLocation2,
    latitudeOfLocation2,
    longitudeOfLocation3,
    latitudeOfLocation3,
  } = customDataAttributes || {};

  const location1 = { lat: latitudeOfLocation1, lng: longitudeOfLocation1 };
  const location2 = latitudeOfLocation2
    ? { lat: latitudeOfLocation2, lng: longitudeOfLocation2 }
    : null;
  const location3 = latitudeOfLocation3
    ? { lat: latitudeOfLocation3, lng: longitudeOfLocation3 }
    : null;

  const mainLocations = [location1, location2, location3].filter(
    (i) => i != null
  );
  return mainLocations;
}
