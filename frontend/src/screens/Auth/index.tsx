/* eslint-disable react-hooks/rules-of-hooks */

import {
  Text,
  View,
  StyleSheet,
  Button as ButtonReact,
  Alert,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  ActivityIndicator,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { Button } from "react-native-ui-lib";

import Constants from "expo-constants";

// You can import from local files
import Input from "./components/Input";
import React, { useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as yup from "yup";
import { useFormik } from "formik";
import authContext from "../../context/auth-context";
import { useToast } from "react-native-toast-notifications";
import { gql } from "../../utilities/hooks/useAxiousInstance";
import { LOGIN } from "../../studio/graphql/auth";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const LoginV1 = ({ setAuthState, navigation }) => {
  const { login } = useContext(authContext);
  const toast = useToast();
  const [error, serError]: any = useState(null);

  const [loading, setLoading] = useState(false);

  const FIELDS = [
    {
      name: "email",
      label: "Email",
      yup: yup.string().required("Required"),
    },
    {
      name: "password",
      label: "Password",
      secureTextEntry: true,
      yup: yup.string().required("Required"),
    },
  ];

  const formik = useFormik({
    initialValues: {
      ...Object.fromEntries(FIELDS.map((field) => [field.name, ""])),
    },
    validateOnChange: true,
    validationSchema: yup.object().shape({
      ...Object.fromEntries(FIELDS.map((field) => [field.name, field.yup])),
    }),
    onSubmit: async (values: any) => {
      try {
        console.log(values);
        setLoading(true);
        const variables = { email: values.email, password: values.password };
        const res = await gql(LOGIN, variables);
        console.log(res);
        const {
          data: {
            login: { token, userId, tokenExpiration },
          },
        } = res;
        login(token, userId, tokenExpiration);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.error(e.message);
        toast.show("Login Failed", {
          type: "error",
        });
      }
    },
  });

  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior="padding">
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View className="h-full p-8 flex flex-col justify-center">
            {FIELDS.map((field, i) => (
              <View key={i}>
                <Input
                  name={field.name}
                  label={field.label}
                  secureTextEntry={field.secureTextEntry}
                  onBlur={formik.handleBlur(field.name)}
                  value={formik.values[field.name]}
                  onChangeText={formik.handleChange(field.name)}
                  error={formik.errors[field.name]}
                />
                {formik.errors[field.name] && (
                  <Text className="text-xs text-red-500">
                    {formik.errors[field.name].toString()}
                  </Text>
                )}
              </View>
            ))}
            {error && <Text style={{ color: "red" }}>{error}</Text>}

            <Button
              className="m-4 bg-primary"
              onPress={() => formik.handleSubmit()}
            >
              <Text className="text-white">
                {loading ? <ActivityIndicator color="white" /> : "Submit"}
              </Text>
            </Button>

            <Button
              className="bg-transparent"
              color="black"
              onPress={() => navigation.navigate("SignUp")}
            >
              <Text className="text-sm">Sign Up</Text>
            </Button>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginV1;
