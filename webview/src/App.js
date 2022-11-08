import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {useEffect} from "react"

function Paypal() {
  useEffect(() => {
    window.addEventListener("message", (message) => {
      console.log(message.data); // Wayne is coming!!!
    });
    return () => window.removeEventListener("message");
  }, [])
  return (
    <PayPalScriptProvider options={{ "client-id": "test" }}>
      <div
        className="w-full h-full bg-black flex justify-center items-center"
        style={{
          minHeight: "100vh",
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
              if(window.ReactNativeWebView) { // ensure window.ReactNativeWebView is there, otherwise, web app might crash if is not there
                window.ReactNativeWebView.postMessage('Wayne is coming again')
              }
              alert(`Transaction completed by ${name}`);
            });
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
}

export default Paypal;
