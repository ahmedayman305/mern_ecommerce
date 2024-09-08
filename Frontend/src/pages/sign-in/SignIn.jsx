import React from "react";
import { Spin, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useSignIn } from "../../hooks/auth";
import useUserSlice from "../../store/userSlice";

const SignIn = () => {
    const { mutateAsync: SignIn, isLoading } = useSignIn();
    const { setUser } = useUserSlice();

    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    const formHandler = async (data) => {
        await SignIn(data, {
            onSuccess: (response) => {
                setUser(response.user);
                response?.user?.role === "admin"
                    ? navigate("/admin")
                    : navigate("/");
            },
            onError: (err) => {
                const errorMessage = err.response?.data?.message;
                setTimeout(() => {
                    message.error(errorMessage);
                }, 500);
            },
        });
    };

    if (isLoading)
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-100">
                <Spin
                    indicator={<LoadingOutlined spin />}
                    size="large"
                    className="w-full max-w-sm bg-white p-6 rounded-md shadow-lg mx-2"
                />
            </div>
        );

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100 ">
            <motion.form
                onSubmit={handleSubmit(formHandler)}
                className="w-full max-w-sm bg-white p-6 rounded-md shadow-lg"
                initial={{ y: 30 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

                {/* Email Input */}
                <div className="mb-4">
                    <label
                        className="block text-sm font-medium mb-2"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <input
                        id="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                message: "Email is not valid",
                            },
                        })}
                        type="email"
                        placeholder="Enter your email"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800`}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {/* Password Input */}
                <div className="mb-4">
                    <label
                        className="block text-sm font-medium mb-2"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: "Password is required",
                        })}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800`}
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-slate-800 text-white py-2 rounded-md hover:bg-slate-500 transition duration-300"
                    disabled={isSubmitting}
                >
                    Login
                </button>

                <div className="flex justify-start items-center gap-2 mt-5">
                    <span className="text-slate-800 capitalize text-sm">
                        you don't have account ?{" "}
                    </span>
                    <Link
                        to={"/sign-up"}
                        className="text-slate-800 hover:text-slate-500 text-sm font-bold"
                    >
                        Sign Up
                    </Link>
                </div>
            </motion.form>
        </div>
    );
};

export default SignIn;
