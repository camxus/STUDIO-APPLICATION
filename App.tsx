import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./src/navigation";
// import { ThemeProvider } from 'styled-components'
// import { ToastProvider } from 'react-native-styled-toast'

import { ToastProvider } from "react-native-toast-notifications";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { StatusBar } from "expo-status-bar";
import 'expo-dev-menu';


export default function App() {
  return (
    <ToastProvider
      placement="top"
      animationType="slide-in"
      offsetTop={getStatusBarHeight()}
      successColor="black"
      textStyle={{ fontSize: 16, padding: 10 }}
    >
      <StatusBar style="dark" />
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </ToastProvider>
  );
}
