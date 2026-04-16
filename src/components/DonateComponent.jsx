import { useState, useEffect } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { API_ENDPOINTS, apiCall } from "../config/api";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const DonateComponent = ({ show, onHide, user }) => {
  const [amount, setAmount] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!show) {
      setClientSecret("");
      setAmount("");
    }
  }, [show]);

  const createPaymentIntent = async () => {
    if (!amount || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    try {
      setLoading(true);

      const res = await apiCall(API_ENDPOINTS.DONATE.Pay, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Number(amount),
          userId: user?.id,
        }),
      });

      const data = await res;

      console.log("Payment API RUN WOW", data?.url);

      if (data.payment) {
        window.location.href = data?.url;
      } else {
        alert("Failed Please Try again!");
      }

      setLoading(false);
    } catch (error) {
      console.error("Payment error:", error);
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size="md">
      <Modal.Header closeButton>
        <Modal.Title>Donate</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {!clientSecret && (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Donation Amount ($)</Form.Label>

              <Form.Control
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Form.Group>

            <Button
              variant="warning"
              className="w-100"
              onClick={createPaymentIntent}
              disabled={loading}
            >
              {loading ? <Spinner size="sm" /> : "Continue to Payment"}
            </Button>
          </>
        )}

        {clientSecret && (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance: {
                theme: "stripe",
              },
            }}
          >
            <CheckoutForm amount={amount} />
          </Elements>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default DonateComponent;
