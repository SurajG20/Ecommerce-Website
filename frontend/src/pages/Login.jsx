import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/auth-actions';
import Layout from '../components/Layout';
import isValidEmail from '../utils/isMailValid';
const Login = () => {
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  console.log(auth);
  const emailRef = useRef();
  const passwordRef = useRef();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (isValidEmail(email)) {
      alert(isValidEmail(email));
      return;
    }
    if (!password.trim() || !email.trim()) return;
    dispatch(
      login({
        email,
        password
      })
    );
    emailRef.current.value = '';
    passwordRef.current.value = '';
  };
  return (
    <Layout>
      <div className='px-8 w-full h-screen flex justify-center items-center   bg-login bg-no-repeat backdrop-blur-md  bg-cover'>
        <form
          onSubmit={formSubmitHandler}
          action=''
          className='border-2 border-teal-400 bg-white p-12 flex flex-col min-w-[17rem] shadow-md sm:min-w-[22rem] md:min-w-[28rem]'
        >
          <h1 className='uppercase text-xl mb-6 font-bold'>Log in</h1>
          <input
            className='p-2 mb-6 border-2 rounded focus:outline-none'
            type='email'
            placeholder='Email'
            ref={emailRef}
          />
          <input
            className='p-2 mb-6 border-2 rounded focus:outline-none'
            type='password'
            placeholder='Password'
            ref={passwordRef}
          />
          <button
            className='mb-6 bg-teal-700 hover:bg-teal-500 text-white p-2 disabled:bg-teal-500 disabled:cursor-not-allowed'
            disabled={auth.isFetching}
          >
            Login
          </button>
          {/* {auth.error && <p>Something went wrong. Please try later...</p>} */}
          <Link to='/register' className='capitalize underline mb-4 hover:text-gray-400'>
            create a new account
          </Link>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
