import React from "react";
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
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
            </Routes>
        </SnackbarProvider>
    </Router>
);