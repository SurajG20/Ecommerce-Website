import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../store/auth-actions";
import { useNavigate } from "react-router-dom";
import React, { useRef } from "react";

const Register = () => {
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const formSubmitHandler = (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const email = emailRef.current.value;
    if (!password.trim() || !username.trim() || !email.trim()) return;
    dispatch(
      register({
        username,
        password,
        email,
      })
    );
    navigate("/login");

    usernameRef.current.value = "";
    passwordRef.current.value = "";
    emailRef.current.value = "";
  };
  return (
    <div
      style={{
        background:
          'linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") center',
      }}
      className="h-screen w-screen flex items-center justify-center bg-cover "
    >
      <div className="p-[20px] w-3/4 sm:w-2/5 bg-white ">
        <h1 className="text-[24px] font-light ">CREATE AN ACCOUNT</h1>
        <form
          action=""
          className="flex flex-wrap "
          onSubmit={formSubmitHandler}
        >
          <input
            type="text"
            className="flex-1 min-w-2/5 mt-[20px] mr-[10px] p-[10px] outline-none
            border "
            placeholder="name"
          />
          <input
            type="text"
            className="flex-1 min-w-2/5 mt-[20px] mr-[10px] p-[10px] outline-none
            border "
            placeholder="surname"
          />
          <input
            type="text"
            className="flex-1 min-w-2/5 mt-[20px] mr-[10px] p-[10px] outline-none
            border "
            placeholder="username"
            ref={usernameRef}
          />
          <input
            type="email"
            className="flex-1 min-w-2/5 mt-[20px] mr-[10px] p-[10px] outline-none
            border "
            placeholder="email"
            ref={emailRef}
          />
          <input
            type="password"
            className="flex-1 min-w-2/5 mt-[20px] mr-[10px] p-[10px] outline-none
            border "
            placeholder="password"
            ref={passwordRef}
          />
          <input
            type="password"
            className="flex-1 min-w-2/5 mt-[20px] mr-[10px] p-[10px] outline-none
            border "
            placeholder="confirm password"
          />
          <span className="text-[12px] my-[20px] ">
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </span>
          <button
            disabled={auth.isFetching}
            className="w-2/5 py-[15px] px-[20px] bg-[teal] text-white cursor-pointer mb-3 "
          >
            CREATE
          </button>
        </form>
        <Link href="/login" className="">
          <a className="my-[10px] text-[12px] cursor-pointer ">
            ALREADY HAVE AN ACCOUNT?
            <span className="text-blue-500 ml-1 underline">SIGN IN</span>
          </a>
        </Link>
        {auth.error && (
          <span className="text-red-500 block ">Something Went Wrong...</span>
        )}
      </div>
    </div>
  );
};

export default Register;
