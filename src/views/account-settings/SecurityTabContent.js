// ** React Imports
import { Fragment } from 'react'
import axios from 'axios'
import axiosHeader from "../../constants/axiosHeader"
// ** Reactstrap Imports
import { Row, Col, Card, Form, Button, CardBody, CardTitle, CardHeader, FormFeedback } from 'reactstrap'

// ** Third Party Components
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
// ** Custom Components
import InputPasswordToggle from '@components/input-password-toggle'

const showErrors = (field, valueLen, min) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}

const defaultValues = {
  newPassword: '',
  currentPassword: '',
  retypeNewPassword: ''
}

const API_DOMAIN = process.env.REACT_APP_API_DOMAIN;

const SecurityTabContent = () => {
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
        window.location.href = "/account-settings"
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
  const SignupSchema = yup.object().shape({
    currentPassword: yup
      .string()
      .min(1, obj => showErrors('Current Password', obj.value.length, obj.min))
      .required(),
    newPassword: yup
      .string()
      .min(1, obj => showErrors('New Password', obj.value.length, obj.min))
      .required(),
    retypeNewPassword: yup
      .string()
      .min(1, obj => showErrors('Retype New Password', obj.value.length, obj.min))
      .required()
      .oneOf([yup.ref(`newPassword`), null], 'Passwords must match')
  })
  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(SignupSchema)
  })

  const onSubmit = data => {
    if (Object.values(data).every(field => field.length > 0)) {
      console.log(data.newPassword);
      axios
        .post(`${API_DOMAIN}/change-password`, {
          password: data.currentPassword,
          newPassword: data.newPassword
        }, { headers: axiosHeader }, { withCredentials: true })
        .then((res) => {
          handleSuccess(res.data.message)
        })
        .catch((error) => {
          console.log(error);
          console.error(error.response);
          handleError(error.response.data.message);
        })
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual'
          })
        }
      }
    }
  }

  return (
    <Fragment>
      <Card>
        <CardHeader className='border-bottom'>
          <CardTitle tag='h4'>Change Password</CardTitle>
        </CardHeader>
        <CardBody className='pt-1'>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col sm='6' className='mb-1'>
                <Controller
                  control={control}
                  id='currentPassword'
                  name='currentPassword'
                  render={({ field }) => (
                    <InputPasswordToggle
                      label='Current Password'
                      htmlFor='currentPassword'
                      className='input-group-merge'
                      invalid={errors.currentPassword && true}
                      {...field}
                    />
                  )}
                />
                {errors.currentPassword && (
                  <FormFeedback className='d-block'>{errors.currentPassword.message}</FormFeedback>
                )}
              </Col>
            </Row>
            <Row>
              <Col sm='6' className='mb-1'>
                <Controller
                  control={control}
                  id='newPassword'
                  name='newPassword'
                  render={({ field }) => (
                    <InputPasswordToggle
                      label='New Password'
                      htmlFor='newPassword'
                      className='input-group-merge'
                      invalid={errors.newPassword && true}
                      {...field}
                    />
                  )}
                />
                {errors.newPassword && <FormFeedback className='d-block'>{errors.newPassword.message}</FormFeedback>}
              </Col>
              <Col sm='6' className='mb-1'>
                <Controller
                  control={control}
                  id='retypeNewPassword'
                  name='retypeNewPassword'
                  render={({ field }) => (
                    <InputPasswordToggle
                      label='Retype New Password'
                      htmlFor='retypeNewPassword'
                      className='input-group-merge'
                      invalid={errors.newPassword && true}
                      {...field}
                    />
                  )}
                />
                {errors.retypeNewPassword && (
                  <FormFeedback className='d-block'>{errors.retypeNewPassword.message}</FormFeedback>
                )}
              </Col>
              <Col xs={12}>
                <p className='fw-bolder'>Password requirements:</p>
                <ul className='ps-1 ms-25'>
                  <li className='mb-50'>Minimum 8 characters long - the more, the better</li>
                  <li className='mb-50'>At least one lowercase character</li>
                  <li>At least one number, symbol, or whitespace character</li>
                </ul>
              </Col>
              <Col className='mt-1' sm='12'>
                <Button type='submit' className='me-1' color='primary'>
                  Save changes
                </Button>
                <Button color='secondary' outline>
                  Cancel
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>

    </Fragment>
  )
}

export default SecurityTabContent
