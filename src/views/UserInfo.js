import { useHistory, useLocation } from "react-router-dom"
import queryString from 'query-string'
import React from "react"
const UserInfo = () => {
    const history = useHistory()
    const { search } = useLocation()
    const values = queryString.parse(search)
    console.log(values.token)
    console.log(values.user)

    return (
        history.push('/')
    )
}
export default UserInfo