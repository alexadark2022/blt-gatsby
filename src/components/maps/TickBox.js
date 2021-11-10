import React from "react";

export default function TickBox({ show, name, checked, onChange }) {
  return (
    <>
      {show && (
        <label className="inline-flex items-center mr-3 cursor-pointer">
          <input
            onChange={onChange}
            type="checkbox"
            className="w-5 h-5 form-checkbox text-darkBlue"
            checked={checked}
          />
          <span className="ml-2 text-gray-700">{name}</span>
        </label>
      )}
    </>
  );
}
