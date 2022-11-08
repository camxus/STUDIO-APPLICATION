import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  Pressable,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Button, Card, Dialog } from "react-native-ui-lib";
import Input from "../../components/Input";
import * as yup from "yup";
import { useFormik } from "formik";
import { isObjEmpty } from "../../../../utilities/utils";
import DatePicker from "@react-native-community/datetimepicker";

interface IFields {
  name: string;
  label: string;
  yup?: any;
  secureTextEntry?: boolean;
}

function User_Credentials({ setUserData, navigation, wizard }) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const FIELDS: IFields[] = [
    {
      name: "first_name",
      label: "First Name",
      yup: yup
        .string()
        .required("Required")
        .min(2, "First Name must be at least 2 characters"),
    },
    {
      name: "last_name",
      label: "Last Name",
      yup: yup
        .string()
        .required("Required")
        .min(3, "Last Name must be at least 3 characters"),
    },
  ];

  const formik = useFormik({
    initialValues: {
      ...Object.fromEntries(FIELDS.map((field) => [field.name, ""])),
      birthdate: new Date(),
    },
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: yup.object().shape({
      ...Object.fromEntries(FIELDS.map((field) => [field.name, field.yup])),
      birthdate: yup
        .date()
        .required("Required")
        .test("age", "You must be 18 or older", function (birthdate) {
          const cutoff = new Date();
          cutoff.setFullYear(cutoff.getFullYear() - 18);
          return birthdate <= cutoff;
        }),
    }),
    onSubmit: (values: any) => {
      setUserData((userData) => ({
        ...userData,
        attributes: {
          ...userData.attributes,
          name: {
            first_name: values.first_name,
            last_name: values.last_name,
          },
          birthdate: values.birthdate,
        },
      }));
      wizard.current.next();
    },
  });

  const dateError: any = formik.errors["birthdate"];

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
              error={formik.errors[field.name]}
            />
            {formik.errors[field.name] && (
              <Text className="text-xs text-red-500">
                {formik.errors[field.name].toString()}
              </Text>
            )}
          </View>
        ))}

        <Pressable onPress={() => setDialogOpen(true)}>
          <View pointerEvents="none">
            <Input
              name="birthdate"
              label="Birthdate"
              value={formik.values["birthdate"].toDateString()}
              onChangeText={formik.handleChange("birthdate")}
              error={dateError}
            />
          </View>
        </Pressable>
        {formik.errors["birthdate"] && (
          <Text className="text-xs text-red-500">{dateError}</Text>
        )}

        <Dialog
          bottom
          useSafeArea
          visible={dialogOpen}
          onDismiss={() => setDialogOpen(false)}
        >
          <Card className="bg-white h-[300] rounded-[50] overflow-hidden">
            <DatePicker
              style={{
                borderRadius: 100,
                height: "100%",
                width: "100%",
                backgroundColor: "white",
              }}
              value={formik.values["birthdate"]}
              onChange={(e) =>
                formik.setFieldValue(
                  "birthdate",
                  new Date(e.nativeEvent.timestamp)
                )
              }
              mode="date"
              display="spinner"
              testID="dateTimePicker"
            />
          </Card>
        </Dialog>

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
      </View>
    </TouchableWithoutFeedback>
  );
}

export default User_Credentials;
