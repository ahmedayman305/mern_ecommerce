import React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Spin, message } from "antd";
import { useSignUp } from "../../hooks/auth";
import { LoadingOutlined } from "@ant-design/icons";
import useUserSlice from "../../store/userSlice";

const SignUp = () => {
    const { mutateAsync: signUp, isLoading } = useSignUp();
    const { setUser } = useUserSlice();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    const formHandler = async (data) => {
        await signUp(data, {
            onSuccess: (response) => {
                setUser(response.user);
                navigate("/");
                reset();
            },
            onError: (err) => {
                const errorMessage =
                    err.response?.data?.message || "An error occurred";

                setTimeout(() => {
                    message.error(errorMessage);
                }, 500);
            },
        });
    };

    const password = watch("password");

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
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <motion.form
                onSubmit={handleSubmit(formHandler)}
                className="w-full max-w-sm bg-white p-6 rounded-md shadow-lg mx-2"
                initial={{ y: 30 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

                {/* Name Input */}
                <div className="mb-4">
                    <label
                        className="block text-sm font-medium mb-2"
                        htmlFor="name"
                    >
                        Name
                    </label>
                    <input
                        id="name"
                        {...register("name", { required: "Name is required" })}
                        type="text"
                        placeholder="Enter your name"
                        className={`w-full px-3 py-2 border rounded-md ${
                            errors.name ? "border-red-500" : "border-gray-300"
                        } focus:outline-none focus:ring-2 focus:ring-slate-800`}
                    />
                    {errors.name && (
                        <Alert
                            className="mt-1"
                            message={errors.name.message}
                            type="error"
                            showIcon
                        />
                    )}
                </div>

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
                        className={`w-full px-3 py-2 border rounded-md ${
                            errors.email ? "border-red-500" : "border-gray-300"
                        } focus:outline-none focus:ring-2 focus:ring-slate-800`}
                    />
                    {errors.email && (
                        <Alert
                            className="mt-1"
                            message={errors.email.message}
                            type="error"
                            showIcon
                        />
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
                            minLength: {
                                value: 8,
                                message:
                                    "Password must be at least 8 characters long",
                            },
                            validate: (value) =>
                                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                                    value
                                ) ||
                                "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                        })}
                        className={`w-full px-3 py-2 border rounded-md ${
                            errors.password
                                ? "border-red-500"
                                : "border-gray-300"
                        } focus:outline-none focus:ring-2 focus:ring-slate-800`}
                    />
                    {errors.password && (
                        <Alert
                            className="mt-1"
                            message={errors.password.message}
                            type="error"
                            showIcon
                        />
                    )}
                </div>

                {/* Confirm Password Input */}
                <div className="mb-4">
                    <label
                        className="block text-sm font-medium mb-2"
                        htmlFor="confirmPassword"
                    >
                        Confirm Password
                    </label>
                    <input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        {...register("confirmPassword", {
                            required: "Please confirm your password",
                            validate: (value) =>
                                value === password || "Passwords do not match",
                        })}
                        className={`w-full px-3 py-2 border rounded-md ${
                            errors.confirmPassword
                                ? "border-red-500"
                                : "border-gray-300"
                        } focus:outline-none focus:ring-2 focus:ring-slate-800`}
                    />
                    {errors.confirmPassword && (
                        <Alert
                            className="mt-1"
                            message={errors.confirmPassword.message}
                            type="error"
                            showIcon
                        />
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-slate-800 text-white py-2 rounded-md hover:bg-slate-500 transition duration-300"
                    disabled={isSubmitting}
                >
                    Sign Up
                </button>

                <div className="flex justify-start items-center gap-2 mt-5">
                    <span className="text-slate-800 capitalize text-sm">
                        you already have account?{" "}
                    </span>
                    <Link
                        to={"/sign-up"}
                        className="text-slate-800 hover:text-slate-500 text-sm font-bold"
                    >
                        Login
                    </Link>
                </div>
            </motion.form>
        </div>
    );
};

export default SignUp;
