import React, { useState } from "react";
import photo from "../../assets/3.jpg";
import { motion } from "framer-motion";
import { CustomInput } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Corrected typo
        try {
            const data = {
                email,
                password,
            };
            const res = await axios.post(
                "http://localhost:5000/api/auth/sign-in",
                data
            );
            console.log(res);
            navigate("/"); // Navigate to the homepage or another route after successful login
        } catch (error) {
            console.log(error); // Log the error if the request fails
        }
    };

    return (
        <div className="lg:w-screen lg:h-screen flex justify-center lg:justify-between items-center">
            <div className="w-1/2 h-full relative lg:block hidden">
                <img
                    src={photo}
                    alt=""
                    className="w-full h-full object-cover"
                />
                <div className="absolute w-full h-full top-0 left-0 bg-black opacity-50 z-10"></div>
            </div>

            <motion.div
                className="w-1/2 h-full flex justify-center items-center gap-8 flex-col"
                initial={{ y: 10 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-5xl text-slate-800 my-10 playWrite font-extrabold select-none">
                    Login
                </h1>
                <form
                    onSubmit={handleSubmit}
                    className="px-12 py-6 shadow rounded-md bg-white lg:w-1/2 w-[400px]"
                >
                    <div className="select-none">
                        <CustomInput
                            icon={<i class="fa-solid fa-user"></i>}
                            placeholder="enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type={"email"}
                        />
                        <CustomInput
                            icon={<i class="fa-solid fa-lock"></i>}
                            placeholder="enter your password"
                            onChange={(e) => setpassword(e.target.value)}
                            value={password}
                            type={"password"}
                        />
                        <button
                            type="submit"
                            className="bg-slate-800 text-white px-6 py-3 rounded-lg shadow w-full"
                        >
                            Login
                        </button>
                        <div className="my-5 text-center">
                            <span>Have account already ? </span>
                            <Link to={"/sign-up"} className="font-semibold ">
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </form>
            </motion.div>

            <div className="lg:hidden block"></div>
        </div>
    );
};

export default SignIn;
