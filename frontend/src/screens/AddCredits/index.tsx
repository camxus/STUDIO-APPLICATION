import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import React, { useMemo, useState } from "react";
import Layout from "../../studio/components/Buttons/Layout";
import { ProceedButton } from "../../studio/components/Buttons/ProceedButton";

const AddCredits = ({ navigation }) => {
  const [amount, setAmount] = useState(null);

  const price = useMemo(() => {
    return amount * 8;
  }, [amount]);

  const handleAddCredits = () => {
    // TODO credits api
    navigation.navigate("Payment");
  };
  return (
    <SafeAreaView>
      <Layout header navigation={navigation} />
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View className="w-full h-full flex justify-center items-center">
            <KeyboardAvoidingView behavior="padding">
              <Text className="font-black text-4xl italic uppercase">
                Add Credits
              </Text>
              <View className="w-full flex flex-row h-[100]">
                <View>
                  <Text className="font-black text-3xl italic uppercase">
                    Amount
                  </Text>
                  <Text className="font-black text-md italic uppercase">
                    Price: EUR {price}
                  </Text>
                </View>
                <View>
                  <TextInput
                    className="text-7xl font-black italic flex-auto"
                    value={amount}
                    placeholder="0"
                    keyboardType="numeric"
                    maxLength={2}
                    onChangeText={(num) => {
                      setAmount(+num);
                    }}
                  />
                </View>
              </View>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      <ProceedButton content="Save" onPress={() => handleAddCredits()} />
    </SafeAreaView>
  );
};

export default AddCredits;
