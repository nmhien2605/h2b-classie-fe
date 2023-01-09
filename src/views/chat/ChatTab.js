/*eslint-disable */
// ** Reactstrap Imports
import { Row, Col, Card, CardHeader, CardBody, CardTitle, Input, Label, Button, Form, InputGroup, InputGroupText } from 'reactstrap'


// ** Icons Imports
import { CheckSquare as Check, Send, Link as LinkIcon, MoreVertical } from 'react-feather'
import { Link } from 'react-router-dom';
import { Fragment } from 'react';



const ChatTab = () => {
    const renderMsg = () => {

    }
    return (
        <Fragment>
            <Card >
                <CardHeader>
                    <CardTitle tag='h4'></CardTitle>
                    <MoreVertical size={18} className='cursor-pointer' />
                </CardHeader>
                <CardBody>{renderMsg()}</CardBody>
            </Card>

            <Form className='chat-app-form' onSubmit={e => handleSendMsg(e)}>
                <InputGroup className='input-group-merge me-1 form-send-message'>

                    <Input
                        // value={msg}
                        // onChange={e => setMsg(e.target.value)}
                        placeholder='Type your message or use speech to text'
                    />

                </InputGroup>
                <Button className='send' color='primary'>
                    <Send size={14} className='d-lg-none' />
                    <span className='d-none d-lg-block'>Send</span>
                </Button>
            </Form>
        </Fragment>

    )
}

export default ChatTab
