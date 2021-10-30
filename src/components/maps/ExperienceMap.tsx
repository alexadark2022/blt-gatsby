import React, { useContext } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { Modal } from "..";
import {
  GlobalStateContext,
  GlobalDispatchContext,
} from "../../context/GlobalContextProvider";
import MapBox from "./MapBox";

const ExperienceMap = ({ experience = {} }: any) => {
  const { title, customDataAttributes } = experience || {};
  const {
    longitudeOfLocation1,
    latitudeOfLocation1,
    longitudeOfLocation2,
    latitudeOfLocation2,
    longitudeOfLocation3,
    latitudeOfLocation3,
    experiences,
    recommendations,
    whereToStay,
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

  const mainData = {
    mainLocations,
    title,
    image: experience?.featuredImage?.node?.sourceUrl,
    uri: experience?.uri,
  };

  const { isMapOpen } = useContext(GlobalStateContext);
  const dispatch = useContext(GlobalDispatchContext);
  const closeModal = () => dispatch({ type: "SET_MAP_CLOSE" });

  return (
    <Modal isOpen={isMapOpen} closeModal={closeModal}>
      <div
        style={{ height: "90vh" }}
        className="inline-block z-[100] px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle md:w-5/6 sm:p-6"
      >
        <div className="w-full h-full pb-10">
          <MapBox
            mainData={mainData}
            experiences={experiences || null}
            recommendations={recommendations || null}
            whereToStay={whereToStay || null}
          />
        </div>

        <button
          className="absolute text-4xl cursor-pointer top-4 right-4 hover:text-gray-700"
          onClick={closeModal}
        >
          <IoCloseCircle />
        </button>
      </div>
    </Modal>
  );
};

export default ExperienceMap;
