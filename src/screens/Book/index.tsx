import { View, Text } from "react-native";
import React, { useMemo, useRef, useState } from "react";
// import Wizard
import Wizard from "react-native-wizard";
import ChooseRoom from "./Wizard/Steps/ChooseRoom";
import Calendar from "./Wizard/Steps/Calendar";
import SelectSlot from "./Wizard/Steps/SelectSlot";
import Layout from "../../studio/components/Buttons/Layout";
import { useToast } from "react-native-toast-notifications";
import ChooseDate from "./Wizard/Steps/Calendar";

const Book = ({navigation}) => {
  // ...
  const wizard = useRef();
  const [room, setRoom] = useState();
  const [date, setDate] = useState();
  const [form, setForm] = useState({
    slots: []
  });

  const toast = useToast();

 

  const [currentStep, setCurrentStep] = useState(0);
  const [isFirstStep, setIsFirstStep] = useState<boolean>();
  const [isLastStep, setIsLastStep] = useState<boolean>();

  const handleSubmit = () => {
    // post form
    // navigate("Home")
    toast.show("Session succesfully booked", {
      type: "success",
    });
    navigation.navigate("Home")
  };

  const stepList = [
    {
      content: <ChooseRoom {...{ wizard, setRoom }}></ChooseRoom>,
    },
    {
      content: <ChooseDate {...{ wizard, date, setDate }}></ChooseDate>,
    },
    {
      content: (
        <SelectSlot
          {...{ wizard, date, form, setForm, handleSubmit }}
        ></SelectSlot>
      ),
    },
  ];

  return (
    <View>
      <Layout header navigation={navigation}/>
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
    </View>
  );
};

export default Book;
