import { View, Text } from "react-native";
import WebView from "react-native-webview";
import { useWebViewMessage } from "react-native-react-bridge";
import React from "react";
import Paypal from "../../../ReactNetiveWebView/Paypal";

const Payment = ({ navigation }) => {
  // useWebViewMessage hook create props for WebView and handle communication
  // The argument is callback to receive message from React
  const { ref, onMessage, emit } = useWebViewMessage((message) => {
    // emit sends message to React
    //   type: event name
    //   data: some data which will be serialized by JSON.stringify
    if (message.type === "hello" && message.data === 123) {
      emit({ type: "success", data: "succeeded!" });
    }
  });

  return (
    <View className="w-full h-full">
      <WebView
        // ref, source and onMessage must be passed to react-native-webview
        ref={ref}
        // Pass the source code of React app
        source={{ uri: "https://paypal-webview-indol.vercel.app" }}
        onLoad={() => ref.current.postMessage("Wayne is coming!!!")}
        onMessage={(event) => {
          console.log(event.nativeEvent.data); // Client received data
        }}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
        mixedContentMode="always"
        bounces={false}
      />
    </View>
  );
};

export default Payment;
