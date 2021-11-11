import React, { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { FaAngleDown } from "react-icons/fa";
import clsx from "clsx";

export const Select = ({ options, defaultValue, width, ...props }) => {
  return (
    <div className="z-10">
      <Listbox {...props} defaultValue={defaultValue}>
        {({ open }) => (
          <>
            <div className="relative mt-1">
              <Listbox.Button
                // className="relative w-[200px] h-[45px] cursor-default "
                className={clsx(
                  `relative w-[200px] h-[45px] cursor-default`,
                  "text-left px-4",
                  "border-2 border-grey2 bg-white focus:outline-none"
                )}
              >
                <span className="block truncate">{props.value}</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <FaAngleDown
                    className="w-5 h-5 text-lightBlue"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options
                  static
                  className={clsx(
                    "absolute w-[200px]",

                    "border-2 border-grey2 border-t-0 bg-white",

                    "text-base text-left"
                  )}
                >
                  {options.map((option, i) => (
                    <Listbox.Option
                      key={i}
                      className={({ active, selected }) =>
                        `${active || selected ? "bg-veryLightGold" : "bg-white"}
                          cursor-default select-none relative py-3  border-b border-grey2 last:border-none px-4`
                      }
                      value={option}
                    >
                      <span className={` block  `}>{option}</span>
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
};
