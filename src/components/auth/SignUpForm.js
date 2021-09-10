/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import { Input, Label, Button, Typo } from "../ui-components";
import ls from "local-storage";

const REGISTER_USER = gql`
  mutation registerUser(
    $email: String!
    $firstName: String!
    $lastName: String!
  ) {
    registerUser(
      input: {
        username: $email
        email: $email
        firstName: $firstName
        lastName: $lastName
      }
    ) {
      user {
        databaseId
      }
    }
  }
`;

const CREATE_BUCKET_LIST = gql`
  mutation ($input: BlMutationInput!) {
    blMutation(input: $input) {
      bucketListCreated
      clientMutationId
    }
  }
`;

export function SignUpForm({ warning, setTabIndex }) {
  const [variables, setVariables] = useState({});
  const [step, setStep] = useState(1);
  const [register, { data, loading, error }] = useMutation(REGISTER_USER);

  const [blMutation] = useMutation(CREATE_BUCKET_LIST);
  const wasSignUpSuccessful = Boolean(data?.registerUser?.user?.databaseId);

  const linksInput = ls("bucketList")?.map((item) => item.databaseId);

  function handleSubmit(event) {
    event.preventDefault();
    // Create Bucket List for new user containing items present in local storage
    blMutation({
      variables: {
        input: {
          clientMutationId: Date.now().toString(),
          emailInput: variables.email,
          linksInput,
        },
      },
    }).catch((error) => {
      console.error(error);
    });
    register({ variables }).catch((error) => {
      console.error(error);
    });
  }

  if (wasSignUpSuccessful) {
    return (
      <>
        <h3 className={`text-center text-xl font-bold my-3 uppercase`}>
          All Done!
        </h3>
        <p className="mb-3">
          We've set up your account and sent you a confirmation email.
        </p>
        <p>
          Please click on the link in that email to set a password and you're
          good to go...
        </p>
      </>
    );
  }

  return (
    <>
      {step === 1 ? (
        <>
          <Typo
            h1
            as="h2"
            className="text-center text-grey4 !font-normal mb-6 mt-4"
          >
            Create account
          </Typo>
          {warning && (
            <div className="orange-box">
              Please note: if you want us to save your bucket list for next
              time, you need to sign in or create an account.
            </div>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              variables.email && setStep(2);
            }}
          >
            <div>
              <Label htmlFor="sign-up-email">Email</Label>
              <Input
                id="sign-up-email"
                type="email"
                name="email"
                value={variables.email}
                onChange={(e) =>
                  setVariables({ ...variables, email: e.target.value })
                }
                className="h-14"
                autoComplete="username"
                required
              />
            </div>
            <div className="flex justify-center">
              <Button type="submit" className="h-[40px] w-[300px] mt-6">
                Submit
              </Button>
            </div>
          </form>
          <p className={`mt-6 text-lg`}>
            Already have an account?{" "}
            <button
              aria-label="go to signin"
              className={`text-blueLink`}
              onClick={(e) => {
                e.preventDefault();
                setTabIndex(1);
              }}
            >
              Sign in
            </button>
          </p>
        </>
      ) : (
        <>
          <Typo h1 as="h2" className="text-center text-grey4 !font-normal">
            Last step...
          </Typo>
          <form method="post" onSubmit={handleSubmit} className={`mt-4`}>
            <fieldset
              disabled={loading}
              aria-busy={loading}
              className="space-y-6"
            >
              <div>
                <Label htmlFor="sign-up-first-name">First name</Label>
                <Input
                  id="sign-up-first-name"
                  type="text"
                  value={variables.firstName}
                  onChange={(e) =>
                    setVariables({ ...variables, firstName: e.target.value })
                  }
                  name="firstName"
                  className="h-14"
                  autoComplete="given-name"
                  required
                />
                <p className="mt-3 text-lg">
                  Just so we know how to address you….
                </p>
              </div>
              <div>
                <Label htmlFor="sign-up-last-name">
                  Location (e.g. city, town)
                </Label>
                <Input
                  id="sign-up-first-name"
                  type="text"
                  name="lastName"
                  className="h-14"
                  value={variables.lastName}
                  onChange={(e) =>
                    setVariables({ ...variables, lastName: e.target.value })
                  }
                  autoComplete="family-name"
                  required
                />
                <p className="mt-3 text-lg">
                  Just so we can tell you how far things are from you…
                </p>
              </div>

              {error ? (
                <p className="orange-box">
                  An account with that email already exists.
                </p>
              ) : null}
              <div className="flex justify-around mb-5">
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    setStep(1);
                  }}
                >
                  Go Back
                </Button>
                <Button type="submit" disabled={loading} className="h-[40px]">
                  {loading ? "Signing up..." : "Create Account"}
                </Button>
              </div>
            </fieldset>
          </form>
        </>
      )}
    </>
  );
}
