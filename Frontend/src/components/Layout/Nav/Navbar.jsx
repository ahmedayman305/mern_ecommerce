import { Input, ConfigProvider, Divider } from "antd";
import { useState } from "react";
import { motion } from "framer-motion";
import { BurgerMenu } from "../..";
import { Link } from "react-router-dom";

const { Search } = Input;

const Navbar = () => {
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const toggleSearch = () => {
        setIsSearchVisible(!isSearchVisible);
    };

    return (
        <div>
            {/* navbar for lg: device */}
            <div className="md:block hidden shadow">
                <div className="w-full px-1 text-center bg-slate-800 text-white">
                    welcome to M10 shop for Sport Clothes
                </div>
                <div className="w-full bg-white flex flex-col">
                    <header className="container mx-auto py-4 flex justify-between items-center">
                        <div className="lg:mr-32 mr-16">
                            <span className="text-xl font-extrabold playWrite text-slate-800 ">
                                M
                            </span>
                            <sup className="text-base playWrite ">10</sup>
                        </div>
                        <div className="flex-1">
                            <ConfigProvider
                                theme={{
                                    token: {
                                        colorPrimary: "#1e293b", // Button background to black
                                        colorText: "#ffffff", // Button text color to white
                                        controlOutline: "none", // Remove outline on focus
                                        borderWidth: 0, // Remove border width
                                    },
                                }}
                            >
                                <Search
                                    placeholder="input search text"
                                    enterButton
                                    size="large"
                                    className="text-slate-800"
                                />
                            </ConfigProvider>
                        </div>
                        <div className="flex justify-between itmes-center lg:ml-32 ml-12 lg:gap-10 gap-5">
                            <Link to={"/sign-in"}>
                                <button className="px-5 py-2 border-2 border-slate-800 text-slate-800 rounded shadow">
                                    Login
                                </button>
                            </Link>
                            <Link to={"/sign-up"}>
                                <button className="px-5 py-2 bg-slate-800 text-white rounded shadow">
                                    Sign up
                                </button>
                            </Link>
                        </div>
                    </header>

                    <Divider style={{ margin: "15px 0 10px" }} />

                    <div className="flex justify-center items-center">
                        <ul className="flex justify-between items-center gap-14 my-2 font-semibold capitalize text-slate-800">
                            <li className=" cursor-pointer">home</li>
                            <li className=" cursor-pointer">best seller</li>
                            <li className=" cursor-pointer">category</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* navbar for mobile: device */}
            <motion.div className="md:hidden shadow">
                <div className="w-full px-1 text-center bg-slate-800 text-white">
                    welcome to M10 shop for Sport Clothes
                </div>
                <div className="w-full bg-white">
                    <header className="container mx-auto py-4 flex justify-between items-center px-5">
                        <div>
                            <i
                                className="fa-solid fa-magnifying-glass text-lg cursor-pointer"
                                onClick={toggleSearch}
                            ></i>
                        </div>
                        <div className="">
                            <span className="text-base font-extrabold playWrite text-slate-800 ">
                                M
                            </span>
                            <sup className="text-xs playWrite">10</sup>
                        </div>
                        <div>
                            <BurgerMenu />
                        </div>
                    </header>
                    <motion.div
                        initial={{ y: -10 }}
                        animate={{ y: isSearchVisible ? 0 : -10 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {isSearchVisible && (
                            <ConfigProvider
                                theme={{
                                    token: {
                                        colorPrimary: "#1e293b", // Button background to black
                                        colorText: "#ffffff", // Button text color to white
                                        controlOutline: "none", // Remove outline on focus
                                        borderWidth: 0, // Remove border width
                                        borderRadius: 0, // Remove border radius
                                    },
                                }}
                            >
                                <Search
                                    placeholder="input search text"
                                    enterButton
                                    size="large"
                                />
                            </ConfigProvider>
                        )}
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Navbar;
