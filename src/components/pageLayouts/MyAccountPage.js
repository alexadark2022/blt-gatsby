import React from "react";
import { Section, Input, Typo, Button } from "../ui-components";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import tw, { styled } from "twin.macro";
import { AuthContent } from "../auth";
import { useAuth } from "../../lib/hooks/useAuth";
import { useMutation, gql } from "@apollo/client";
import "react-tippy/dist/tippy.css";
import { Tooltip } from "react-tippy";
import { Link, navigate } from "gatsby";
import { useDbBucketList } from "../../lib/hooks/useDbBucketList";

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

const DELETE_USER = gql`
  mutation ($input: DeleteUserInput!) {
    deleteUser(input: $input) {
      deletedId
    }
  }
`;

const DELETE_BUCKET_LIST = gql`
  mutation ($input: DeleteBucketListInput!) {
    deleteBucketList(input: $input) {
      deletedId
    }
  }
`;

export const MyAccountPage = () => {
  const [updateUser] = useMutation(UPDATE_USER);
  const [deleteUser] = useMutation(DELETE_USER);
  const [deleteBucketList] = useMutation(DELETE_BUCKET_LIST);
  const { bl } = useDbBucketList();

  const handleDeleteUser = () => {
    deleteBucketList({
      variables: {
        input: {
          id: bl?.id,
        },
      },
    });
    deleteUser({
      variables: {
        input: {
          id: user?.id,
        },
      },
    });
    navigate("/log-out");
  };
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
  const questionMarkStyles =
    "flex items-center justify-center w-5 h-5 border border-gray-500 rounded-full bg-lightBlue text-black text-sm";
  return (
    <AuthContent>
      <Section className={clsx("px-10 pt-10 pb-24 ")}>
        <Typo as="h3" h3 className="mb-8 font-semibold">
          My details
        </Typo>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="w-full mb-8 space-x-14 md:flex">
            <div className="md:w-1/2">
              <div className="flex space-x-3">
                <Label htmlFor="firstName">
                  <span>First Name</span>
                </Label>
                <Tooltip
                  title="Please tell us your first name, so we know how to address you in any communications.
                "
                  arrow
                  theme="light"
                  distance={15}
                >
                  <span className={questionMarkStyles}>?</span>
                </Tooltip>
              </div>
              <Input
                type="text"
                id="firstName"
                className="w-full h-14"
                {...register("firstName")}
              />
              {/* {errors.firstName && (
                <ErrorMessage>This field is required</ErrorMessage>
              )} */}
            </div>
            <div className="md:w-1/2">
              <div className="flex space-x-3">
                <Label htmlFor="location">Location (e.g. city, town)</Label>
                <Tooltip
                  title="
                    Please tell us your approximate location, so we can make our recommendations more relevant to you
                  "
                  arrow
                  theme="light"
                  distance={15}
                >
                  <span className={questionMarkStyles}>?</span>
                </Tooltip>
              </div>
              <Input
                type="text"
                id="location"
                className="h-14"
                {...register("location")}
              />
              {/* {errors.location && (
                <ErrorMessage>This field is required</ErrorMessage>
              )} */}
            </div>
          </div>
          <div className=" space-x-14 md:flex">
            <div className="md:w-1/2">
              <Label htmlFor="location">Email</Label>
              <Input
                type="email"
                id="email"
                className="h-14"
                {...register("email")}
              />
              {/* {errors.location && (
                <ErrorMessage>This field is required</ErrorMessage>
              )} */}
            </div>
            <div className="mb-5 md:w-1/2">
              <Label htmlFor="location">Password</Label>
              <Input
                type="password"
                id="password"
                className="h-14"
                {...register("password")}
              />
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
        <div className="w-full h-[1px] bg-gray-300 my-base2" />
        {/* My lists */}
        <Typo as="h3" h3 className="mb-8 font-semibold">
          My lists
        </Typo>
        <div className="flex space-x-base">
          <Link to="/my-bucket-list" className="btn btn-secondary">
            {" "}
            View & Edit{" "}
          </Link>
          <div>My bucket list</div>
        </div>
        <div className="w-full h-[1px] bg-gray-300 my-base2" />
        {/* Delete */}
        <button
          onClick={handleDeleteUser}
          className="w-[184px] border-red-500 btn btn-secondary hover:bg-red-500 hover:text-white"
        >
          delete account
        </button>
      </Section>
    </AuthContent>
  );
};
