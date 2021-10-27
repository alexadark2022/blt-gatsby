import React, { useState } from "react"
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs"
import { Dialog, Transition } from "@headlessui/react"
import clsx from "clsx"
import { SignUpForm, UnAuthContent, LogInForm } from "."
import { Typo } from ".."

export const AuthModalTabs = ({ warning, closeModal, propsTabIndex }) => {
  const [tabIndex, setTabIndex] = useState(0)

  console.log(tabIndex)
  const handleTabsChange = (index) => {
    setTabIndex(propsTabIndex || index)
  }

  const tabStyles = `w-1/2 text-center h-[66px] text-[20px] font-medium px-5 uppercase border-b border-grey2 text-grey5 `

  const tabPanelStyles = `px-5 sm:px-11 pt-3 pb-16`
  return (
    <Tabs index={tabIndex} onChange={handleTabsChange} className="">
      <TabList
        className="flex bg-gold"
        css={{
          '[aria-selected="true"]': {
            background: "#fff",
          },
        }}
      >
        <Tab className={clsx(tabStyles)}>
          <Dialog.Title as="h3">Create Account</Dialog.Title>
        </Tab>
        <Tab className={clsx(tabStyles)}>
          <Dialog.Title as="h3">Sign in</Dialog.Title>
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel className={clsx(tabPanelStyles)}>
          <SignUpForm warning={warning} setTabIndex={setTabIndex} />
        </TabPanel>
        <TabPanel className={clsx(tabPanelStyles)}>
          <Typo h1 as="h2" className="text-center text-grey4 !font-normal">
            Sign in
          </Typo>
          <UnAuthContent>
            <LogInForm setTabIndex={setTabIndex} closeModal={closeModal} />
          </UnAuthContent>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
