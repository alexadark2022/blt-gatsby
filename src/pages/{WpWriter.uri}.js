import React from "react";
import { graphql } from "gatsby";
import { Image } from "../components/images";

import {
  FaFacebookSquare as Fb,
  FaInstagram as Insta,
  FaMapMarkerAlt as Marker,
  FaTwitter as Twitter,
  FaWikipediaW as Wiki,
  FaLinkedin as Linkedin,
  FaCheck as Check,
} from "react-icons/fa";
import { IoGlobeOutline as Website } from "react-icons/io5";
import {
  CollapseSection,
  Layout,
  Section,
  SidebarSocialShare,
  SocialShare,
  Typo,
} from "../components";
import PageLayout from "../components/layout/PageLayout";
import { Newsletter } from "../components/Newsletter";
import { window } from "browser-monads";
import SidebarTourOperator from "../components/sidebar/SidebarTourOperator";
import { About } from "../components/layout/About";
import { CollapseListings } from "../components/layout/CollapseListings";
import { IntroText } from "../components/layout/IntroText";
import { CollapseCards } from "../components/layout/CollapseCards";
import { useRecentlyViewed } from "../lib/hooks/useRecentlyViewed";
import clsx from "clsx";
import { CardsGrid } from "../components/layout/CardsGrid";
import { isEmpty } from "lodash";
import { TitleContent } from "../components/layout/TitleContent";

const WithLink = ({ link, children }) => {
  return (
    <>
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      ) : (
        children
      )}
    </>
  );
};

const Social = ({ value, icon, link }) => {
  if (!value) {
    return null;
  }

  return (
    <div className="space-y-7">
      <div className="flex items-center space-x-4">
        {icon}
        <WithLink link={link}>
          <div className="text-f-18">{value}</div>
        </WithLink>
      </div>
    </div>
  );
};

const CheckList = ({ array, title, value }) => {
  if (!array) {
    return null;
  }

  return (
    <div className="mb-8">
      <Typo as="h3" h3 className={`my-5`}>
        {title}
      </Typo>
      {array.map((item) => {
        return (
          <div className="flex items-center mb-5 space-x-7" key={item[value]}>
            <div>
              <Check className="text-[20px] text-gold" />
            </div>
            <WithLink link={item.url}>
              <div className="text-f-18">{item[value]}</div>
            </WithLink>
          </div>
        );
      })}
    </div>
  );
};

const DestinationPage = ({ data }) => {
  const { wpWriter: writer } = data || {};

  const { title, featuredImage, customDataAttributes } = writer || {};
  const {
    about,
    awards,
    background,
    guideBooks,
    location,
    onTheBucketList,
    specialistSubjects,
    instagram,
    twitter,
    website,
    wikipedia,
    facebook,
    linkedin,
  } = customDataAttributes || {};

  const iconStyle = "text-[30px] text-gold";
  return (
    <Layout page="destination">
      <PageLayout
        title={title}
        smallMargin
        intro="Expert travel writer:"
        sidebar={
          <>
            <Newsletter />
          </>
        }
      >
        <Section className="px-6 pb-10 pt-7 md:grid md:grid-cols-12 md:gap-8">
          <div className="col-span-7">
            <TitleContent title="About" content={about} className="mt-0" />

            <CheckList
              array={specialistSubjects}
              title="Specialist Subject"
              value="subject"
            />
            <TitleContent title="Background" content={background} />
            <CheckList array={guideBooks} title="Guide books" value="title" />
            <CheckList array={awards} title="Awards" value="title" />
            <TitleContent
              title="On the bucket list"
              content={onTheBucketList}
            />
          </div>
          <div className="col-span-5">
            {featuredImage && (
              <div className="flex mb-5">
                <Image
                  img={featuredImage?.node.localFile}
                  alt={`${title} photo`}
                  // width={414}
                  // height={276}
                  // objectFit="cover"
                  // objectPosition="center"
                />
              </div>
            )}
            <div className="space-y-7">
              <Social
                value={location}
                icon={<Marker className={iconStyle} />}
              />

              <Social
                value={instagram}
                link={`https://www.instagram.com/${instagram}`}
                icon={<Insta className={iconStyle} />}
              />

              <Social
                value={facebook}
                link={`https://www.facebook.com/${facebook}`}
                icon={<Fb className={iconStyle} />}
              />
              <Social
                value={twitter}
                link={`https://twitter.com/${twitter}`}
                icon={<Twitter className={iconStyle} />}
              />
              <Social
                value={website}
                link={website}
                icon={<Website className={iconStyle} />}
              />
              <Social
                value={wikipedia}
                link={`https://en.wikipedia.org/wiki/${wikipedia}`}
                icon={<Wiki className={iconStyle} />}
              />
              <Social
                value={linkedin}
                link={`https://www.linkedin.com/in/${linkedin}`}
                icon={<Linkedin className={iconStyle} />}
              />
            </div>
          </div>
        </Section>
      </PageLayout>
    </Layout>
  );
};

export default DestinationPage;

export const pageQuery = graphql`
  query ($uri: String!) {
    wpWriter(uri: { eq: $uri }) {
      ...WriterPage
    }
  }
`;
