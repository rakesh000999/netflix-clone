import React, { useState } from 'react'
import Header from './Header'

const Login = () => {

    const [isSignInForm, setIsSignInForm] = useState(true);

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    };

    return (
        <div>
            <Header />
            <div className='absolute'>
                <img
                    src='https://assets.nflxext.com/ffe/siteui/vlv3/826348c2-cdcb-42a0-bc11-a788478ba5a2/13803d44-805f-4a74-9ad9-4fd16d76feb8/NP-en-20240729-POP_SIGNUP_TWO_WEEKS-perspective_WEB_9d54290e-dd19-45c2-8002-7a12a9dea821_medium.jpg'
                    alt='logo'
                />
            </div>
            <form className='w-3/12  absolute p-12 bg-black mt-24 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-85'>
                <h1 className='font-bold text-3xl py-4'>
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </h1>
                {!isSignInForm && (
                    <input
                        type='text'
                        placeholder='Full Name'
                        className='my-4 p-4 w-full bg-gray-500'
                    />
                )}
                <input
                    type='text'
                    placeholder='Email Address'
                    className='my-4 p-4 w-full bg-gray-500'
                />

                <input
                    type='password'
                    placeholder='Password'
                    className='my-4 p-4 w-full  bg-gray-500'
                />
                <button className='py-2 my-6 bg-red-700 w-full rounded-lg'>
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </button>
                <p className='py-4 cursor-pointer'
                    onClick={toggleSignInForm}>
                    {isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered? Sign In Now"}
                </p>
            </form>
        </div>
    )
}

export default Login