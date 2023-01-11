
import axios from "axios"
// import { handleLogin } from "../redux/authentication"
import axiosHeader from "../constants/axiosHeader"
const API_DOMAIN = process.env.REACT_APP_API_DOMAIN;
const getUserInfo = async () => {

    try {
        const { data } = await axios.get(`${API_DOMAIN}/user-info`, { headers: axiosHeader }, { withCredentials: true, credentials: "include" })
        const userInfo = { ...data.user }
        // console.log(userInfo);
        localStorage.setItem("user", JSON.stringify(userInfo));
    } catch (error) {
        console.log(error);
    }

}
export default getUserInfo