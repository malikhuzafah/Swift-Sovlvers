import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51N8WSfLtfsy3fxWXtG59UFNDxBx5I8mZyJXKYeAr1SarCkatMqYN8lPi6fqNB82eIasbMfZyYTSZTt8cnYC8GCz900SKvppAxz"
);

export default function Checkout() {
  const { state } = useLocation();

  const appearance = {
    theme: "flat",

    elements: {
      card: {
        iconColor: "#c4f0ff",
        color: "#fff",
        fontWeight: 500,
        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
        fontSize: "16px",
        "::placeholder": {
          color: "#87bbfd",
        },
      },
      invalid: {
        iconColor: "#ffc7ee",
        color: "#ffc7ee",
      },
    },
    // variables: {
    //   colorPrimary: "#0570de",
    //   colorBackground: "#ffffff",
    //   colorText: "#30313d",
    //   colorDanger: "#df1b41",
    //   fontFamily: "Ideal Sans, system-ui, sans-serif",
    //   spacingUnit: "2px",
    //   borderRadius: "4px",
    // },
  };

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret: state,
        appearance: appearance,
      }}
    >
      <CheckoutForm />
    </Elements>
  );
}
