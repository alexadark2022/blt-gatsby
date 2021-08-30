import React from "react";
import { StaticImage } from "gatsby-plugin-image";

export const Underline = ({ className = "", mb = "mb-4", ...props }) => {
  return (
    <div className={`flex justify-center mt-3 ${mb} ${className}`} {...props}>
      <StaticImage
        src="../../images/underline.svg"
        width={111}
        height={8}
        loading="eager"
        alt="underline"
      />
    </div>
  );
};
