import React, { useEffect, ReactNode } from "react"
import { navigate } from "gatsby"
import { useAuth } from "../../lib/hooks/useAuth"

export function UnAuthContent({ children }: { children: ReactNode }) {
  const { loggedIn, loading } = useAuth()

  // Navigate authenticated users to Home page.
  useEffect(() => {
    if (!loading && loggedIn) {
      navigate("/")
    }
  }, [loggedIn, loading, navigate])

  if (!loggedIn) {
    return <>{children}</>
  }

  return <p>Loading...</p>
}
