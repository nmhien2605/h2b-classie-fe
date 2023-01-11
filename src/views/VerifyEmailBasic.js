// ** React Imports
import { Link, useLocation } from 'react-router-dom'
// ** Reactstrap Imports
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap'

// ** Styles
import '@styles/react/pages/page-authentication.scss'
import axiosHeader from "../constants/axiosHeader"
import { useEffect } from 'react'
import axios from 'axios'
const API_DOMAIN = process.env.REACT_APP_API_DOMAIN;


const VerifyEmailBasic = () => {
  const { search } = useLocation();
  const email = new URLSearchParams(search).get('email')
  const resendEmail = async () => {
    await axios
      .get(`${API_DOMAIN}/users/active-account`, { headers: axiosHeader }, { withCredentials: true })
    // .then(() => {
    //   //redirect to ...
    //   console.log("Ok");
    //   history.push('/home')
    // })
    // .catch((error) => {
    //   console.error(error.response)
    //   handleError(error.response.data.msg);
    // })
  }

  // ** Hooks
  useEffect(() => {
    resendEmail();
  })
  return (
    <div className='auth-wrapper auth-basic px-2'>
      <div className='auth-inner my-2'>
        <Card className='mb-0'>
          <CardBody>
            <CardTitle tag='h2' className='fw-bolder mb-1'>
              Verify your email ✉️
            </CardTitle>
            <CardText className='mb-2'>
              We've sent a link to your email address: <span className='fw-bolder'>{email}</span> Please
              follow the link inside to continue.
            </CardText>
            <Button block tag={Link} to='/' color='primary'>
              Skip for now
            </Button>
            <p className='text-center mt-2'>
              <span>Didn't receive an email? </span>
              <a onClick={resendEmail}>
                <span>Resend</span>
              </a>
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default VerifyEmailBasic
