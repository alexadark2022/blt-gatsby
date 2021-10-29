import React from "react"
import {
  FaFacebookF as Facebook,
  FaWhatsapp as Whatsapp,
  FaTwitter as Twitter,
  FaEnvelope as Email,
} from "react-icons/fa"
import {
  EmailShareButton,
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
} from "react-share"

import clsx from "clsx"
import tw from "twin.macro"
import styled from "@emotion/styled"
import { Section, Typo } from ".."

const RoundIcon = styled.span(() => [
  tw`w-10 h-10`,
  tw`flex items-center justify-center`,
  tw`bg-lightBlue`,
  tw`rounded-full`,
])

const SocialShare = ({ url, className = null }) => {
  const iconStyle =
    "text-[20px] text-darkBlue hover:text-gold transition duration-300"
  return (
    <div className={clsx("flex justify-center space-x-7", className)}>
      <FacebookShareButton url={url}>
        <RoundIcon>
          <Facebook className={iconStyle} />
        </RoundIcon>
      </FacebookShareButton>
      <TwitterShareButton url={url}>
        <RoundIcon>
          <Twitter className={iconStyle} />
        </RoundIcon>
      </TwitterShareButton>
      <WhatsappShareButton url={url}>
        <RoundIcon>
          <Whatsapp className={iconStyle} />
        </RoundIcon>
      </WhatsappShareButton>
      <EmailShareButton url={url}>
        <RoundIcon>
          <Email className={iconStyle} />
        </RoundIcon>
      </EmailShareButton>
    </div>
  )
}

const SidebarSocialShare = ({ url }) => {
  return (
    <Section
      as="div"
      className="fixed z-40 bottom-0 w-full px-3 pt-3 pb-5 -ml-5 space-y-3 md:static md:-ml-0"
    >
      <Typo as="h3" className="hidden text-center md:block">
        Share this page
      </Typo>
      <SocialShare url={url} />
    </Section>
  )
}

export { SocialShare, SidebarSocialShare }
