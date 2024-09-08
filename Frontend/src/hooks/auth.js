import { useMutation } from "react-query";
import axios from "axios";

const API_URL = "http://localhost:5000";

// Utility function to handle authentication API calls
const signIn = async (credentials) => {
    const { data } = await axios.post(
        `${API_URL}/api/auth/sign-in`,
        credentials
    );
    return data;
};

const signUp = async (userInfo) => {
    const { data } = await axios.post(`${API_URL}/api/auth/sign-up`, userInfo);
    return data;
};

// Hook for signing in
export const useSignIn = () => {
    return useMutation(signIn);
};

// Hook for signing up
export const useSignUp = () => {
    return useMutation(signUp);
};
