import React, { useEffect, useContext } from "react";
import { useMutation, gql } from "@apollo/client";

import { Layout } from "../components";
import { useStaticQuery, graphql } from "gatsby";

import { PasswordPagesLayout } from "../components/layout/PasswordPagesLayout";
import { GET_USER } from "../lib/hooks/useAuth";
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../context/GlobalContextProvider";

const LOG_OUT_QUERY = graphql`
  query {
    wp {
      options {
        specialPagesImages {
          logoutImage {
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
  const logoutData = useStaticQuery(LOG_OUT_QUERY);
  const { logoutImage: image } = logoutData?.wp?.options?.specialPagesImages;
  const [logOut, { called, loading, error, data }] = useMutation(LOG_OUT, {
    refetchQueries: [{ query: GET_USER }],
  });
  const loggedOut = Boolean(data?.logout?.status);
  const dispatch = useContext(GlobalDispatchContext);

  useEffect(() => {
    logOut();
    dispatch({
      type: "SET_BL_ID",
      bucketListId: undefined,
    });
    dispatch({
      type: "SET_BL_ITEMS",
      items: [],
    });
    console.log("flushed bl context");

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
