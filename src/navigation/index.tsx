import * as React from "react";
import { View, Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home";
import Book from "../screens/Book";
import AddCredits from "../screens/AddCredits";
import ChangeSubscription from "../screens/ChangeSubscription";
import Payment from "../screens/Payment";
import Unlock from "../screens/Unlock";

const Stack = createNativeStackNavigator();

function Navigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Book" component={Book} />
      <Stack.Screen name="Add Credits" component={AddCredits} />
      <Stack.Screen name="Change Subscription" component={ChangeSubscription} />
      <Stack.Screen name="Unlock" component={Unlock} />
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={({ navigation }) => ({
          presentation: "modal",
          headerShown: true,
          headerRight: () => (
            <Button onPress={() => navigation.goBack()} title="Done" />
          ),
        })}
      />
    </Stack.Navigator>
  );
}

export default Navigation;
