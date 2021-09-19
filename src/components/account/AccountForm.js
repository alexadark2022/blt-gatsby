import React from "react";
import { Input, Button } from "../../components/ui-components";
import { useForm } from "react-hook-form";
import { Tooltip } from "react-tippy";
import tw, { styled } from "twin.macro";

export const AccountForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const Label = styled.label(() => [tw`block mb-1 font-bold text-black`]);
  const questionMarkStyles =
    "flex items-center justify-center w-5 h-5 border border-gray-500 rounded-full bg-lightBlue text-black text-sm";
  const ErrorMessage = styled.div(() => [
    tw`max-w-md px-5 py-2 my-2 text-center text-red-500 bg-red-100 rounded-md`,
  ]);

  return (
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
  );
};
