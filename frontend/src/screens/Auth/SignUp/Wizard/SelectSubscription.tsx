import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Button, Card, Dialog } from "react-native-ui-lib";
import Input from "../../components/Input";
import * as yup from "yup";
import { useFormik } from "formik";
import { isObjEmpty } from "../../../../utilities/utils";
import { Picker } from "@react-native-picker/picker";

function User_Credentials({ setUserData, navigation, wizard, handleSubmit }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // TODO GET FROM GQL
  const SUBSCRIPITON_MODELS = [
    {
      _id: "1",
      name: "AUDIO BASIC",
      price: "€154",
    },
    {
      _id: "2",
      name: "AUDIO STANDARD",
      price: "€154",
    },
    {
      _id: "3",
      name: "PHOTO BASIC",
      price: "€154",
    },
    {
      _id: "4",
      name: "PHOTO STANDARD",
      price: "€154",
    },
    {
      _id: "5",
      name: "PROFESSIONAL",
      price: "€154",
    },
  ];

  const formik = useFormik({
    initialValues: {
      subscription_id: "",
    },
    validateOnChange: true,
    validationSchema: yup.object().shape({
      subscription_id: yup
        .string()
        .test("subscription_id", "Must be in list", function (subscription_id) {
          return SUBSCRIPITON_MODELS.find((s) => s._id === subscription_id)
            ? true
            : false;
        }),
    }),
    onSubmit: async (values) => {
      setUserData((userData) => ({
        ...userData,
        attributes: {
          ...userData.attributes,
          subscription_status: values.subscription_id ?? null,
        },
      }));
      setIsLoading(true);
      await handleSubmit();
      setIsLoading(false);
    },
  });

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View className="h-full w-full p-8 flex flex-col justify-center">
        <Pressable onPress={() => setDialogOpen(true)}>
          <View pointerEvents="none">
            <Input
              className="border-0 font-black text-[30%] uppercase italic w-full"
              placeholder="NONE"
              name="subscription_id"
              label="Subscription"
              value={
                SUBSCRIPITON_MODELS.find(
                  (s) => s._id === formik.values["subscription_id"]
                )?.name
              }
              onChangeText={formik.handleChange("subscription_id")}
              error={formik.errors["subscription_id"]}
            />
          </View>
        </Pressable>
        {formik.errors["subscription_id"] && (
          <Text className="text-xs text-red-500">
            {formik.errors["subscription_id"]}
          </Text>
        )}

        <Dialog
          bottom
          useSafeArea
          visible={dialogOpen}
          onDismiss={() => setDialogOpen(false)}
        >
          <Card className="bg-white h-[300] rounded-[50] overflow-hidden">
            <Picker
              selectedValue={formik.values["subscription_id"]}
              onValueChange={(e, itemIndex) =>
                formik.setFieldValue("subscription_id", e)
              }
            >
              {SUBSCRIPITON_MODELS.map((model) => (
                <Picker.Item label={model.name} value={model._id} />
              ))}
            </Picker>
          </Card>
        </Dialog>

        <Button
          className="m-4 bg-primary"
          onPress={() => formik.handleSubmit()}
          disabled={!isObjEmpty(formik.errors)}
        >
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <Text
              className={`${
                !isObjEmpty(formik.errors) ? "text-neutral-400" : "text-white"
              }`}
            >
              Submit
            </Text>
          )}
        </Button>

        <Button
          className="bg-transparent"
          color="black"
          onPress={() => handleSubmit()}
        >
          <Text className="text-sm">Skip</Text>
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default User_Credentials;
