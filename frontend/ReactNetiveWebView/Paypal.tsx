import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {
  webViewRender,
  emit,
  useNativeMessage,
} from "react-native-react-bridge/lib/web";

function Paypal() {
  // useNativeMessage hook receives message from React Native
  useNativeMessage((message) => {
    if (message.type === "success") {
      //   setData(message.data);
    }
  });

  return (
    <PayPalScriptProvider options={{ "client-id": "test" }}>
      <div
        className="w-full h-full bg-black flex justify-center items-center"
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: "1.99",
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
              const name = details.payer.name.given_name;
              alert(`Transaction completed by ${name}`);
            });
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
}

export default webViewRender(<Paypal />);
