import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userRequest } from "../request-methods";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import CartProduct from "../components/CartProduct";
import { deleteProduct, emptyCart } from "../store/cart-slice";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { Alert } from "@mui/material";
const ShoppingCart = () => {
  const navigate = useNavigate();
  const cart = useSelector((store) => store.cart);
  const user = useSelector((store) => store.auth.currentUser);
  const dispatch = useDispatch();
  const [showMsg, setShowMsg] = useState(false);

  const continueShoppingClickHandler = () => {
    navigate(-1);
  };

  const handleDelete = (product) => {
    dispatch(
      deleteProduct({
        id: product._id,
        total: product.price * product.quantity,
        totalquantity: product.quantity,
      })
    );
  };

  const handlePayment = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (cart.products.length === 0) {
      setShowMsg(true);
      setTimeout(() => {
        setShowMsg(false);
      }, 3000);
      return;
    }
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
    const body = {
      products: cart.products,
    };
    const response = await userRequest.post("/checkout", body);
    console.log(response);
    const session = await response.data;

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
    } else {
      dispatch(emptyCart());
    }
  };
  return (
    <>
      <Announcement />
      <Navbar />
      <section className="px-8 py-4 ">
        {/* Title */}
        <div>
          <h1 className="uppercase font-semibold text-2xl text-center">
            Your Cart
          </h1>
          <div
            className={`sm:w-3/4 lg:w-1/2 transition duration-300 mx-auto ${
              !showMsg && "opacity-0"
            }`}
          >
            <Alert
              variant="outlined"
              severity="error"
              onClose={() => setShowMsg(false)}
            >
              Your cart is empty. Please add items to your cart before
              proceeding
            </Alert>
          </div>
        </div>
        {/* Button Container */}
        <div className="grid sm:grid-cols-2 items-between gap-2 md:gap-4 lg:gap-6">
          {/* Continue Shopping */}
          <div className="flex gap-8 justify-start items-center ">
            <a
              onClick={continueShoppingClickHandler}
              className="text-sm lg:text-md cursor-pointer uppercase px-3 py-2 border-2 border-black hover:bg-black hover:text-white transition ease-out duration-500"
            >
              continue shopping
            </a>
            <p className="">Shopping Bag ({cart.totalQuantity})</p>
          </div>
          {/* Payment Button */}
          <div className="flex justify-end gap-4">
            <button
              onClick={() => dispatch(emptyCart())}
              className="text-sm lg:text-md cursor-pointer uppercase px-3 py-2 border-2 border-black hover:bg-black hover:text-white transition ease-out duration-500"
            >
              EMPTY CART
            </button>
            <button
              onClick={handlePayment}
              className="text-sm lg:text-md cursor-pointer uppercase px-3 py-2 border-2 border-black hover:bg-black hover:text-white transition ease-out duration-500"
            >
              Checkout
            </button>
          </div>
        </div>

        {/* main div */}
        <div className="my-8 grid gap-8 lg:grid-cols-[2fr_1fr] min-h-[400px] ">
          {/* Product Container */}
          <div className="flex flex-col gap-6 ">
            {cart.products.map((product) => (
              <CartProduct
                key={product._id}
                product={product}
                handleDelete={handleDelete}
              />
            ))}
          </div>
          {/* Summary Container */}
          <div className="border rounded-sm p-2 flex flex-col gap-4 h-fit ">
            <h1 className="uppercase text-xl ">order summary</h1>
            <div className="flex justify-between ">
              <span className="text-sm capitalize">subtotal</span>
              <span>₹ {Math.round(Math.abs(cart.totalPrice.toFixed(2)))}</span>
            </div>
            <div className="flex justify-between ">
              <span className="text-sm capitalize">estimated shipping</span>
              <span>₹ 00.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm capitalize">shipping discount</span>
              <span>-₹ 00.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm capitalize">Total</span>
              <span className="font-bold text-2xl">
                ₹ {Math.round(Math.abs(cart.totalPrice.toFixed(2)))}
              </span>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ShoppingCart;
