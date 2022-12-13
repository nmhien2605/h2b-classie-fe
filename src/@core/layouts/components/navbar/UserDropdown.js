// ** React Imports
import { Link, useHistory } from 'react-router-dom'
// import { useState, useEffect } from 'react'
// import axios from 'axios'
// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
// import { isUserLoggedIn } from '@utils'

// ** Third Party Components
import { Mail, Power, Settings, User } from 'react-feather'

// ** Reactstrap Imports
import { useEffect, useState } from 'react'
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap'


// ** Default Avatar Image
const defaultAvatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROdEaZteLTepbACoy3MjSfAsulnfciHnp4nw&usqp=CAU'

const API_DOMAIN = "http://localhost:5000"
const UserDropdown = () => {
  // ** State
  const [userData, setUserData] = useState(null)
  const history = useHistory();
  //** ComponentDidMount


  //** Vars
  const userAvatar = (userData && userData.avatarUrl) || defaultAvatar
  const handleLogout = () => {
    localStorage.clear();
    history.push("/login");
    //   axios
    // .post(`${API_DOMAIN}/logout`, {
    // }, { withCredentials: true })
    // .then(() => {

    //   // history.push('/login')
    //   // return <div></div>

    //   // window.location.href = "/login"
    // })
    // .catch((error) => {
    //   console.error(error)
    // })
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      setUserData(user);
    }
  }, [])
  return (
    <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
        <div className='user-nav d-sm-flex d-none'>
          <span className='user-name fw-bold'>{(userData && userData.name) || ' '}</span>
        </div>
        <Avatar img={userAvatar} imgHeight='40' imgWidth='40' status='online' />
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem tag='a' href='/pages/profile' onClick={e => e.preventDefault()}>
          <User size={14} className='me-75' />
          <span className='align-middle'>Profile</span>
        </DropdownItem>
        <DropdownItem tag='a' href='/apps/email' onClick={e => e.preventDefault()}>
          <Mail size={14} className='me-75' />
          <span className='align-middle'>Inbox</span>
        </DropdownItem>

        <DropdownItem divider />
        <DropdownItem tag='a' href='/account-settings' >
          <Settings size={14} className='me-75' />
          <span className='align-middle'>Settings</span>
        </DropdownItem>
        <DropdownItem tag={Link} onClick={handleLogout}>
          <Power size={14} className='me-75' />
          <span className='align-middle'>Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown
