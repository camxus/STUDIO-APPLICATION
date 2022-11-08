/* eslint-disable react-hooks/rules-of-hooks */

import {
  Text,
  View,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Constants from "expo-constants";

// You can import from local files
import React, { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import User_Credentials from "./Wizard/User_Credentials";
import User_Details from "./Wizard/User_Details";
import Wizard from "react-native-wizard";
import SelectSubscription from "./Wizard/SelectSubscription";
import { gql } from "../../../utilities/hooks/useAxiousInstance";
import { CREATE_USER } from "../../../studio/graphql/auth";
import { useToast } from "react-native-toast-notifications";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const SignUp = ({ setAuthState, navigation }) => {
  const toast = useToast();
  const wizard = useRef();

  const [currentStep, setCurrentStep] = useState(1);
  const [isFirstStep, setIsFirstStep] = useState<boolean>();
  const [isLastStep, setIsLastStep] = useState<boolean>();

  useEffect(() => {
    AsyncStorage.removeItem("userData");
  }, []);

  const [userData, setUserData] = useState({
    email: "",
    username: "",
    password: "",
    attributes: {
      name: { first_name: "", last_name: "", subscription_status: "" },
    },
  });

  async function signUp(userData) {
    try {
      const variables = userData;
      await gql(CREATE_USER, variables);
      await AsyncStorage.setItem(
        "@studio-app/userData",
        JSON.stringify(userData)
      );
    } catch (e) {
      throw e;
    }
  }

  const handleSubmit = async () => {
    try {
      console.log(userData);
      await signUp(userData);
      navigation.goBack();
    } catch (e) {
      toast.show("Sign Up Failed", {
        type: "error",
      });
    }
  };

  const stepList = [
    {
      content: <User_Credentials {...{ navigation, setUserData, wizard }} />,
    },
    {
      content: <User_Details {...{ navigation, setUserData, wizard }} />,
    },
    {
      content: (
        <SelectSubscription
          {...{ navigation, setUserData, wizard, handleSubmit }}
        />
      ),
    },
  ];

  return (
    <SafeAreaView>
      <KeyboardAvoidingView keyboardVerticalOffset={10} behavior="padding">
        <Wizard
          ref={wizard}
          activeStep={0}
          steps={stepList}
          isFirstStep={(val) => setIsFirstStep(val)}
          isLastStep={(val) => setIsLastStep(val)}
          currentStep={({ currentStep, isLastStep, isFirstStep }) => {
            setCurrentStep(currentStep);
          }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;
