import React from "react";

import { Layout } from "../Layout";

import { Seo } from "@gatsbywpthemes/gatsby-plugin-wp-seo";
import { FrontPage } from "../frontPage";
import { window } from "browser-monads";
import { FaqPage, AboutPage, ContactPage, MyAccountPage } from "../pageLayouts";
import { Newsletter } from "../Newsletter";
import { Section, SidebarSocialShare } from "..";
import PageLayout from "../layout/PageLayout";

const Page = ({ page, ctx }) => {
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

  const pageTitle = slug === "faq" ? "Frequently asked question" : title;

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
          title={pageTitle}
          sidebar={
            <div className="space-y-base2">
              <Newsletter />
              <SidebarSocialShare url={url} />
            </div>
          }
        >
          {slug.includes("faq") && <FaqPage faq={faq} />}
          {slug.includes("about") && (
            <AboutPage aboutPageContent={aboutPageContent} />
          )}
          {slug.includes("contact") && (
            <ContactPage intro={contactUs?.contactIntro} />
          )}
          {slug?.includes("account") && <MyAccountPage />}
          {content && (
            <Section
              dangerouslySetInnerHTML={{ __html: content }}
              className="mt-5 prose max-w-none p-base2 mb-base2"
            />
          )}
        </PageLayout>
      )}
    </Layout>
  );
};

export default Page;
