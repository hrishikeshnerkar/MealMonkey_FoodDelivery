import React, { useState } from 'react';
import { FaBasketShopping } from "react-icons/fa6";
import { MdAdd, MdLogout } from 'react-icons/md';
import { motion } from 'framer-motion';



import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../firebase.config';


import Logo from '../img/logo.png';
import Avatar from '../img/avatar.png';
import { Link } from 'react-router-dom';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';

const Header = () => {

    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const [{ user, cartShow, cartItems }, dispatch] = useStateValue();

    const [IsMenu, setIsMenu] = useState(false);

    const login = async () => {

        if (!user) {
            const {
                user: { refreshToken, providerData },
            } = await signInWithPopup(firebaseAuth, provider);
            dispatch({
                type: actionType.SET_USER,
                user: providerData[0],
            });
            localStorage.setItem('user', JSON.stringify(providerData[0]));
        } else {
            setIsMenu(!IsMenu);
        }
    };

    const logout = () => {
        setIsMenu(false);
        localStorage.clear();

        dispatch({
            type: actionType.SET_USER,
            user: null,
        });
    };

    const showCart = () => {
        dispatch({
            type: actionType.SET_CART_SHOW,
            cartShow: !cartShow,
        });
    };

    return (
        <header className='fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 bg-primary'>

            {/* Desktop/tablets */}

            <div className='hidden 
            md:flex h-full w-full items-center justify-between'>
                <Link to={'/'} className='flex items-center gap-2'>
                    <img src={Logo} className='w-8 object-cover' alt="logo" />
                    <p className='text-headingColor text-xl font-bold'>City</p>
                </Link>

                <div className='flex items-center gap-8'>
                    <motion.ul
                        initial={{ opacity: 0, x: 200 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 200 }}
                        className='flex items-center gap-8'>
                        <li className='text-base text-textColor hover:text-headingColor
                    duration-100 transition-all ease-in-out cursor-pointer'>
                            MENU</li>
                        <li className='text-base text-textColor hover:text-headingColor
                    duration-100 transition-all ease-in-out cursor-pointer'>
                            HOME</li>
                        <li className='text-base text-textColor hover:text-headingColor
                    duration-100 transition-all ease-in-out cursor-pointer'>
                            ABOUT US</li>
                        <li className='text-base text-textColor hover:text-headingColor
                    duration-100 transition-all ease-in-out cursor-pointer'>
                            SERVICES</li>
                    </motion.ul>

                    <div className='flex items-center justify-center'
                        onClick={showCart}
                    >
                        <FaBasketShopping className='text-textColor text-2xl cursor-pointer' />
                        {cartItems && cartItems.length > 0 && (
                            <div className='relative -top-2 right-[12px] w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center'>
                                <p className='text-xs text-white font-semibold'>{cartItems.length}</p>
                            </div>
                        )}
                    </div>

                    <div className='relative'>
                        <motion.img whileTap={{ scale: 0.6 }}
                            src={user ? user.photoURL : Avatar}
                            className='w-10 min-w-[40px] h-10 min-h-[40px] 
                            drop-shadow-xl cursor-pointer rounded-full'
                            alt="userprofile"
                            onClick={login}
                        />

                        {
                            IsMenu && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.6 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.6 }}
                                    className='w-40 bg-gray-50 shadow-xl rounded-lg
                        flex flex-col absolute top-12 right-0'>
                                    {
                                        user && user.email === "hrishikeshnerkar40@gmail.com" && (
                                            <Link to={"/createItem"}>
                                                <p className='px-4 py-2 flex items-center
                                    gap-3 cursor-pointer hover:bg-slate-100
                                    transition-all duration-100 ease-in-out
                                     text-textColor text-base'
                                                    onClick={() => setIsMenu(false)}
                                                >New Item <MdAdd /> </p>
                                            </Link>
                                        )
                                    }
                                    <p className='px-4 py-2 flex items-center
                            gap-3 cursor-pointer hover:bg-slate-100
                            transition-all duration-100 ease-in-out
                            text-textColor text-base'
                                        onClick={logout}>Logout <MdLogout /> </p>
                                </motion.div>
                            )}

                    </div>

                </div>

            </div>


            {/* mobile */}


            <div className='flex items-center justify-between md:hidden h-full w-full'>

                <div className='flex items-center justify-center'
                    onClick={showCart}>
                    <FaBasketShopping className='text-textColor text-2xl 
                    cursor-pointer'/>
                    {cartItems && cartItems.length > 0 && (
                        <div className='relative -top-2 right-[12px] w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center'>
                            <p className='text-xs text-white font-semibold'>{cartItems.length}</p>
                        </div>
                    )}
                </div>

                <Link to={'/'} className='flex items-center gap-2'>
                    <img src={Logo} className='w-8 object-cover' alt="logo" />
                    <p className='text-headingColor text-xl font-bold'>City</p>
                </Link>

                <div className='relative'>
                    <motion.img whileTap={{ scale: 0.6 }}
                        src={user ? user.photoURL : Avatar}
                        className='w-10 min-w-[40px] h-10 min-h-[40px] 
                            drop-shadow-xl cursor-pointer rounded-full'
                        alt="userprofile"
                        onClick={login}
                    />

                    {
                        IsMenu && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.6 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.6 }}
                                className='w-40 bg-gray-50 shadow-xl rounded-lg
                        flex flex-col absolute top-12 right-0'>
                                {
                                    user && user.email === "hrishikeshnerkar40@gmail.com" && (
                                        <Link to={"/createItem"}>
                                            <p className='px-4 py-2 flex items-center
                                    gap-3 cursor-pointer hover:bg-slate-100
                                    transition-all duration-100 ease-in-out
                                     text-textColor text-base'
                                            // onClick={() => setIsMenu(false)}
                                            >New Item <MdAdd /> </p>
                                        </Link>
                                    )}

                                <ul
                                    className='flex flex-col'>
                                    <li className='text-base text-textColor hover:text-headingColor
                                            duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2'
                                        onClick={() => setIsMenu(false)}
                                    >
                                        HOME</li>
                                    <li className='text-base text-textColor hover:text-headingColor
                                        duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2'
                                        onClick={() => setIsMenu(false)}
                                    >
                                        MENU</li>
                                    <li className='text-base text-textColor hover:text-headingColor
                                        duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2'
                                        onClick={() => setIsMenu(false)}
                                    >
                                        ABOUT US</li>
                                    <li className='text-base text-textColor hover:text-headingColor
                                        duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2'
                                        onClick={() => setIsMenu(false)}
                                    >
                                        SERVICES</li>
                                </ul>

                                <p className='m-2 p-2 rounded-md shadow-md flex items-center justify-center
                            gap-3 bg-gray-300 cursor-pointer hover:bg-gray-500
                            transition-all duration-100 ease-in-out
                            text-textColor text-base'
                                    onClick={logout}>Logout <MdLogout /> </p>
                            </motion.div>
                        )}

                </div>

            </div>

        </header>
    )
}

export default Header;
