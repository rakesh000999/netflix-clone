import React, { useEffect } from 'react';
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate(); //Hook'
    const user = useSelector(store => store.user) //to get profile photo
    const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
    const handleGptSearchClick = () => {
        dispatch(toggleGptSearchView());
    }

    const handleSignOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
            navigate("/error");
        });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // sign in
                const { uid, email, displayName, photoURL } = user;
                dispatch(
                    addUser({
                        uid: uid,
                        email: email,
                        displayName: displayName,
                        photoURL: photoURL
                    })
                );
                navigate("/browse");
            } else {
                // User is signed out
                dispatch(removeUser());
                navigate("/");
            }
        });

        // unsubscribe when component unmounts
        return () => unsubscribe();   // unsubscribe the event i.e onAuthStateChanged (kind of like a eventListener)
    }, [])

    // can also useRef Hook
    const handleLanguageChange = (e) => {
        dispatch(changeLanguage(e.target.value));
    }

    return (
        <div className='absolute w-full px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>  {/* to overlap the header absolute is used */}
            <img
                className='w-44'
                src={LOGO}
                alt='logo'
            />
            {user && (
                <div className='flex p-2'>

                    {
                        showGptSearch && (
                            <select
                                className='p-2 bg-gray-900 text-white m-2'
                                onChange={handleLanguageChange}
                            >
                                {SUPPORTED_LANGUAGES.map((lang) =>
                                    <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>
                                )}
                            </select>
                        )
                    }

                    <button
                        className='py-2 px-4  mx-4 my-2 bg-purple-800 text-white rounded'
                        onClick={handleGptSearchClick}
                    >
                        {showGptSearch ? "Home" : "GPT Search"}
                    </button>
                    <img
                        className='w-12 h-12'
                        src='https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg'
                        // src='https://avatars.githubusercontent.com/u/154825017?v=4'
                        // src={user.photoURL}
                        alt='usericon'
                    />
                    <button
                        onClick={handleSignOut}
                        className='font-bold text-white'
                    >
                        (Sign Out)
                    </button>
                </div>
            )}
        </div>
    )
}

export default Header