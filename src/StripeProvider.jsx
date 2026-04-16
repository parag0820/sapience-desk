import { CheckoutProvider } from "@stripe/react-stripe-js/checkout";
import { loadStripe } from "@stripe/stripe-js";
import { useMemo } from "react";
import CheckoutForm from "./components/CheckoutForm";

const stripePromise = loadStripe("pk_test_your_publishable_key");

export default function StripeProvider() {
  const clientSecretPromise = useMemo(() => {
    return fetch("http://localhost:5000/create-checkout-session", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);

  return (
    <CheckoutProvider
      stripe={stripePromise}
      options={{ clientSecret: clientSecretPromise }}
    >
      <CheckoutForm />
    </CheckoutProvider>
  );
}
