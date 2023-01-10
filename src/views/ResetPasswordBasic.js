// ** React Imports
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
// ** Icons Imports
import { ChevronLeft } from 'react-feather'

// ** Custom Components
import InputPasswordToggle from '@components/input-password-toggle'
import { useForm, Controller } from 'react-hook-form'

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
// ** Reactstrap Imports
import { Card, CardBody, CardTitle, CardText, Form, Label, Button } from 'reactstrap'

// ** Styles
import '@styles/react/pages/page-authentication.scss'
const API_DOMAIN = process.env.REACT_APP_API_DOMAIN;

const ResetPasswordBasic = () => {
  const handleSuccess = (message) => {
    return MySwal.fire({
      title: 'Done!',
      text: message,
      icon: 'success',
      customClass: {
        confirmButton: 'btn btn-primary',
      },
      buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/login"
      }
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
  const defaultValues = {
    password: '',
    confirm: '',
  }
  const { id } = useParams()
  const {
    control,
    //setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })
  const onSubmit = values => {
    console.log(values.password);
    console.log(values.confirm);
    if (values.password !== values.confirm) {
      handleError("Password không khớp");
    } else {
      axios
        .post(`${API_DOMAIN}/reset-password`, {
          id,
          password: values.password
        }, { withCredentials: true })
        .then((res) => {
          handleSuccess(res.data.message)
        })
        .catch((error) => {
          console.log(error);
          console.error(error.response);
          handleError(error.response.data.message);
        })
    }
  }

  return (
    <div className='auth-wrapper auth-basic px-2'>
      <div className='auth-inner my-2'>
        <Card className='mb-0'>
          <CardBody>
            <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
              <img src={require("@src/assets/images/logo/elearning.svg").default} alt="Girl in a jacket" height="40" />
              <h2 className='brand-text text-primary ms-1'>Classie</h2>
            </Link>
            <CardTitle tag='h4' className='mb-1'>
              Reset Password 🔒
            </CardTitle>
            <Form className='auth-reset-password-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-1'>
                <Label className='form-label' for='password'>
                  New Password
                </Label>
                <Controller
                  id='password'
                  name='password'
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle className='input-group-merge' invalid={errors.password && true} {...field} />
                  )}
                />

              </div>
              <div className='mb-1'>

                <Label className='form-label' for='confirm'>
                  Confirm Password
                </Label>
                <Controller
                  id='confirm'
                  name='confirm'
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle className='input-group-merge' invalid={errors.confirm && true} {...field} />
                  )}
                />

              </div>
              <Button color='primary' block>
                Set New Password
              </Button>
            </Form>
            <p className='text-center mt-2'>
              <Link to='/pages/login-basic'>
                <ChevronLeft className='rotate-rtl me-25' size={14} />
                <span className='align-middle'>Back to login</span>
              </Link>
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default ResetPasswordBasic
