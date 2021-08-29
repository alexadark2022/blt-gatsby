import { SendPasswordResetEmailForm, UnAuthContent } from "../components/auth";
import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { PasswordPagesLayout } from "../components/layout/PasswordPagesLayout";
import { Layout } from "../components";

const LOST_PASS_QUERY = graphql`
  query {
    wp {
      options {
        specialPagesImages {
          lostPasswordImage {
            ...FullImage
          }
        }
      }
    }
  }
`;

export default function ForgotPassword() {
  const data = useStaticQuery(LOST_PASS_QUERY);
  const { lostPasswordImage: image } = data?.wp?.options?.specialPagesImages;
  return (
    <Layout>
      <PasswordPagesLayout title="Forgot your password?" image={image}>
        <UnAuthContent>
          <SendPasswordResetEmailForm />
        </UnAuthContent>
      </PasswordPagesLayout>
    </Layout>
  );
}
