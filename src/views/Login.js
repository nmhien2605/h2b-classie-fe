import { useSkin } from '@hooks/useSkin'
import { Link } from 'react-router-dom'
import axios from "axios"
import Cookies from 'js-cookie'

//import { useNavigate } from "react-router-dom"
import InputPasswordToggle from '@components/input-password-toggle'
import { Row, Col, CardTitle, CardText, Form, Label, Input, Button } from 'reactstrap'
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

import '@styles/react/pages/page-authentication.scss'
import { useForm, Controller } from 'react-hook-form'
import getUserInfo from './UserInfo'
import axiosHeader from '../constants/axiosHeader'

const API_DOMAIN = process.env.REACT_APP_API_DOMAIN;
const defaultValues = {
  password: '',
  email: ''
}
//import { handleLogin } from '@store/authentication'
const LoginCover = () => {
  const handleSuccess = (message) => {
    return MySwal.fire({
      title: 'Done!',
      text: message,
      icon: 'success',
      customClass: {
        confirmButton: 'btn btn-primary'
      },
      buttonsStyling: false
    })
  }
  const handleError = (message) => {
    return MySwal.fire({
      title: 'Error!',
      text: message,
      icon: 'error',
      customClass: {
        confirmButton: 'btn btn-primary'
      },
      buttonsStyling: false
    })
  }
  const { skin } = useSkin()

  const {
    control,
    //setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })
  const onSubmit = values => {
    axios
      .post(`${API_DOMAIN}/login`, {
        email: values.email,
        password: values.password
      }, { headers: axiosHeader }, { withCredentials: true, credentials: "include" })
      .then(async (res) => {
        // Cookies.set('accessToken', res.data.accessToken);
        // Cookies.set('id', res.data.id)
        localStorage.setItem('accessToken', res.data.accessToken)
        console.log(Cookies.get('accessToken'));
        await getUserInfo();
        window.location.href = `${process.env.REACT_APP_DOMAIN}/home`
      })
      .catch((error) => {
        console.log(error);
        console.error(error.response);
        handleError(error.response.data.message);
      })
  }
  const handleForgotPassword = values => {

    console.log(values.email);
    if (values.email === "") {
      handleError("Vui lòng nhập email trước");
    } else {
      axios.post(`${API_DOMAIN}/forgot-password`, {
        email: values.email,
      }, { withCredentials: true })
        .then((res) => {
          console.log(res);
          handleSuccess(res.data.message)
        })
        .catch((error) => {
          console.log(error);
          console.error(error.response);
          handleError(error.response.data.message);
        })
    }

  }
  const loginGoogle = () => {
    window.location.href = `${API_DOMAIN}/login/google`
  }
  const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default

  return (
    <div className='auth-wrapper auth-cover'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
          <img src={require("@src/assets/images/logo/elearning.svg").default} alt="Girl in a jacket" height="40" />

          <h2 className='brand-text text-primary ms-1'>Classie</h2>
        </Link>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login Cover' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='fw-bold mb-1'>
              Welcome to H2B Clasie! 👋
            </CardTitle>
            <CardText className='mb-2'>Please sign-in to your account and start the adventure</CardText>
            <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-1'>
                <Label className='form-label' for='login-email'>
                  Email
                </Label>
                <Controller
                  id='email'
                  name='email'
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoFocus
                      type='email'
                      placeholder='example@gmail.com'
                      invalid={errors.email && true}
                      {...field}
                    />
                  )}
                />

              </div>
              <div className='mb-1'>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    Password
                  </Label>
                  <a className='text-primary' onClick={handleSubmit(handleForgotPassword)}>
                    <small>Forgot Password?</small>
                  </a>
                </div>
                <Controller
                  id='password'
                  name='password'
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle className='input-group-merge' invalid={errors.password && true} {...field} />
                  )}
                />
              </div>
              <div className='form-check mb-1'>
                <Input type='checkbox' id='remember-me' />
                <Label className='form-check-label' for='remember-me'>
                  Remember Me
                </Label>
              </div>
              <Button color='primary' block to='/' type="submit">
                Sign in
              </Button>
            </Form>
            <p className='text-center mt-2'>
              <span className='me-25'>New on our platform?</span>
              <Link to='/register'>
                <span>Create an account</span>
              </Link>
            </p>
            <div className='divider my-2'>
              <div className='divider-text'>or</div>
            </div>
            <div className='auth-footer-btn d-flex justify-content-center'>

              <Button outline color='primary' block to='/' onClick={loginGoogle}>
                <GoogleIcon size={20} />
              </Button>

            </div>
          </Col>
        </Col>
      </Row>
    </div >
  )
}

function GoogleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid"
      viewBox="0 0 256 262"
      width={14}
      height={14}

    >
      <path
        fill="#4285F4"
        d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
      />
      <path
        fill="#34A853"
        d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
      />
      <path
        fill="#FBBC05"
        d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
      />
      <path
        fill="#EB4335"
        d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
      />
    </svg>
  )
}
export default LoginCover
