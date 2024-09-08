import React, { useState } from "react";
import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
} from "@ant-design/icons";
import { Button, Menu, ConfigProvider } from "antd";
import { motion } from "framer-motion";
const items = [
    {
        key: "1",
        icon: <PieChartOutlined />,
        label: "Option 1",
    },
    {
        key: "2",
        icon: <DesktopOutlined />,
        label: "Option 2",
    },
    {
        key: "3",
        icon: <ContainerOutlined />,
        label: "Option 3",
    },
    {
        key: "sub1",
        label: "Navigation One",
        icon: <MailOutlined />,
        children: [
            {
                key: "5",
                label: "Option 5",
            },
            {
                key: "6",
                label: "Option 6",
            },
            {
                key: "7",
                label: "Option 7",
            },
            {
                key: "8",
                label: "Option 8",
            },
        ],
    },
    {
        key: "sub2",
        label: "Navigation Two",
        icon: <AppstoreOutlined />,
        children: [
            {
                key: "9",
                label: "Option 9",
            },
            {
                key: "10",
                label: "Option 10",
            },
            {
                key: "sub3",
                label: "Submenu",
                children: [
                    {
                        key: "11",
                        label: "Option 11",
                    },
                    {
                        key: "12",
                        label: "Option 12",
                    },
                ],
            },
        ],
    },
];
const App = () => {
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    return (
        <motion.div
            className="bg-white"
            initial={{ width: 200 }}
            animate={{ width: collapsed ? 79 : 180 }}
            transition={{ duration: 0.3 }}
        >
            <div className="w-full flex justify-end items-center">
                <motion.button
                    onClick={toggleCollapsed}
                    className={`shadow bg-slate-600 px-3 py-1 text-center text-white w-full`}
                    initial={{ width: "100%" }}
                    animate={{ width: collapsed ? "100%" : "100%" }}
                    transition={{ duration: 0.3, ease: "easeInOut" }} // Smooth transition
                >
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </motion.button>
            </div>
            <ConfigProvider
                theme={{
                    components: {
                        Menu: {
                            itemActiveBg: "#475569",
                            itemSelectedBg: "#475569",
                            itemSelectedColor: "white",
                        },
                    },
                }}
            >
                <Menu
                    defaultSelectedKeys={["1"]}
                    defaultOpenKeys={["sub1"]}
                    mode="inline"
                    className="h-max"
                    inlineCollapsed={collapsed}
                    items={items}
                />
            </ConfigProvider>
        </motion.div>
    );
};
export default App;
