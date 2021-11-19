export default function FilterMainData(array, mainData) {
  return array.filter((item) => {
    const lat = item?.customDataAttributes?.latitudeOfLocation1;
    const lng = item?.customDataAttributes?.longitudeOfLocation1;
    const same = mainData.mainLocations.some(
      (loc) => loc.lat === lat && loc.lng === lng
    );
    if (same) return false;
    return true;
  });
}
