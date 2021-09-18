import * as React from "react";
import { useEffect, ReactNode, useState } from "react";
import { navigate } from "gatsby";
import { useAuth } from "../../lib/hooks/useAuth";
import { AuthModal } from "./AuthModal";
import Loader from "react-spinners/BeatLoader";

export function AuthContent({ children }: { children: ReactNode }) {
  const { loggedIn, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  // Navigate unauthenticated users to Home page.
  useEffect(() => {
    if (!loading && !loggedIn) {
      navigate("/");
      setIsOpen(true);
    }
  }, [loggedIn, loading, navigate]);

  if (loggedIn) {
    return <>{children}</>;
  }

  return (
    <>
      <div className="flex justify-center py-20">
        <Loader size={20} color="#d3b27d" />
      </div>
      <AuthModal isOpen={isOpen} setIsOpen={setIsOpen} warning={false} />
    </>
  );
}
