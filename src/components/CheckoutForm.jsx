import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { Button } from "react-bootstrap";

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/payment-success",
      },
    });

    if (result.error) {
      console.log(result.error.message);
      alert(result.error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />

      <Button type="submit" className="w-100 mt-3" disabled={!stripe}>
        Pay ₹{amount}
      </Button>
    </form>
  );
};

export default CheckoutForm;

// // import { PaymentElement, useCheckout } from "@stripe/react-stripe-js/checkout";

// import { PaymentElement } from "@stripe/react-stripe-js";
// import { useCheckout } from "@stripe/react-stripe-js/checkout";

// const CheckoutForm = () => {
//   const checkoutState = useCheckout();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (checkoutState.type === "loading") {
//       return;
//     }

//     if (checkoutState.type === "error") {
//       console.log(checkoutState.error.message);
//       return;
//     }

//     const { checkout } = checkoutState;

//     const result = await checkout.confirm();

//     if (result.type === "error") {
//       console.log(result.error.message);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} style={{ maxWidth: "500px" }}>
//       <PaymentElement />

//       <button type="submit">Pay Now</button>
//     </form>
//   );
// };

// export default CheckoutForm;
