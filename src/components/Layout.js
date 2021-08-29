import React from "react";
import { HelmetForFavicon } from "./HelmetForFavicon";
import clsx from "clsx";
import { Header } from "./header";
import { Footer } from "./footer";

export const Layout = ({ children, page, type = "page", ...props }) => {
  const layoutClass = page !== undefined ? (page.slug ? page.slug : page) : "";
  const pageTemplate = page?.headlesswp?.pageTemplate;
  console.log("page", page, pageTemplate);

  const fullWidthClass = pageTemplate === "full width" ? "fullWidth" : "";
  return (
    <>
      <HelmetForFavicon />

      <div
        className={clsx(
          "flex min-h-full flex-col",
          `${layoutClass}-${type}`,
          fullWidthClass
        )}
        css={{
          "&.fullWidth": {
            ".mainContainer": {
              maxWidth: `100%`,
              form: {
                marginBottom: 10,
              },
              padding: 0,
            },
          },
        }}
        {...props}
      >
        <Header />

        <main
          className="flex-1 py-16"
          css={{
            ".fullWidth &": {
              paddingTop: 0,
              paddingBottom: 0,
            },
          }}
        >
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};
