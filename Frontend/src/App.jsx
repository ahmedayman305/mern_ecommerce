import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home, SignIn, SignUp } from "./pages";
import { Layout } from "./components";

const adminPage = () => {
   
}

function App() {
    const [cartCount, setCartCount] = useState(0);

    const Router = createBrowserRouter([
        {
            element: <Layout />,
            children: [{ index: true, element: <Home /> }],
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
