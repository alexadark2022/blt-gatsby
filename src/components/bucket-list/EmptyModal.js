import { Dialog } from "@headlessui/react";
import React from "react";
import { Button, Modal } from "../ui-components";

export const EmptyModal = ({ isOpen, setIsOpen, action, title, text }) => {
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="inline-block w-full max-w-md p-8 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
        <Dialog.Title
          as="h3"
          className="text-lg font-bold leading-6 text-center"
        >
          {title}
        </Dialog.Title>
        <div className="mt-2">
          <p>Are you sure? this cannot be undone.</p>
        </div>

        <div className="flex mt-4 space-x-3">
          <Button className="w-[120px]" onClick={action}>
            Yes
          </Button>
          <Button className="w-[120px]" onClick={closeModal}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};
