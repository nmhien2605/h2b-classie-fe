/*eslint-disable */
// ** Reactstrap Imports
import { Row, Col, Card, CardHeader, CardBody, CardTitle, Input, Label, Button, Form, InputGroup, InputGroupText } from 'reactstrap'


// ** Icons Imports
import { CheckSquare as Check, Send, Link as LinkIcon, MoreVertical } from 'react-feather'
import { Link } from 'react-router-dom';
import { Fragment } from 'react';



const ChatTab = () => {
    const fakeMsg = [
        {
            id: 'aaa',
            name: 'display name A',
            content: 'Tin nhắn A',
            time: '7:00'
        },
        {
            id: 'bbb',
            name: 'display name B',
            content: 'Tin nhắn B',
            time: '7:01'
        },
        {
            id: 'ccc',
            name: 'display name A',
            content: 'Tin nhắn A 2',
            time: '7:05'
        },

    ]
    const renderMessage = () => {
        return fakeMsg.map(msg => {
            return (
                <div key={msg.id} className='employee-task d-flex justify-content-between align-items-center mb-2'>
                    <div className='my-auto'>
                        <span className='mb-0 '>{msg.name} : </span>
                        <small>{msg.content}</small>
                    </div>

                    <div className='d-flex align-items-center'>
                        <small className='text-muted me-75'>{msg.time}</small>

                    </div>
                </div>
            )
        })
    }
    return (
        <Fragment>
            <Card >
                <CardHeader>
                    <CardTitle tag='h4'></CardTitle>
                    <MoreVertical size={18} className='cursor-pointer' />
                </CardHeader>
                <CardBody>{renderMessage()}</CardBody>

                <Form className='chat-app-form' onSubmit={e => handleSendMsg(e)}>
                    <Row>
                        <InputGroup>
                            <Input
                                // value={msg}
                                // onChange={e => setMsg(e.target.value)}
                                placeholder='Type your message'
                            />
                            <Button className='send' color='primary'>
                                <Send size={14} className='d-lg-none' />
                                <span className='d-none d-lg-block'>Send</span>
                            </Button>
                        </InputGroup>
                    </Row>


                </Form>
            </Card>


        </Fragment >

    )
}

export default ChatTab
