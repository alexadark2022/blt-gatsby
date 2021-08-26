import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Menu, SiteBranding, SlideSidebar } from "baseComponents"
import { Container } from "baseUiComponents"
import Headroom from "react-headroom"

export const Header = () => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      wp {
        generalSettings {
          title
          url
        }
      }
    }
  `)

  const { title } = data.wp.generalSettings

  return (
    <Headroom>
      <header className="py-4 bg-white shadow-md">
        <Container className="flex justify-between">
          <div className="flex items-center">
            <SiteBranding title={title} />
          </div>
          <div className="flex">
            <Menu orientation="H" className="hidden lg:block" />
            <SlideSidebar className="lg:hidden" />
          </div>
        </Container>
      </header>
    </Headroom>
  )
}
