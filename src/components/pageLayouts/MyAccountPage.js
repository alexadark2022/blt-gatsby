import React from "react";
import { Section, Input, Typo, Button } from "../ui-components";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import tw, { styled } from "twin.macro";
import { AuthContent } from "../auth";
import { useAuth } from "../../lib/hooks/useAuth";
import { useMutation, gql } from "@apollo/client";

const UPDATE_USER = gql`
  mutation ($input: UpdateUserInput!) {
    updateUser(input: $input) {
      user {
        email
        id
      }
    }
  }
`;

export const MyAccountPage = () => {
  const [updateUser] = useMutation(UPDATE_USER);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const Label = styled.label(() => [tw`block mb-1 font-bold text-black`]);
  const ErrorMessage = styled.div(() => [
    tw`max-w-md px-5 py-2 my-2 text-center text-red-500 bg-red-100 rounded-md`,
  ]);
  const onSubmit = (data) => {
    const { firstName, location, password, email } = data;
    updateUser({
      variables: {
        input: {
          id: user?.id,
          firstName: firstName.length > 0 ? firstName : null,
          lastName: location.length > 0 ? location : null,
          email: email.length > 0 ? email : null,
          password: password.length > 0 ? password : null,
        },
      },
    });
    console.log(data);
  };
  const { user } = useAuth();
  console.log("user", user);
  return (
    <AuthContent>
      <Section className={clsx("px-10 pt-10 pb-24 ")}>
        <Typo as="h3" h3 className="font-semibold">
          My details
        </Typo>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid-cols-2 gap-16 md:grid">
            <div>
              <Label htmlFor="loaction">First Name</Label>
              <Input
                type="text"
                id="firstName"
                className=""
                {...register("firstName")}
              />
              {/* {errors.firstName && (
                <ErrorMessage>This field is required</ErrorMessage>
              )} */}
            </div>
            <div>
              <Label htmlFor="location">Location(e.g. city, town)</Label>
              <Input type="text" id="location" {...register("location")} />
              {/* {errors.location && (
                <ErrorMessage>This field is required</ErrorMessage>
              )} */}
            </div>
            <div>
              <Label htmlFor="location">Email</Label>
              <Input type="email" id="email" {...register("email")} />
              {/* {errors.location && (
                <ErrorMessage>This field is required</ErrorMessage>
              )} */}
            </div>
            <div>
              <Label htmlFor="location">Password</Label>
              <Input type="password" id="password" {...register("password")} />
              {/* {errors.location && (
                <ErrorMessage>This field is required</ErrorMessage>
              )} */}
            </div>
          </div>
          <div className="flex justify-end">
            <Button secondary onClick={handleSubmit(onSubmit)}>
              Change
            </Button>
          </div>
        </form>
      </Section>
    </AuthContent>
  );
};
