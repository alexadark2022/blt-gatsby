import React from "react"
import clsx from "clsx"

const Checkbox = ({
  id,
  label,
  className,
  large,
  homeNl,
  disabled = false,
  ...props
}) => (
  <div className={`flex items-center ${className}`}>
    <div className="w-7">
      <input
        type={"checkbox"}
        id={id + label}
        name={id}
        disabled={disabled}
        {...(props.checked ? `checked` : null)}
        className={clsx(
          "border-2 rounded-none text-gold form-checkbox border-grey2",
          { "border-grey1": disabled },

          { "w-5 h-5": !large },
          { "w-7 h-7": large }
        )}
        {...props}
      />
    </div>

    <label
      htmlFor={id}
      className={`pl-4 leading-tight ${
        disabled ? "text-grey2" : "text-grey4"
      } ${homeNl && "lg:text-[20px]"}`}
    >
      {label}
    </label>
  </div>
)

export { Checkbox }
