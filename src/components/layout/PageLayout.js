import React from "react";
import { ContentLayout } from "./ContentLayout";
import { Button, Tabs } from "../ui-components";
import { Gallery } from "../ui-components/Gallery";
import { Title } from "./Title";

const PageLayout = ({
  children,
  title,
  stars,
  intro,
  sidebar,
  tabs,
  images,
  smallMargin,
  isFilters,
  openFilters,
  setOpenFilters,
  item,
  bl,
  handleEmpty,
  notEmpty,
  mapOpen,
}) => {
  return (
    <>
      <Title
        title={title}
        stars={stars}
        intro={intro}
        bl={bl}
        item={item}
        handleEmpty={handleEmpty}
        notEmpty={notEmpty}
      />
      {isFilters && (
        <div className="flex justify-center px-5 ">
          <Button
            small
            className={`w-[125px] lg:!hidden ${openFilters && "!hidden"}`}
            onClick={(e) => {
              e.preventDefault();
              setOpenFilters(true);
            }}
          >
            Filters
          </Button>
        </div>
      )}
      <ContentLayout
        sidebar={sidebar}
        smallMargin={smallMargin}
        isFilters={isFilters}
      >
        {tabs && <Tabs mapOpen={mapOpen} tabs={tabs} className="mb-4" />}
        {images && <Gallery images={images} />}
        {children}
      </ContentLayout>
    </>
  );
};

export default PageLayout;
