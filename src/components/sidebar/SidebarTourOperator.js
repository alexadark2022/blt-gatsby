import React from "react";
import clsx from "clsx";
import { Section, Typo, Button, Image, Underline } from "..";
import { useMediaQuery } from "../../lib/hooks";

const SidebarTourOperator = ({
  tourOperator,
  description,
  className,
  ...props
}) => {
  const {
    title,
    featuredImage,
    commonDataAttributes,
    tourOperatorDataAttributes,
  } = tourOperator || {};

  const isLarge = useMediaQuery("(min-width: 1024px)");

  const { phone, website } = tourOperatorDataAttributes || {};
  //TODO fix image size
  return (
    <Section className={clsx("p-5", className)} {...props}>
      <Typo as="h3" className={clsx("text-center ")}>
        Ask the experts
      </Typo>
      <Underline />
      <div className="space-y-5">
        <Typo as="h4" h4 className="text-center">
          {title}
        </Typo>
        <div className="flex ">
          <Image
            img={featuredImage?.node.localFile}
            width={isLarge ? 276 : 1024}
            height={isLarge ? 173 : 638}
            objectFit="cover"
            objectPosition="center"
          />
        </div>
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{
            __html: description
              ? description
              : commonDataAttributes?.standfirst,
          }}
        />
        {phone && (
          <a href={`tel:${phone}`} className="text-center">
            {phone}
          </a>
        )}
        <div className="flex justify-center">
          <Button
            as="a"
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            secondary
          >
            See Website
          </Button>
        </div>
      </div>
    </Section>
  );
};

export default SidebarTourOperator;
