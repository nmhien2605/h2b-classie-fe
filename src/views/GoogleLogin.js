
import react from 'react'

// import { handleLogin } from "../redux/authentication"
import axiosHeader from "../constants/axiosHeader"
import getUserInfo from "./UserInfo";
const API_DOMAIN = process.env.REACT_APP_API_DOMAIN;
const GoogleLogin = async () => {
    const searchParams = new URLSearchParams(document.location.search);
    const token = searchParams.get('token');
    console.log(token)
    localStorage.setItem('accessToken', token)
    await getUserInfo();
    window.location.href = `${process.env.REACT_APP_DOMAIN}/home`;

    return (
        <div>Google Login</div>
    )

}
export default GoogleLogin