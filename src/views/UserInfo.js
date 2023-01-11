
import axios from "axios"
// import { handleLogin } from "../redux/authentication"

const API_DOMAIN = process.env.REACT_APP_API_DOMAIN;
const getUserInfo = async () => {
    try {
        const { data } = await axios.get(`${API_DOMAIN}/user-info`)
        const userInfo = { ...data.user }
        // console.log(userInfo);
        localStorage.setItem("user", JSON.stringify(userInfo));
    } catch (error) {
        console.log(error);
    }

}
export default getUserInfo