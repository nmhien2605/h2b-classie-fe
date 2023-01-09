/*eslint-disable */
// ** Reactstrap Imports
import { Row, Col, Card, CardHeader, CardBody, CardTitle, Input, Label, Button, Form, InputGroup, InputGroupText } from 'reactstrap'

// ** Icons Imports
import { CheckSquare as Check, Send, Link as LinkIcon, MoreVertical } from 'react-feather'
import { Link } from 'react-router-dom';


const QuestionTab = () => {

    return (
        <Card>
            <CardHeader>
                <CardTitle tag='h4'></CardTitle>
                <MoreVertical size={18} className='cursor-pointer' />
            </CardHeader>
            <CardBody></CardBody>
        </Card>



    )
}

export default QuestionTab
