import React from "react";

export const FooterColumn = ({ title, children, className }, props) => {
  return (
    <div className={`text-white ${className}`} {...props}>
      <h3 className="text-white  block uppercase text-f-18 font-semibold tracking-[2px] leading-none pb-3  border-b border-gold mb-7 ">
        {title}
      </h3>
      {children}
    </div>
  );
};
