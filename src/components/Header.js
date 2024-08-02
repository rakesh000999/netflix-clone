import React from 'react';
import { auth } from "../utils/firebase";
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {

    const navigate = useNavigate(); //Hook'
    const user = useSelector(store => store.user) //to get profile photo

    const handleSignOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/");
        }).catch((error) => {
            // An error happened.
            navigate("/error");
        });
    }
    return (
        <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>  {/* to overlap the header absolute is used */}
            <img
                className='w-44'
                src='https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png'
                alt='logo'
            />
            {user && <div className='flex p-2'>
                <img
                    className='w-12 h-12'
                    // src='https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg'
                    // src='https://avatars.githubusercontent.com/u/154825017?v=4'
                    src={user.photoURL}
                    alt='usericon'
                />
                <button
                    onClick={handleSignOut}
                    className='font-bold text-white'
                >
                    (SIgn Out)
                </button>
            </div>}
        </div>
    )
}

export default Header