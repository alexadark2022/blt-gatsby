import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import tw, { styled } from "twin.macro";
import { useMutation, gql } from "@apollo/client";

import { Section, Input, Button, Label, Select } from "../ui-components";
import { v4 as uuidv4 } from "uuid";

//TODO: fix apollo error
export const ContactPage = ({ intro }) => {
  const [mailData, setMailData] = useState({
    firstName: "",
    email: "",
    subject: "",
    message: "",
  });
  console.log("mailData", mailData);
  const { firstName, email, subject, message } = mailData;

  const SEND_EMAIL = gql`
    mutation ($input: SendEmailInput!) {
      sendEmail(input: $input) {
        origin
        sent
        message
      }
    }
  `;
  const [sendEmail] = useMutation(SEND_EMAIL);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => setMailData(data);

  console.log("errors", errors);

  useEffect(() => {
    sendEmail({
      variables: {
        input: {
          to: "alexaspalato@gmail.com",
          from: "gatsbywpthemes@gmail.com",
          subject: "mail from bucket list site",
          body: `First name: ${firstName}, Email:${email}, Subject:${subject}, Message:${message}`,
          clientMutationId: uuidv4(),
        },
      },
    });
    console.log("email sent");
  }, [email, firstName, message, subject, sendEmail]);

  const ErrorMessage = styled.div(() => [
    tw`max-w-md px-5 py-2 my-2 text-center text-red-500 bg-red-100 rounded-md`,
  ]);

  return (
    <Section className="pb-20 px-base2 pt-base2">
      <div
        dangerouslySetInnerHTML={{ __html: intro }}
        className="prose max-w-none mb-base2"
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid-cols-2 gap-16 md:grid">
          <div>
            <Label htmlFor="firstName">First name</Label>
            <Input
              type="text"
              id="firstName"
              className="focus:placeholder-transparent"
              {...register("firstName", { required: true })}
            />
            {errors.firstName && (
              <ErrorMessage>This field is required</ErrorMessage>
            )}
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              type="text"
              id="email"
              className="focus:placeholder-transparent"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <ErrorMessage>This field is required</ErrorMessage>
            )}
          </div>
        </div>
        <div>
          <Label htmlFor="subject">Subject</Label>

          <Select
            id="subject"
            options={[
              "Customer feedback",
              "Content & website update",
              "Finance",
              "Legal",
              "Partnerships",
              "Technical help",
              "Other",
            ]}
            defaultValue="Customer feedback"
            {...register("subject")}
          />
          {errors.subject && (
            <ErrorMessage>This field is required</ErrorMessage>
          )}
        </div>
        <div>
          <Label htmlFor="message">Message</Label>
          <Input
            as="textarea"
            id="message"
            className="h-[190px] focus:placeholder-transparent"
            {...register("message", { required: true })}
          />
          {errors.message && (
            <ErrorMessage>This field is required</ErrorMessage>
          )}
          <div className="flex justify-end">
            <Button
              as="input"
              type="submit"
              value="submit"
              className="h-[50px] mt-1 "
            />
          </div>
        </div>
      </form>
    </Section>
  );
};
