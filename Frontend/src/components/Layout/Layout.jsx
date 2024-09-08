import { Outlet } from "react-router-dom";
import Navbar from "./Nav/Navbar";
import Footer from "./Footer/Footer";
import Slider from "../AdminSlider/AdminSlider";
import useUserSlice from "../../store/userSlice";

const Layout = () => {
    const { getUser } = useUserSlice();
    const user = getUser();

    return (
        <div
            className={`min-h-screen flex ${
                user?.role === "customer" ? "flex-col" : "flex-row"
            } `}
        >
            {user?.role === "customer" ? <Navbar /> : <Slider />}
            <main className="flex-grow">
                <Outlet />
            </main>
            {user?.role === "customer" && <Footer />}
        </div>
    );
};

export default Layout;
