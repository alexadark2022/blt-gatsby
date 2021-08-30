import React from "react";
import { Section, Input, Typo } from "../ui-components";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import tw, { styled } from "twin.macro";
import { AuthContent } from "../auth";

export const MyAccountPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const Label = styled.label(() => [tw`block mb-1 font-bold text-black`]);
  const ErrorMessage = styled.div(() => [
    tw`max-w-md px-5 py-2 my-2 text-center text-red-500 bg-red-100 rounded-md`,
  ]);

  return (
    <AuthContent>
      <Section className={clsx("px-10 pt-10 pb-24 ")}>
        <Typo as="h3" h3 className="font-semibold">
          My details
        </Typo>
        <form action="">
          <div className="grid-cols-2 gap-16 md:grid">
            <div>
              <Label htmlFor="loaction">Location(e.g. city, town</Label>
              <Input
                type="text"
                id="location"
                className=""
                {...register("firstName", { required: true })}
              />
              {errors.firstName && (
                <ErrorMessage>This field is required</ErrorMessage>
              )}
            </div>
            <div>
              <Label htmlFor="location">Location(e.g. city, town</Label>
              <Input
                type="text"
                id="location"
                {...register("location", { required: true })}
              />
              {errors.location && (
                <ErrorMessage>This field is required</ErrorMessage>
              )}
            </div>
          </div>
        </form>
      </Section>
    </AuthContent>
  );
};
