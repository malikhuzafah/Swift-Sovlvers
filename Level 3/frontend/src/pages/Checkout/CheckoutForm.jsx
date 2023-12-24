import React from "react";
import { ElementsConsumer, PaymentElement } from "@stripe/react-stripe-js";
import "./checkout.css";
import axios from "axios";

class CheckoutForm extends React.Component {
  handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    const { stripe, elements } = this.props;

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: `http://localhost:3000/order-summary?payment=true&orderId=${localStorage.getItem(
          "orderId"
        )}`,
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
      await axios
        .delete("http://localhost:3001/api/cartItems/empty")
        .then(() => {
          console.log("Cart emptied");
          // setCartItems([]);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
      // const navigate = useNavigate();
      // navigate("/order-summary", { state: true });
    }
  };

  render() {
    return (
      <>
        <div
          style={{
            width: "100%",
            height: "100vh",
            // marginTop: "60px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ width: "80%" }}>
            <form onSubmit={this.handleSubmit}>
              <PaymentElement />
              <div style={{ textAlign: "center" }}>
                <button
                  className="btn"
                  disabled={!this.props.stripe}
                  style={{}}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default function InjectedCheckoutForm() {
  return (
    <ElementsConsumer>
      {({ stripe, elements }) => {
        return <CheckoutForm stripe={stripe} elements={elements} />;
      }}
    </ElementsConsumer>
  );
}
