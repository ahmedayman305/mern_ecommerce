import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <div className="bg-slate-800 text-white ">
            <footer className="w-full px-6 py-8 md:px-32 md:py-16 flex flex-col md:flex-row justify-between items-center md:items-center">
                <div className="flex   gap-3 mb-6 md:mb-0">
                    <Link className="">Home</Link>
                    <Link className="">About</Link>
                    <Link className="">Contact Us</Link>
                </div>

                <div className="flex flex-col gap-4">
                    <form
                        onSubmit={() => {}}
                        className="flex flex-col md:flex-row gap-2 mb-6 md:mb-0"
                    >
                        <input
                            type="text"
                            placeholder="contact with us"
                            className="py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-mainColor"
                        />
                        <button
                            type="submit"
                            className="bg-mainColor text-white py-2 px-4 rounded-md hover:bg-mainColorDark"
                        >
                            send
                        </button>
                    </form>
                    <ul className="flex gap-4 ">
                        <li>
                            <i class="fa-brands fs-2xs fa-square-facebook"></i>
                        </li>
                        <li>
                            <i class="fa-brands fa-linkedin"></i>
                        </li>
                    </ul>
                </div>
            </footer>
        </div>
    );
}
