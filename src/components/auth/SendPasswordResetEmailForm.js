/* eslint-disable react/no-unescaped-entities */
import { useMutation, gql } from "@apollo/client";
import { Input, Button } from "../ui-components";

import React, { useState } from "react";
import { AuthModal } from "./AuthModal";

const SEND_PASSWORD_RESET_EMAIL = gql`
  mutation sendPasswordResetEmail($username: String!) {
    sendPasswordResetEmail(input: { username: $username }) {
      user {
        databaseId
      }
    }
  }
`;

export function SendPasswordResetEmailForm() {
  const [sendPasswordResetEmail, { loading, error, data }] = useMutation(
    SEND_PASSWORD_RESET_EMAIL
  );
  const wasEmailSent = Boolean(data?.sendPasswordResetEmail?.user);

  console.log("wasEmailSent", data);
  const [isOpen, setIsOpen] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const { email } = Object.fromEntries(data);
    sendPasswordResetEmail({
      variables: {
        username: email,
      },
    }).catch((error) => {
      console.error(error);
    });
  }

  if (wasEmailSent) {
    return (
      <div className="flex justify-center">
        <p className={`orange-box text-f-20`}>
          Please check your email, a password reset link has been sent to you
          <button
            aria-label="go to signin"
            className={`text-blueLink mt-3 text-center font-bold mx-auto w-full`}
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(true);
            }}
          >
            Sign in
          </button>
        </p>

        <AuthModal isOpen={isOpen} setIsOpen={setIsOpen} warning={false} propsTabIndex={1} />
      </div>
    );
  }

  return (
    <form
      method="post"
      onSubmit={handleSubmit}
      className={`max-w-[600px] mx-auto`}
    >
      <p className={`text-center sm:text-2xl font-bold text-white mb-5`}>
        Enter the email associated with your account and we'll send you a link
        to reset your password
      </p>
      <fieldset disabled={loading} aria-busy={loading}>
        {/* <Label htmlFor="password-reset-email" className={`!text-white`}>
            Email
          </Label> */}
        <Input
          id="password-reset-email"
          type="email"
          name="email"
          aria-label="email"
          autoComplete="email"
          className="h-14"
          required
        />
        {error ? <div className="flex justify-center">
          <p className="error-message">{error.message}</p>
        </div> : null}
        <div className={` flex justify-center mt-10`}>
          <Button type="submit" disabled={loading} className={`h-14 w-[300px]`}>
            {loading ? "Sending..." : "Send password reset email"}
          </Button>
        </div>
      </fieldset>
    </form>
  );
}
