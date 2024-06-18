import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../store/auth-actions';
import { useNavigate } from 'react-router-dom';
import React, { useRef, useState } from 'react';
import isValidEmail from '../utils/isMailValid';
import Layout from '../components/Layout';
import { toast } from 'react-toastify';
const Register = () => {
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const navigate = useNavigate();

  const [acceptTerms, setAcceptTerms] = useState(false); // State for checkbox

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    const email = emailRef.current.value;
    if (isValidEmail(email)) {
      toast.warn(isValidEmail(email));
      return;
    }
    if (password !== confirmPassword) {
      toast.warn('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      toast.warn('Password must be at least 6 characters long');
      return;
    }
    if (!acceptTerms) {
      toast.warn('Please accept the terms and conditions');
      return;
    }
    if (!password.trim() || !name.trim() || !email.trim()) return;
    dispatch(
      register({
        name,
        password,
        email
      })
    );
    navigate('/');

    nameRef.current.value = '';
    passwordRef.current.value = '';
    confirmPasswordRef.current.value = '';
    emailRef.current.value = '';
  };

  return (
    <Layout>
      <div className='h-screen w-screen flex items-center justify-center bg-cover bg-login'>
        <div className='p-[20px] w-3/4 sm:w-2/5 bg-white border-2 border-teal-400'>
          <h1 className='text-[24px] font-light '>CREATE AN ACCOUNT</h1>
          <form action='' className='flex flex-wrap w-full ' onSubmit={formSubmitHandler}>
            <input
              type='text'
              className='flex-1 min-w-2/5 mt-[20px] mr-[10px] p-[10px] outline-none
            border '
              required={true}
              autoComplete='name'
              placeholder='Full Name'
              ref={nameRef}
            />
            <input
              type='email'
              className='flex-1 min-w-2/5 mt-[20px] mr-[10px] p-[10px] outline-none
            border '
              placeholder='Email'
              ref={emailRef}
              required={true}
              autoComplete='email'
            />
            <input
              type='password'
              className='flex-1 min-w-2/5 mt-[20px] mr-[10px] p-[10px] outline-none
            border '
              placeholder='Password'
              ref={passwordRef}
              required={true}
              autoComplete='password'
            />
            <input
              type='Password'
              className='flex-1 min-w-2/5 mt-[20px] mr-[10px] p-[10px] outline-none
            border '
              ref={confirmPasswordRef}
              required={true}
              autoComplete='password'
              placeholder='Confirm Password'
            />
            <div className='flex items-center mt-[20px]'>
              <input
                type='checkbox'
                className='mr-[10px]'
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
              />
              <span className='text-[12px] my-[20px] '>
                By creating an account, I consent to the processing of my personal data in accordance with the{' '}
                <b>PRIVACY POLICY</b>
              </span>
            </div>
            <div className='w-full'>
              <button
                disabled={auth.isFetching}
                className='w-2/5 py-[15px] px-[20px] bg-[teal] hover:bg-teal-500 text-white cursor-pointer mb-3 mt-[20px]'
              >
                CREATE
              </button>
            </div>
          </form>
          <Link to='/login' className=''>
            <p className='my-[10px] text-[12px] cursor-pointer hover:text-gray-400'>
              ALREADY HAVE AN ACCOUNT?
              <span className='text-blue-500 ml-1 underline '>SIGN IN</span>
            </p>
          </Link>
          {/* {auth.error && <span className='text-red-500 block '>Something Went Wrong...</span>} */}
        </div>
      </div>
    </Layout>
  );
};

export default Register;
