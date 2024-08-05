import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from "../utils/validate"
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BG_URL, USER_AVATAR } from '../utils/constants';

const Login = () => {

    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    const dispatch = useDispatch();

    const email = useRef(null);
    const password = useRef(null);

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    };

    const handleButtonClick = () => {
        // Validate the form data

        // console.log(email.current.value);
        // console.log(password.current.value);

        const message = checkValidData(email.current.value, password.current.value);
        setErrorMessage(message);
        if (message !== null) return;

        // Sign In / Sign Up
        if (!isSignInForm) {

            // Sign Up Logic
            // Code used from firebase docs/api
            createUserWithEmailAndPassword(
                auth,
                email.current.value,
                password.current.value
            )
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: email.current.value,
                        photoURL:  USER_AVATAR 

                    }).then(() => {
                        // Profile updated!
                        const { uid, email, displayName, photoURL } = auth.currentUser;
                        dispatch(
                            addUser({
                                uid: uid,
                                email: email,
                                displayName: displayName,
                                photoURL: photoURL
                            })
                        );

                    }).catch((error) => {
                        // An error occurred
                        setErrorMessage(error.message);
                    });
                    // console.log(user);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage);
                });
        }
        else {
            // Sign In Logic
            signInWithEmailAndPassword(
                auth,
                email.current.value,
                password.current.value
            ).then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // console.log(user);
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode + "-" + errorMessage);
            });
        }
    };

    return (
        <div>
            <Header />
            <div className='absolute'>
                <img
                    src={BG_URL}
                    alt='background_image'
                />
            </div>
            <form
                onSubmit={(e) => e.preventDefault()}
                className='w-[30%] absolute p-12 px-20 bg-black mt-24 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-85'
            >
                <h1 className='font-bold text-3xl py-4'>
                    {isSignInForm
                        ? "Sign In"
                        : "Sign Up"
                    }
                </h1>
                {!isSignInForm && (
                    <input
                        type='text'
                        placeholder='Full Name'
                        className='my-4 p-4 w-full bg-[#10100F] bg-opacity-85 border focus:border-[3px] rounded-md'
                    />
                )}
                <input
                    ref={email}
                    type='text'
                    placeholder='Email Address'
                    className='my-4 p-4 w-full bg-[#10100F] bg-opacity-85 border focus:border-[3px] rounded-md'
                />
                <input
                    ref={password}
                    type='password'
                    placeholder='Password'
                    className='my-4 p-4 w-full bg-[#10100F] border rounded-md'
                />

                <p className='font-bold text-red-500'>{errorMessage}</p>

                <button
                    className='py-2 my-6 bg-red-700 w-full rounded-lg'
                    onClick={handleButtonClick}
                >
                    {isSignInForm
                        ? "Sign In"
                        : "Sign Up"
                    }
                </button>
                <p className='py-4 cursor-pointer'
                    onClick={toggleSignInForm}>
                    {isSignInForm
                        ? "New to Netflix? Sign Up Now"
                        : "Already registered? Sign In Now"
                    }
                </p>
            </form>
        </div>
    )
}

export default Login;