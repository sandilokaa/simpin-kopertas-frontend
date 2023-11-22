import React from "react";
import NavbarGeneral from "../../components/navbar/Navbar";

const HomeLayout = ({ children }) => {
    return (
        <>
            <div>
                <NavbarGeneral />
            </div>
            <div>
                {children}
            </div>
        </>
    );
};

export default HomeLayout;