import React, { useEffect } from "react";

import { Layout } from "../Layout";

import { Seo } from "@gatsbywpthemes/gatsby-plugin-wp-seo";
import { FrontPage } from "../frontPage";
import { window } from "browser-monads";
import { FaqPage } from "../pageLayouts/FaqPage";
import { Newsletter, SidebarSocialShare } from "..";
import PageLayout from "../layout/PageLayout";

const Page = ({ page, ctx, location }) => {
  const url = window.location.href;
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
      {isFrontPage ? (
        <FrontPage
          homeHero={homeHero}
          whatWeOffer={whatWeOffer}
          url={url}
          awards={awards}
        />
      ) : (
        <PageLayout
          title={title}
          sidebar={
            <div className="space-y-base2">
              <Newsletter />
              <SidebarSocialShare url={url} />
            </div>
          }
        >
          {faq && <FaqPage faq={faq} />}
        </PageLayout>
      )}
    </Layout>
  );
};

export default Page;
