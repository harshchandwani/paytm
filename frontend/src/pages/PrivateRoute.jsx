import React from 'react'
import { useNavigate } from 'react-router-dom';

const PrivateRoute = () => {
    const token = localStorage.getItem("token");
    const naviagte = useNavigate();
    return ( naviagte("/signup") );
}

export default PrivateRoute