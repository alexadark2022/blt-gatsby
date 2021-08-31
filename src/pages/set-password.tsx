import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Layout } from "../components";
import { SetPasswordForm } from "../components/auth";
import { PasswordPagesLayout } from "../components/layout/PasswordPagesLayout";
import { window } from "browser-monads";

const SET_PASS_QUERY = graphql`
  query {
    wp {
      options {
        specialPagesImages {
          setPasswordImage {
            ...FullImage
          }
        }
      }
    }
  }
`;

export default function SetPassword() {
  const data = useStaticQuery(SET_PASS_QUERY);
  const { setPasswordImage: image } = data?.wp?.options?.specialPagesImages;
  const params = new URLSearchParams(window.location.search);
  const resetKey = params.get("key") || "";
  const login = params.get("login") || "";

  return (
    <Layout>
      <PasswordPagesLayout title="Set Password" image={image}>
        <SetPasswordForm resetKey={resetKey} login={login} />
      </PasswordPagesLayout>
    </Layout>
  );
}
