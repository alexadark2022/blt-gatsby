import * as React from "react"
import { useEffect, ReactNode, useState } from "react"
import { navigate } from "gatsby"
import { useAuth } from "../../lib/hooks/useAuth"
import { AuthModal } from "./AuthModal"

export function AuthContent({ children }: { children: ReactNode }) {
  const { loggedIn, loading } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  // Navigate unauthenticated users to Home page.
  useEffect(() => {
    if (!loading && !loggedIn) {
      navigate("/")
      setIsOpen(true)
    }
  }, [loggedIn, loading, navigate])

  if (loggedIn) {
    return <>{children}</>
  }

  return (
    <>
      <p>Loading...</p>
      <AuthModal isOpen={isOpen} setIsOpen={setIsOpen} warning={false} />
    </>
  )
}
