import { Dialog, Transition } from "@headlessui/react"
import React, { Fragment } from "react"
import { Button } from "../ui-components"
import { AuthModalTabs } from "./AuthModalTabs"

export const AuthModal = ({ isOpen, setIsOpen, warning }) => {
  const closeModal = () => setIsOpen(false)
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-20 overflow-y-auto "
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-darkBlue opacity-80" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-[500px] overflow-hidden text-left align-middle transition-all transform bg-white relative">
              <AuthModalTabs closeModal={closeModal} warning={warning} />
              <Button
                onClick={closeModal}
                secondary
                small
                className="absolute bottom-2 right-2  h-[40px]"
              >
                Close
              </Button>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
