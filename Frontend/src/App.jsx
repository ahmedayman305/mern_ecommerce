import {
    RouterProvider,
    createBrowserRouter,
    Navigate,
} from "react-router-dom";
import { Home, SignIn, SignUp, AdminHome } from "./pages";
import { Layout } from "./components";
import useUserSlice from "./store/userSlice";

const AdminRoute = ({ children }) => {
    const { getUser } = useUserSlice();
    const user = getUser();

    return user?.role === "admin" ? children : <Navigate to="/" />;
};

function App() {
    const Router = createBrowserRouter([
        {
            element: <Layout />,
            children: [
                { index: true, element: <Home /> },
                {
                    path: "/admin",
                    element: (
                        <AdminRoute>
                            <AdminHome />
                        </AdminRoute>
                    ),
                },
            ],
        },
        { path: "/sign-in", element: <SignIn /> },
        { path: "/sign-up", element: <SignUp /> },
    ]);
    return (
        <>
            <RouterProvider router={Router} />
        </>
    );
}

export default App;
