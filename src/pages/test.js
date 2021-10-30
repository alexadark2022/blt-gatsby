import React from "react";
import { useStaticQuery, graphql } from "gatsby";

const GET_ALL_EXP = graphql`
  {
    allWpExperience {
      nodes {
        id
        title
        customDataAttributes: experienceDataAttr {
          generic: isGenericRecommendation
          affiliate: isAffiliateTour
        }
      }
    }
  }
`;
export default function TestPage() {
  const {
    allWpExperience: { nodes: expData },
  } = useStaticQuery(GET_ALL_EXP);
  console.log(expData);
  return (
    <div>
      <p>Test Page</p>
      <div className="grid grid-cols-6 gap-6">
        {expData
          .filter(({ customDataAttributes }) => {
            const isGeneric = customDataAttributes?.generic === "yes";
            const isAffiliate = customDataAttributes?.affiliate === "yes";
            if (isGeneric || isAffiliate) {
              return false;
            }
            return true;
          })
          .map(({ id, title, customDataAttributes }) => (
            <div key={id} className="item border-2 p-4">
              <p>{title}</p>
              <div className="flex space-x-2 text-white mt-2">
                <div
                  className={`${
                    customDataAttributes.affiliate === "yes"
                      ? "bg-green-600 "
                      : "bg-gray-700"
                  } px-4 py-1`}
                >
                  {customDataAttributes.affiliate ?? "null or empty"}
                </div>
                <div
                  className={`${
                    customDataAttributes.generic === "yes"
                      ? "bg-green-600 "
                      : "bg-gray-700"
                  } px-4 py-1`}
                >
                  {customDataAttributes.generic ?? "null or empty"}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
