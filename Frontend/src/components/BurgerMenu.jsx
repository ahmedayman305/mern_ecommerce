import React from "react";
import { Menu, Dropdown, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom"; // Use Link for navigation if using React Router

const BurgerIcon = () => {
    const menu = (
        <Menu>
            <Menu.Item key="home">
                <Link
                    to="/home"
                    className="px-4 py-1 text-slate-800 font-semibold"
                >
                    Home
                </Link>
            </Menu.Item>
            <Menu.Item key="bestseller">
                <Link
                    to="/bestseller"
                    className="px-4 py-1 text-slate-800 font-semibold"
                >
                    Best seller
                </Link>
            </Menu.Item>
            <Menu.Item key="Login">
                <Link
                    to="/sign-in"
                    className="px-4 py-1 text-slate-800 font-semibold"
                >
                    Login
                </Link>
            </Menu.Item>
            <Menu.Item key="SingUp">
                <Link
                    to="/sign-up"
                    className="px-4 py-1 text-slate-800 font-semibold"
                >
                    Sign Up
                </Link>
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="burger-container">
            <Dropdown overlay={menu} trigger={["click"]}>
                <Button
                    type="text"
                    icon={
                        <MenuOutlined
                            style={{ fontSize: "24px", color: "#000" }}
                        />
                    }
                />
            </Dropdown>
        </div>
    );
};

export default BurgerIcon;
