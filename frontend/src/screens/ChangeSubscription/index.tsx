import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import {
  Button,
  Card,
  Dialog,
  PanningProvider,
} from "react-native-ui-lib";
import { ProceedButton } from "../../studio/components/Buttons/ProceedButton";
import Layout from "../../studio/components/Buttons/Layout";
import { Picker } from "@react-native-picker/picker";
import { PanGestureHandler } from "react-native-gesture-handler";

const ChangeSubscription = ({ navigation }) => {
  const MODELS = [
    {
      _id: 1,
      name: "AUDIO BASIC",
      price: "€154",
    },
    {
      _id: 1,
      name: "AUDIO STANDARD",
      price: "€154",
    },
    {
      _id: 1,
      name: "PHOTO BASIC",
      price: "€154",
    },
    {
      _id: 1,
      name: "PHOTO STANDARD",
      price: "€154",
    },
    {
      _id: 1,
      name: "PROFESSIONAL",
      price: "€154",
    },
  ];

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<any>(MODELS[1].name);

  const handleEndSubscription = () => {
    // open paypal
    // redux new subscription status
  };
  const handleChangeSubscription = () => {
    // open paypal
    // redux new subscription status
  };

  return (
    <SafeAreaView>
      <Layout header navigation={navigation} />

      <View className="w-full h-full flex justify-center items-center p-4">
        <View>
          <Text className="font-black text-4xl italic uppercase">
            Change Subscription
          </Text>
          <Button className="bg-primary" onPress={() => setDialogOpen(true)}>
            <Text className="font-black text-2xl text-white italic uppercase">
              {MODELS.find((model) => model.name === selectedModel).name}
            </Text>
          </Button>
        </View>
      </View>
      <View>
        <Dialog
          visible={dialogOpen}
          onDismiss={() => setDialogOpen(false)}
          useSafeArea
          disablePan
          bottom
        >
          <Card>
            <Picker
              selectedValue={selectedModel}
              onValueChange={(e, itemIndex) => setSelectedModel(e)}
            >
              {MODELS.map((model) => (
                <Picker.Item label={model.name} value={model.name} />
              ))}
            </Picker>
          </Card>
        </Dialog>
      </View>
      <ProceedButton content="Save" onPress={() => handleChangeSubscription()}>
        <Button
          className="bg-secondary"
          onPress={() => handleEndSubscription()}
          color="black"
        >
          <Text className="font-semibold p-1">End Subscription</Text>
        </Button>
      </ProceedButton>
    </SafeAreaView>
  );
};

export default ChangeSubscription;
