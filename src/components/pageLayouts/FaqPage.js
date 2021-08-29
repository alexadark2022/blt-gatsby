import React from "react";
import { CollapseSection } from "../ui-components";

export const FaqPage = ({ faq, ...props }) => {
  return (
    <>
      {faq.faq.map((item, i) => {
        const { title, content } = item;
        return (
          <CollapseSection key={i} title={title} {...props}>
            <div
              dangerouslySetInnerHTML={{ __html: content }}
              className="prose max-w-none"
            />
          </CollapseSection>
        );
      })}
    </>
  );
};
