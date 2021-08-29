import React, { useEffect } from "react";

import { Layout } from "../Layout";

import { Seo } from "@gatsbywpthemes/gatsby-plugin-wp-seo";
import { FrontPage } from "../frontPage";

const Page = ({ page, ctx }) => {
  console.log("page", page);
  const {
    title,
    isFrontPage,
    content,
    slug,
    aboutPageContent,
    awards,
    contactUs,
    faq,
    homeHero,
    whatWeOffer,
    uri,
  } = page;

  console.log("ctx", ctx);

  const featuredImage =
    page.featuredImage?.node.localFile.childImageSharp.original;
  return (
    <Layout page={page} type="page">
      <Seo
        isFrontPage={isFrontPage}
        title={title}
        uri={uri}
        yoastSeo={ctx.yoastSeo}
        seo={ctx.seo}
        featuredImage={
          featuredImage && {
            src: featuredImage.src,
            width: featuredImage.width,
            height: featuredImage.height,
          }
        }
      />
      {isFrontPage && <FrontPage homeHero={homeHero} />}
    </Layout>
  );
};

export default Page;
