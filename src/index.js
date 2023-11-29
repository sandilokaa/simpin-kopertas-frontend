import React from "react";
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProfileUser from "./pages/profile/Profile";
import PrincipalSaving from "./pages/principalSaving/PrincipalSaving";
import MandatorySaving from "./pages/mandatorySaving/MandatorySaving";
import VoluntarySaving from "./pages/voluntarySaving/VoluntarySaving";
import News from "./pages/news/News";
import Report from "./pages/report/Report";
import { SnackbarProvider } from 'notistack';

const roots = document.getElementById('root');
const root = createRoot(roots);

root.render(
    <Router>
        <SnackbarProvider maxSnack={3}>
            <Routes>
                <Route path="/login" element={<Login />}></Route> 
                <Route path="/register" element={<Register />}></Route> 
                <Route path="/" element={<Home />}></Route>
                <Route path="/profile-user/" element={<ProfileUser />}>
                    <Route path=":userId" element={<ProfileUser/>}/>
                </Route>
                <Route path="/principal-saving" element={<PrincipalSaving />}></Route>
                <Route path="/mandatory-saving" element={<MandatorySaving />}></Route>
                <Route path="/voluntary-saving" element={<VoluntarySaving />}></Route>
                <Route path="/news" element={<News />}></Route>
                <Route path="/report-data" element={<Report />}></Route>
            </Routes>
        </SnackbarProvider>
    </Router>
);