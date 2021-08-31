import React, { useEffect } from "react";
import { useMutation, gql } from "@apollo/client";

import { Layout } from "../components";
import { useStaticQuery, graphql } from "gatsby";

import { PasswordPagesLayout } from "../components/layout/PasswordPagesLayout";
import { GET_USER } from "../lib/hooks/useAuth";

const LOG_OUT_QUERY = graphql`
  query {
    wp {
      options {
        specialPagesImages {
          logOutImage {
            ...FullImage
          }
        }
      }
    }
  }
`;

const LOG_OUT = gql`
  mutation logOut {
    logout(input: {}) {
      status
    }
  }
`;

export default function LogOut() {
  const logOutData = useStaticQuery(LOG_OUT_QUERY);
  const { logOutImage: image } = logOutData?.wp?.options?.specialPagesImages;
  const [logOut, { called, loading, error, data }] = useMutation(LOG_OUT, {
    refetchQueries: [{ query: GET_USER }],
  });
  const loggedOut = Boolean(data?.logout?.status);

  useEffect(() => {
    logOut();
  }, [logOut]);

  return (
    <Layout>
      <PasswordPagesLayout title="Log out" image={image}>
        <div className={`text-center text-white sm:text-[36px] font-semibold`}>
          {!called || loading ? (
            <p>Logging out...</p>
          ) : error ? (
            <p>{error.message}</p>
          ) : !loggedOut ? (
            <p>Unable to log out. Please reload the page and try again.</p>
          ) : (
            <p>You have been logged out.</p>
          )}
        </div>
      </PasswordPagesLayout>
    </Layout>
  );
}
