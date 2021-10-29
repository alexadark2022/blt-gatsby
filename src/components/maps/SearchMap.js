import React from "react";
import { IoCloseCircle } from "react-icons/io5";
import { connectInfiniteHits } from "react-instantsearch-dom";
import { Modal } from "..";

const SearchMap = ({ isMapOpen, closeModal, hits }) => {
  const allMapPoints =
    hits?.map((hit) => {
      const {
        title,
        uri,
        featuredImage,
        customDataAttributes: { latitudeOfLocation1, longitudeOfLocation1 },
      } = hit || {};

      return {
        latitude: latitudeOfLocation1,
        longitude: longitudeOfLocation1,
        title,
        image: featuredImage?.node?.sourceUrl,
        uri: uri,
      };
    }) ?? null;
  console.log(allMapPoints);
  return (
    <Modal isOpen={isMapOpen} closeModal={closeModal}>
      <div
        style={{ height: "90vh" }}
        className="inline-block z-[100] px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle md:w-5/6 sm:p-6"
      >
        <div className="w-full h-full pb-10">
          {/* <MapBox
            mainData={mainData}
            experiences={experiences || null}
            recommendations={recommendations || null}
            whereToStay={whereToStay || null}
          /> */}
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

export default connectInfiniteHits(SearchMap);
