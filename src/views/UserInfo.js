import { useHistory, useLocation } from "react-router-dom"
import queryString from 'query-string'

import { React } from "react"
const UserInfo = () => {
    const history = useHistory()
    const { search } = useLocation()
    const values = queryString.parse(search)

    console.log(search)
    console.log(values.user)
    localStorage.setItem("user", values.user)
    history.push('/')
    return (
        <div>

        </div>
    )
}
export default UserInfo