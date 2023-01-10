
// ** React Imports
import { Fragment, useState, useEffect } from 'react'


// ** Reactstrap Imports
import { Row, Col, TabContent, TabPane } from 'reactstrap'

// ** Demo Components
import Tabs from './Tabs'


import ChatTab from './ChatTab'
import QuestionTab from './QuestionTab'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/pages/page-account-settings.scss'

const ChatLog = () => {
    // ** States
    const [activeTab, setActiveTab] = useState('1');

    const toggleTab = tab => {
        setActiveTab(tab)
    }

    useEffect(() => {
    }, [])

    return (
        <Fragment>
            <Row>
                <Col xs={12}>
                    <Tabs className='mb-2' activeTab={activeTab} toggleTab={toggleTab} />

                    <TabContent activeTab={activeTab}>
                        <TabPane tabId='1'>
                            <ChatTab />
                        </TabPane>
                        <TabPane tabId='2'>
                            <QuestionTab />
                        </TabPane>

                    </TabContent>
                </Col>
            </Row>
        </Fragment>
    )
}

export default ChatLog