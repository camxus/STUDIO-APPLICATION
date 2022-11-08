import { View, Text } from "react-native";
import React, { useRef, useState } from "react";
import { Button } from "react-native-ui-lib";
import SelectRoom from "./Steps/SelectRoom";
import Unlocking from "./Steps/Unlocking";
import Layout from "../../studio/components/Buttons/Layout";
import Wizard from "react-native-wizard";
import { useToast } from "react-native-toast-notifications";

const Unlock = ({ navigation }) => {
  const wizard = useRef(null);
  const toast = useToast();

  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(55);
  const [isFirstStep, setIsFirstStep] = useState<boolean>();
  const [isLastStep, setIsLastStep] = useState<boolean>();

  const handleUnlock = async (room) => {
    try {
      if (wizard) wizard.current.next();
      // await api response
      if (wizard) wizard.current.prev();
    } catch (e) {
      toast.show("Unlocking Door Failed", {
        type: "danger",
      });
    }
  };

  const stepList = [
    {
      content: (
        <SelectRoom {...{ wizard, handleUnlock: handleUnlock }}></SelectRoom>
      ),
    },
    {
      content: <Unlocking {...{ progress }} />,
    },
  ];
  return (
    <View>
      <Layout header navigation={navigation} />
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

export default Unlock;
