import React, { useEffect } from "react";
import { Section, Typo } from "../ui-components";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import tw, { styled } from "twin.macro";
import { AuthContent } from "../auth";
import { useAuth } from "../../lib/hooks/useAuth";
import { useMutation, gql } from "@apollo/client";
import "react-tippy/dist/tippy.css";
import { Link, navigate } from "gatsby";
import { useDbBucketList } from "../../lib/hooks/useDbBucketList";
import { AccountForm } from "../account";

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
  const [updateUser, { data: updateUserData }] = useMutation(UPDATE_USER);
  console.log("user data", updateUserData);
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

  // useEffect(() => {
  //   effect

  // }, [])

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
  };
  const { user } = useAuth();

  const questionMarkStyles =
    "flex items-center justify-center w-5 h-5 border border-gray-500 rounded-full bg-lightBlue text-black text-sm";
  return (
    <AuthContent>
      <Section className={clsx("px-10 pt-10 pb-24 ")}>
        <Typo as="h3" h3 className="mb-8 font-semibold">
          My details
        </Typo>
        {!updateUser ? (
          <div>your details have been updated</div>
        ) : (
          <AccountForm onSubmit={onSubmit} />
        )}
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
