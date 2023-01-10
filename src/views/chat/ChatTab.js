/*eslint-disable */
// ** Reactstrap Imports
import { Row, Col, Card, CardHeader, CardBody, CardTitle, Input, Label, Button, Form, InputGroup, InputGroupText } from 'reactstrap'


// ** Icons Imports
import { CheckSquare as Check, Send, Link as LinkIcon, MoreVertical } from 'react-feather'
import { Link } from 'react-router-dom';
import { Fragment, useState, useEffect, useContext } from 'react';
import { SocketContext, sendText } from '../../utility/Socket';



const ChatTab = ({ room }) => {
    const [userData, setUserData] = useState(null)

    const [text, setText] = useState('');
    const [chatLog, setChatLog] = useState([])
    const socketData = useContext(SocketContext);
    const handleSendText = (e) => {
        e.preventDefault();
        if (text !== '') {
            let name = 'guest';
            if (userData) {
                name = userData.name;
            }
            sendText(room, name, text);
            setText('')
        }
    }

    const fakeText = [
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
        return chatLog.map(text => {
            return (
                <div key={text.id} className='employee-task d-flex justify-content-between align-items-center mb-2'>
                    <div className='my-auto'>
                        <span className='mb-0 '>{text.name} : </span>
                        <small>{text.content}</small>
                    </div>

                    <div className='d-flex align-items-center'>
                        <small className='text-muted me-75'>{text.time}</small>

                    </div>
                </div>
            )
        })
    }
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            setUserData(user);
        }
    }, [])
    //listener 
    useEffect(() => {
        if (socketData.event === "broadcast-new-msg") {
            console.log(socketData.data);
            // console.log(chatLog);
            setChatLog([...chatLog, socketData.data])
        }

    }, [socketData])
    return (
        <Fragment>
            <Card >
                <CardHeader>
                    <CardTitle tag='h4'></CardTitle>
                    <MoreVertical size={18} className='cursor-pointer' />
                </CardHeader>
                <CardBody>{renderMessage()}</CardBody>

                <Form className='chat-app-form' onSubmit={e => handleSendText(e)}>
                    <Row>
                        <InputGroup>
                            <Input
                                value={text}
                                onChange={e => setText(e.target.value)}
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
