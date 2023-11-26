import React from "react";
import NavbarGeneral from "../../components/navbar/Navbar";
import FooterGeneral from "../../components/footer/Footer";

const ProfileLayout = ({ children }) => {
    return (
        <>
            <div>
                <NavbarGeneral />
            </div>
            <div>
                {children}
            </div>
            <div>
                <FooterGeneral />
            </div>
        </>
    );
};

export default ProfileLayout;