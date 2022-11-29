import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./src/navigation";
// import { ThemeProvider } from 'styled-components'
// import { ToastProvider } from 'react-native-styled-toast'

import { ToastProvider } from "react-native-toast-notifications";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { StatusBar } from "expo-status-bar";
import "expo-dev-menu";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import AuthContext from "./src/context/auth-context";

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [authState, setAuthState] = useState(null);

  const login = async (token, userId, tokenExpiration) => {
    const userData = {
      userId: userId,
      token: token,
    };
    console.log(userData)
    await AsyncStorage.setItem("@studio/userData", JSON.stringify(userData));
    setToken(token);
    setUserId(userId);
    setIsLogin(true);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    AsyncStorage.clear();
    setIsLogin(false);
  };

  const init = async () => {
    let tokenIsValid = false;
    try {
      const decoded: any = jwt_decode(
        JSON.parse(await AsyncStorage.getItem("@studio/userData"))?.token
      );
      tokenIsValid = decoded.exp * 1000 > new Date().getTime();
      if (tokenIsValid === false) {
        throw new Error("Invalid token");
      }
      // if (isObjEmpty(me)) {
      //   dispatch(getMe());
      // }
      setIsLogin(false);
      setIsLoaded(true);
    } catch (e) {
      setIsLogin(false);
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    init();
  }, []);

  if (!isLoaded) {
    return null;
  }

  return (
    <ToastProvider
      placement="top"
      animationType="slide-in"
      offsetTop={getStatusBarHeight()}
      successColor="black"
      textStyle={{ fontSize: 16, padding: 10 }}
    >
      <AuthContext.Provider
        value={{
          token: token,
          userId: userId,
          login: login,
          logout: logout,
        }}
      >
        <StatusBar style="dark" />
        <NavigationContainer>
          <Navigation {...{ isLogin }} />
        </NavigationContainer>
      </AuthContext.Provider>
    </ToastProvider>
  );
}
