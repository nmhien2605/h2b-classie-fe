import axios from 'axios'
import { useEffect } from 'react'

import { Link, useParams } from 'react-router-dom'

// ** Icons Imports
import { Award } from 'react-feather'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Card, CardHeader, CardBody, CardTitle, CardText, Button } from 'reactstrap'

// ** Images
import decorationLeft from '@src/assets/images/elements/decore-left.png'
import decorationRight from '@src/assets/images/elements/decore-right.png'
import axiosHeader from "../constants/axiosHeader"
const CardCongratulations = () => {
    return (
        <Card className='card-congratulations'>
            <CardBody className='text-center'>
                <img className='congratulations-img-left' src={decorationLeft} alt='decor-left' />
                <img className='congratulations-img-right' src={decorationRight} alt='decor-right' />
                <Avatar icon={<Award size={28} />} className='shadow' color='success' size='xl' />
                <div className='text-center mb-2'>
                    <h1 className='mb-1 '>Congratulations,</h1>
                    <CardText className='m-auto w-75'>
                        You have done actived your account. Check your information in your profile.
                    </CardText>
                </div>
                <Button tag={Link} to='/home' color='gradient-primary' className='btn-sm-block mb-1'>
                    Back to home
                </Button>
            </CardBody>
        </Card>
    )
}

const Success = () => {
    const { id } = useParams();
    useEffect(() => {
        if (id) {
            axios.get(`${process.env.REACT_APP_API_DOMAIN}/users/verify/${id}`, { headers: axiosHeader }, { withCredential: true })
                .then(res => { console.log(res); })
                .catch(error => console.log(error))
        };
    }, [])

    return (
        <div>
            <CardCongratulations />
        </div>

    )
}
export default Success

