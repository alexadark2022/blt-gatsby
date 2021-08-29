import React from "react";
import Collapse from "@kunukn/react-collapse";
import { useMediaQuery } from "../../lib/hooks";

export const WithCollapse = ({ children, isOpen, ...props }) => {
  const isLarge = useMediaQuery("(min-width:1024px)");
  return (
    <>
      {isLarge ? (
        <>{children}</>
      ) : (
        <Collapse isOpen={isOpen} {...props}>
          <>{children}</>
        </Collapse>
      )}
    </>
  );
};
