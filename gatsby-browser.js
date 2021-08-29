import * as React from "react"
import "./src/styles/tailwind.css"
import { AuthProvider } from "./src/lib/hooks/useAuth"

export const wrapRootElement = ({ element }) => (
  <AuthProvider>{element}</AuthProvider>
)
