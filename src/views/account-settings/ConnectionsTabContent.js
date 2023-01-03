// ** Reactstrap Imports
import { Row, Col, Card, CardHeader, CardBody, CardTitle, Input, Label, Button } from 'reactstrap'

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
// ** Icons Imports
import { CheckSquare as Check, Send, Link as LinkIcon } from 'react-feather'
import { Link } from 'react-router-dom';
const connectedAccounts = [
  {
    checked: true,
    title: 'Google',
    subtitle: 'Calendar and contacts',
    logo: require('@src/assets/images/icons/social/google.png').default
  },

]

const ConnectionsTabContent = ({ userData }) => {
  // const handleError = (message) => {
  //   return MySwal.fire({
  //     title: 'Error!',
  //     text: message,
  //     icon: 'error',
  //     customClass: {
  //       confirmButton: 'btn btn-primary'
  //     },
  //     buttonsStyling: false
  //   })
  // }

  return (
    <Row>
      <Col md='6'>
        <Card>
          <CardHeader className='border-bottom'>
            <CardTitle tag='h4'>Connected accounts</CardTitle>
          </CardHeader>
          <CardBody className='pt-2'>
            <p>Display content from your connected accounts on your site</p>
            {connectedAccounts.map((item, index) => {
              return (
                <div className='d-flex mt-2' key={index}>
                  <div className='flex-shrink-0'>
                    <img className='me-1' src={item.logo} alt={item.title} height='38' width='38' />
                  </div>
                  <div className='d-flex align-item-center justify-content-between flex-grow-1'>
                    <div className='me-1'>
                      <p className='fw-bolder mb-0'>{item.title}</p>
                      <span>{item.subtitle}</span>
                    </div>
                    <div className='mt-50 mt-sm-0'>
                      <div className='form-switch'>
                        {userData.isActive ? <Check size={20} /> : <Link to={`/verify-email?email=${userData.email}`}><Button outline className='btn-icon'>
                          <LinkIcon className='font-medium-3' />
                        </Button></Link>}


                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </CardBody>
        </Card>
      </Col>

    </Row>
  )
}

export default ConnectionsTabContent
