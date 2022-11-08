import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { Button } from "react-native-ui-lib";
import { getStatusBarHeight } from 'react-native-status-bar-height';

interface ILayout {
  header?: boolean;
  navigation;
}
const Layout = ({ header, navigation }: ILayout) => {
  const CREDITS = 20;
  const SUBSCRIPTION_STATUS = "PROFESSIONAL";

  const renderSubscriptionStatus = (status) => {
    switch (true) {
      case status.toLowerCase().includes("basic"):
        return "Basic";
      case status.toLowerCase().includes("standard"):
        return "Standard";
      case status.toLowerCase().includes("pro"):
        return "Pro";
      default:
        return "None";
    }
  };
  return (
    <>
      {header && (
        <View className="absolute flex flex-row justify-center top-4 z-50 gap-4 w-full" style={{paddingTop: getStatusBarHeight()}}>
          <Button
            className="bg-secondary"
            color="black"
            onPress={() => navigation.navigate("Add Credits")}
          >
            <Text className="font-semibold">Credits: {CREDITS}</Text>
          </Button>
          <Button
            className="bg-primary min-w-[0]"
            onPress={() => navigation.navigate("Change Subscription")}
          >
            <Text className="font-semibold text-white">
              {renderSubscriptionStatus(SUBSCRIPTION_STATUS)}
            </Text>
          </Button>
        </View>
      )}
    </>
  );
};

export default Layout;
