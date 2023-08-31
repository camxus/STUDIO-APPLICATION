import React, { useEffect, useState } from "react";
import { View, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Button, KeyboardAwareScrollView } from "react-native-ui-lib";
import Input from "../../components/Input";
import * as yup from "yup";
import { useFormik } from "formik";
import { isObjEmpty } from "../../../../utilities/utils";
import { gql } from "../../../../utilities/hooks/useAxiousInstance";
import { CHECK_EMAIL, CHECK_USERNAME } from "../../../../studio/graphql/auth";

function User_Credentials({ setUserData, navigation, wizard }) {
  const FIELDS = [
    {
      name: "email",
      label: "Email",
      showSuccess: true,
      yup: yup
        .string()
        .email("Must be a valid email")
        .required("Email Required")
        .test(
          "email",
          "An account is already using this email",
          async function (email) {
            try {
              await gql(CHECK_EMAIL, { email });
              return true;
            } catch (e) {
              return false;
            }
          }
        ),
    },
    {
      name: "username",
      label: "Username",
      showSuccess: true,
      yup: yup
        .string()
        .required("Username Required")
        .matches(
          /^(?=[a-zA-Z0-9._]{3,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
          "Must be valid username"
        )
        .test(
          "username",
          "An account is already using this username",
          async function (username) {
            try {
              await gql(CHECK_USERNAME, { username });
              return true;
            } catch (e) {
              return false;
            }
          }
        ),
    },
    {
      name: "password",
      label: "Password",
      secureTextEntry: true,
      yup: yup
        .string()
        .required("Please enter password")
        .min(8, "Password must contain at least 8 characters")
        .matches(
          /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
          "Password must contain at least 8 characters, one uppercase, one number and one special case character"
        ),
    },
    {
      name: "retype_password",
      label: "Retype Password",
      secureTextEntry: true,
      yup: yup
        .string()
        .required("Please retype password")
        .oneOf([yup.ref(`password`), null], "Passwords must match"),
    },
  ];

  const formik = useFormik({
    initialValues: Object.fromEntries(FIELDS.map((field) => [field.name, ""])),
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: yup
      .object()
      .shape(
        Object.fromEntries(FIELDS.map((field) => [field.name, field.yup]))
      ),
    onSubmit: (values) => {
      setUserData((userData) => ({
        ...userData,
        username: values.username,
        email: values.email,
        password: values.password,
      }));
      wizard.current.next();
    },
  });

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View className="h-full w-full p-8 flex flex-col justify-center">
        {FIELDS.map((field, i) => (
          <View key={i}>
            <Input
              name={field.name}
              label={field.label}
              secureTextEntry={field.secureTextEntry}
              onBlur={formik.handleBlur(field.name)}
              value={formik.values[field.name]}
              onChangeText={formik.handleChange(field.name)}
              error={formik.touched[field.name] && formik.errors[field.name]}
              showSuccess={field.showSuccess}
            />
            {formik.errors[field.name] && (
              <Text className="text-xs text-red-500">
                {formik.errors[field.name]}
              </Text>
            )}
          </View>
        ))}

        <Button
          className="m-4 bg-primary"
          onPress={() => formik.handleSubmit()}
          disabled={!isObjEmpty(formik.errors)}
        >
          <Text
            className={`${
              !isObjEmpty(formik.errors) ? "text-neutral-400" : "text-white"
            }`}
          >
            Next
          </Text>
        </Button>

        <Button
          className="bg-transparent"
          color="black"
          onPress={() => navigation.goBack()}
        >
          <Text className="text-sm">Log In</Text>
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default User_Credentials;
