// @ts-nocheck
import styled from "@emotion/styled"
import tw from "twin.macro"

const Button = styled.button(({ secondary, narrow, small, tab }) => [
  tw`flex items-center justify-center px-4 text-center cursor-pointer focus:outline-none`,
  tw`leading-tight tracking-wider uppercase font-semiBold text-grey5 hover:no-underline`,
  tw`transition duration-300`,
  tw`rounded-sm bg-lightBlue hover:bg-veryLightBlue border-3 border-veryLightBlue`,

  narrow && tw`h-10`,

  secondary &&
    tw`h-10 leading-none bg-white border-2 xl:text-f-14 text-f-12 border-lightBlue hover:bg-lightBlue`,

  small && tw`px-2 py-3 text-sm h-7 `,
  tab &&
    tw`p-2 font-semibold leading-tight text-center uppercase bg-white rounded-none text-grey5 text-f-12 md:text-f-14`,
  tab && tw` hover:bg-gold focus:bg-gold hover:no-underline`,
  tab && tw`border border-grey2`,
  tab && tw`flex items-center justify-center mx-1 mb-2`,
])

export { Button }
