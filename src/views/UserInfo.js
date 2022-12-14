import { useHistory } from "react-router-dom"
import { React } from "react"
import axios from "axios"
// import { handleLogin } from "../redux/authentication"

const API_DOMAIN = 'http://localhost:5000'
const UserInfo = () => {
    const history = useHistory()

    axios
        .get(`${API_DOMAIN}/user-info`, { withCredentials: true })
        .then((res) => {
            const userInfo = { ...res.data.user }
            localStorage.setItem("user", JSON.stringify(userInfo))
            // ví du lay data khỏi localstorage
            // const temp = localStorage.getItem('user');
            // const user = JSON.parse(temp)
            // console.log(typeof user);
            // handleLogin(userInfo)
            window.location.href = "/home"
        })
        .catch((error) => {
            history.push('/login')
            // alert tài khoản lỗi ... đăng nhập / đăng ký lại
            console.error(error)
        })
    return (
        <div>

        </div>
    )
}
export default UserInfo